const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

function getAdminApp() {
  if (getApps().length) return getApps()[0];
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) throw new Error('Firebase Admin não configurado nas variáveis de ambiente.');
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

function adminAuth() { getAdminApp(); return getAuth(); }

function cookieValue(req, name) {
  const header = req.headers.cookie || '';
  const parts = header.split(';').map(v => v.trim());
  for (const part of parts) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    const k = part.slice(0, idx);
    if (k === name) return decodeURIComponent(part.slice(idx + 1));
  }
  return null;
}

async function sessionUser(req) {
  const cookie = cookieValue(req, 'mb_session');
  if (!cookie) return null;
  try {
    const decoded = await adminAuth().verifySessionCookie(cookie, true);
    const user = await adminAuth().getUser(decoded.uid);
    return user;
  } catch (_) { return null; }
}

function userCourses(user) {
  const courses = user?.customClaims?.courses;
  return Array.isArray(courses) ? courses : [];
}

module.exports = { adminAuth, sessionUser, userCourses };
