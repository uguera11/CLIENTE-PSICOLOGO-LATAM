const { sessionUser, userCourses } = require('../lib/firebaseAdmin');
const catalog=require('../lib/catalog');
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  const user=await sessionUser(req);
  if(!user) return res.status(401).json({error:'unauthorized'});
  const courses=userCourses(user).filter(id=>catalog[id]);
  return res.status(200).json({uid:user.uid,email:user.email,name:user.displayName||user.email?.split('@')[0]||'Alumno',courses});
};
