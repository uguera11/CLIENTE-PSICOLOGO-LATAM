export default function handler(req, res) {
  const config = {
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    storageBucket: process.env.SUPABASE_STORAGE_BUCKET || 'course-images',
    siteName: 'Lic. Mauricio Berón',
    siteBaseUrl: process.env.SITE_BASE_URL || '',
    whatsapp: '59899462504',
    email: 'mauricioberon@yahoo.com',
    address: 'Andes 1365, consultorio 813, esquina 18 de Julio',
    instagram: 'https://www.instagram.com/psicologo_mauricioberon/',
    facebook: 'https://www.facebook.com/LicBeron/',
    tiktok: 'https://www.tiktok.com/@licmauricioberon',
    youtube: '',
    linkedin: ''
  };
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).send(`window.SITE_CONFIG=${JSON.stringify(config)};`);
}
