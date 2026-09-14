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

function normalizeCourseIds(courseIds) {
  const ids = [...new Set((Array.isArray(courseIds) ? courseIds : [courseIds])
    .map(v => String(v || '').trim())
    .filter(Boolean))];

  if (!ids.length) throw new Error('Seleccione al menos un curso');
  for (const id of ids) {
    if (!catalog[id]) throw new Error('Curso inválido: ' + id);
  }
  return ids;
}

async function changeCoursesAccess(email, courseIds, active, displayName='') {
  const ids = normalizeCourseIds(courseIds);
  const { user, created } = await ensureUser(email, displayName);
  const current = Array.isArray(user.customClaims?.courses) ? user.customClaims.courses : [];
  const set = new Set(current);

  for (const id of ids) {
    active ? set.add(id) : set.delete(id);
  }

  const courses = [...set];
  await adminAuth().setCustomUserClaims(user.uid, {
    ...(user.customClaims || {}),
    courses
  });

  return { user, created, courses, changedCourseIds: ids };
}

// Mantém compatibilidade com chamadas antigas.
async function changeCourseAccess(email, courseId, active, displayName='') {
  return changeCoursesAccess(email, [courseId], active, displayName);
}

async function sendPasswordEmail(email) {
  const apiKey = process.env.FIREBASE_WEB_API_KEY || 'AIzaSyANd2gwCaulyYhk9hkkOqGeQc4FzzXamCk';
  if (!apiKey) throw new Error('Firebase Web API Key ausente');
  const body = { requestType: 'PASSWORD_RESET', email: String(email).trim().toLowerCase() };
  if (process.env.SITE_URL) body.continueUrl = process.env.SITE_URL.replace(/\/$/, '') + '/cursos/login/';
  const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error('Não foi possível enviar o e-mail de senha: ' + t);
  }
}

module.exports = { changeCourseAccess, changeCoursesAccess, sendPasswordEmail };
