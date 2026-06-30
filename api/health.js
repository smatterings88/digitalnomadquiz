export default function handler(_req, res) {
  res.json({
    ok: true,
    ghlConfigured: Boolean(process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID),
  });
}
