const GHL_BASE = 'https://services.leadconnectorhq.com';

function getHeaders() {
  const token = process.env.GHL_API_TOKEN;
  if (!token) throw new Error('GHL_API_TOKEN is not configured');

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Version: process.env.GHL_API_VERSION || '2021-07-28',
  };
}

function getLocationId() {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) throw new Error('GHL_LOCATION_ID is not configured');
  return locationId;
}

const ARCHETYPE_LABELS = {
  hh: 'The Healer-Heart',
  wl: 'The Wildlight',
  tc: 'The Truthcaster',
  ar: 'The Architect',
  ck: 'The Calmkeeper',
};

function buildScoreJson(payload) {
  return JSON.stringify({
    hh: payload.scoreHh,
    wl: payload.scoreWl,
    tc: payload.scoreTc,
    ar: payload.scoreAr,
    ck: payload.scoreCk,
    urgency: payload.urgencyScore,
    archetype: payload.archetype,
    urgency_level: payload.urgency,
  });
}

function buildCustomFields(payload) {
  const archetypeLabel = ARCHETYPE_LABELS[payload.archetype] ?? payload.archetype;

  const mapping = [
    ['GHL_FIELD_ARCHETYPE', payload.archetype],
    ['GHL_FIELD_CONTACT_ARCHETYPE', archetypeLabel],
    ['GHL_FIELD_QUIZ_RESULT_CODE', payload.archetype],
    ['GHL_FIELD_QUIZ_SCORE_JSON', buildScoreJson(payload)],
    ['GHL_FIELD_URGENCY', payload.urgency],
    ['GHL_FIELD_URGENCY_SCORE', String(payload.urgencyScore ?? '')],
    ['GHL_FIELD_SCORE_HH', String(payload.scoreHh ?? '')],
    ['GHL_FIELD_SCORE_WL', String(payload.scoreWl ?? '')],
    ['GHL_FIELD_SCORE_TC', String(payload.scoreTc ?? '')],
    ['GHL_FIELD_SCORE_AR', String(payload.scoreAr ?? '')],
    ['GHL_FIELD_SCORE_CK', String(payload.scoreCk ?? '')],
    ['GHL_FIELD_QUIZ_COMPLETED', 'true'],
    ['GHL_FIELD_SOURCE', payload.source],
  ];

  return mapping
    .map(([envKey, value]) => {
      const id = process.env[envKey];
      if (!id || value === undefined || value === '') return null;
      return { id, value };
    })
    .filter(Boolean);
}

function buildTags(payload) {
  return [
    'pridenomad-quiz',
    `archetype-${payload.archetype}`,
    `urgency-${payload.urgency}`,
    payload.source,
  ];
}

function buildContactBody(payload) {
  const locationId = getLocationId();
  const customFields = buildCustomFields(payload);

  const body = {
    locationId,
    email: payload.email,
    tags: buildTags(payload),
    source: payload.source,
  };

  if (customFields.length > 0) {
    body.customFields = customFields;
  }

  return body;
}

async function ghlRequest(pathname, options = {}) {
  const response = await fetch(`${GHL_BASE}${pathname}`, {
    ...options,
    headers: { ...getHeaders(), ...(options.headers ?? {}) },
  });

  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!response.ok) {
    const message = data.message || data.error || data.msg || response.statusText;
    throw new Error(`GHL ${response.status}: ${message}`);
  }

  return data;
}

async function findContactByEmail(email) {
  const locationId = getLocationId();
  const params = new URLSearchParams({
    locationId,
    query: email,
    limit: '1',
  });

  const data = await ghlRequest(`/contacts/?${params.toString()}`, { method: 'GET' });
  const contacts = data.contacts ?? data.contact ?? [];
  const list = Array.isArray(contacts) ? contacts : [contacts].filter(Boolean);
  return list.find((c) => c.email?.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function upsertQuizContact(payload) {
  const body = buildContactBody(payload);
  const existing = await findContactByEmail(payload.email);

  if (existing?.id) {
    const updated = await ghlRequest(`/contacts/${existing.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return { contactId: updated.contact?.id ?? existing.id, action: 'updated' };
  }

  const created = await ghlRequest('/contacts/', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return { contactId: created.contact?.id ?? created.id, action: 'created' };
}
