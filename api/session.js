const { adminAuth } = require('../lib/firebaseAdmin');
module.exports = async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'method_not_allowed'});
  try{
    const idToken=req.body?.idToken;
    if(!idToken) return res.status(400).json({error:'missing_token'});
    const decoded=await adminAuth().verifyIdToken(idToken,true);
    const expiresIn=14*24*60*60*1000;
    const cookie=await adminAuth().createSessionCookie(idToken,{expiresIn});
    res.setHeader('Set-Cookie',`mb_session=${encodeURIComponent(cookie)}; Max-Age=${Math.floor(expiresIn/1000)}; Path=/; HttpOnly; Secure; SameSite=Lax`);
    res.setHeader('Cache-Control','no-store');
    return res.status(200).json({ok:true,uid:decoded.uid});
  }catch(e){ return res.status(401).json({error:'invalid_login'}); }
};
