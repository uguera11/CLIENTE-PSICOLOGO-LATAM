export default function handler(req, res) {
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.status(200).json({
    supabaseConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
    emailConfigured: Boolean(process.env.RESEND_API_KEY),
    contactRecipient: process.env.CONTACT_TO_EMAIL || 'mauricioberon@yahoo.com'
  });
}
