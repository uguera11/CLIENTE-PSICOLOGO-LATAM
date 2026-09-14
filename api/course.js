const fs=require('fs'); const path=require('path');
const { sessionUser, userCourses }=require('../lib/firebaseAdmin');
const catalog=require('../lib/catalog');
const types={'.html':'text/html; charset=utf-8','.pdf':'application/pdf','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8'};
module.exports=async function handler(req,res){
  const user=await sessionUser(req);
  if(!user){ res.statusCode=302; res.setHeader('Location','/cursos/login/?next='+encodeURIComponent(req.url||'')); return res.end(); }
  const course=String(req.query.course||'');
  if(!catalog[course]) return res.status(404).send('Curso não encontrado');
  if(!userCourses(user).includes(course)){ res.statusCode=302; res.setHeader('Location','/cursos/minha-area/?sin_acceso='+encodeURIComponent(course)); return res.end(); }
  let rel=Array.isArray(req.query.path)?req.query.path.join('/'):String(req.query.path||'');
  if(!rel || rel.endsWith('/')) rel += 'index.html';
  rel=rel.replace(/^\/+/, '');
  const base=path.resolve(process.cwd(),'private-courses',course);
  const target=path.resolve(base,rel);
  if(target!==base && !target.startsWith(base+path.sep)) return res.status(400).send('Caminho inválido');
  if(!fs.existsSync(target) || !fs.statSync(target).isFile()) return res.status(404).send('Arquivo não encontrado');
  const ext=path.extname(target).toLowerCase();
  res.setHeader('Content-Type',types[ext]||'application/octet-stream');
  res.setHeader('Cache-Control', ext==='.html'?'private, no-store':'private, max-age=0, no-store');
  if(ext==='.pdf') res.setHeader('Content-Disposition',`inline; filename="${path.basename(target).replace(/"/g,'')}"`);
  return res.status(200).send(fs.readFileSync(target));
};
