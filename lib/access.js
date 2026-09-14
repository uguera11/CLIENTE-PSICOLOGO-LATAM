const crypto = require('crypto');
const { adminAuth } = require('./firebaseAdmin');
const catalog = require('./catalog');

async function ensureUser(email, displayName='') {
  const auth = adminAuth();
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) throw new Error('Email ausente');
  try {
    return { user: await auth.getUserByEmail(normalized), created: false };
  } catch (e) {
    if (e.code !== 'auth/user-not-found') throw e;
    const password = crypto.randomBytes(30).toString('base64url') + 'aA1!';
    const user = await auth.createUser({ email: normalized, displayName: displayName || undefined, password });
    return { user, created: true };
  }
}

async function changeCourseAccess(email, courseId, active, displayName='') {
  if (!catalog[courseId]) throw new Error('Curso inválido: ' + courseId);
  const { user, created } = await ensureUser(email, displayName);
  const current = Array.isArray(user.customClaims?.courses) ? user.customClaims.courses : [];
  const set = new Set(current);
  active ? set.add(courseId) : set.delete(courseId);
  await adminAuth().setCustomUserClaims(user.uid, { ...(user.customClaims || {}), courses: [...set] });
  return { user, created, courses: [...set] };
}

async function sendPasswordEmail(email) {
  const apiKey = process.env.FIREBASE_WEB_API_KEY || 'AIzaSyANd2gwCaulyYhk9hkkOqGeQc4FzzXamCk';
  if (!apiKey) throw new Error('Firebase Web API Key ausente');
  const body = { requestType: 'PASSWORD_RESET', email: String(email).trim().toLowerCase() };
  if (process.env.SITE_URL) body.continueUrl = process.env.SITE_URL.replace(/\/$/, '') + '/cursos/login/';
  const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error('Não foi possível enviar o e-mail de senha: ' + t);
  }
}

module.exports = { changeCourseAccess, sendPasswordEmail };
