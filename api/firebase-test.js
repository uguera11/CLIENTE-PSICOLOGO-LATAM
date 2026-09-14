const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      return res.status(500).json({
        ok: false,
        error: 'missing_environment_variables',
        configured: {
          projectId: Boolean(projectId),
          clientEmail: Boolean(clientEmail),
          privateKey: Boolean(privateKey)
        }
      });
    }

    if (!getApps().length) {
      initializeApp({
        credential: cert({ projectId, clientEmail, privateKey })
      });
    }

    // Faz uma chamada real ao Firebase Authentication sem expor dados de alunos.
    const result = await getAuth().listUsers(1);

    return res.status(200).json({
      ok: true,
      firebase: 'connected',
      projectId,
      authenticationReachable: true,
      sampleUserCount: result.users.length
    });
  } catch (e) {
    console.error('firebase-test', e);
    return res.status(500).json({
      ok: false,
      firebase: 'connection_failed',
      error: e.code || e.name || 'unknown_error'
    });
  }
};
