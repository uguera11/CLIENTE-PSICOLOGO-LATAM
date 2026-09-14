const fs=require('fs'); const path=require('path');
const { sessionUser }=require('../lib/firebaseAdmin');
module.exports=async function handler(req,res){
  const user=await sessionUser(req);
  if(!user){ res.statusCode=302; res.setHeader('Location','/cursos/login/?next=minha-area'); return res.end(); }
  const file=path.join(process.cwd(),'private-dashboard','index.html');
  res.setHeader('Content-Type','text/html; charset=utf-8'); res.setHeader('Cache-Control','private, no-store');
  return res.status(200).send(fs.readFileSync(file));
};
