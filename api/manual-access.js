const { changeCourseAccess, sendPasswordEmail }=require('../lib/access');
module.exports=async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'method_not_allowed'});
  if(!process.env.COURSE_ADMIN_KEY || String(req.headers['x-admin-key']||'')!==process.env.COURSE_ADMIN_KEY) return res.status(401).json({error:'unauthorized'});
  try{
    const {email,courseId,active=true,name=''}=req.body||{};
    const result=await changeCourseAccess(email,courseId,Boolean(active),name);
    if(active && result.created){ try{await sendPasswordEmail(email)}catch(e){console.error(e.message)} }
    return res.status(200).json({ok:true,email,courseId,active:Boolean(active),courses:result.courses,created:result.created});
  }catch(e){ return res.status(400).json({error:e.message}); }
};
