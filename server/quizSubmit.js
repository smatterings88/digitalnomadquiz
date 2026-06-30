import { upsertQuizContact } from './ghl.js';

export async function handleQuizSubmit(body) {
  const {
    email,
    pridenomad_archetype_primary: archetype,
    pridenomad_urgency: urgency,
    urgency_score: urgencyScore,
    score_hh: scoreHh,
    score_wl: scoreWl,
    score_tc: scoreTc,
    score_ar: scoreAr,
    score_ck: scoreCk,
    source = 'pridenomadquiz.com',
  } = body ?? {};

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 400, body: { error: 'A valid email is required.' } };
  }

  if (!process.env.GHL_API_TOKEN || !process.env.GHL_LOCATION_ID) {
    console.warn('[quiz-submit] GHL not configured — accepting submission without sync');
    return { status: 200, body: { ok: true, synced: false } };
  }

  try {
    const result = await upsertQuizContact({
      email: email.trim().toLowerCase(),
      archetype,
      urgency,
      urgencyScore,
      scoreHh,
      scoreWl,
      scoreTc,
      scoreAr,
      scoreCk,
      source,
    });

    return {
      status: 200,
      body: { ok: true, synced: true, contactId: result.contactId, action: result.action },
    };
  } catch (error) {
    console.error('[quiz-submit]', error);
    return {
      status: 502,
      body: {
        error:
          'Unable to sync with GoHighLevel. Your results are still shown — please try again or contact support.',
      },
    };
  }
}
