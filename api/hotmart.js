const { changeCourseAccess, sendPasswordEmail } = require('../lib/access');
const GRANT=new Set(['PURCHASE_APPROVED','PURCHASE_COMPLETE']);
const REVOKE=new Set(['PURCHASE_REFUNDED','PURCHASE_CHARGEBACK','PURCHASE_CANCELED','PURCHASE_CANCELLED']);
module.exports=async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'method_not_allowed'});
  try{
    const expected=process.env.HOTMART_HOTTOK||'';
    const received=String(req.headers['x-hotmart-hottok']||'');
    if(!expected || received!==expected) return res.status(401).json({error:'invalid_hottok'});
    const body=req.body||{}; const data=body.data||{}; const event=String(body.event||'').toUpperCase();
    let map={}; try{map=JSON.parse(process.env.HOTMART_PRODUCT_MAP||'{}')}catch(_){return res.status(500).json({error:'invalid_product_map'})}
    const productId=String(data.product?.id ?? data.subscription?.product?.id ?? data.purchase?.product?.id ?? '');
    const courseId=map[productId];
    const email=data.buyer?.email || data.subscriber?.email || data.purchase?.buyer?.email || '';
    const name=data.buyer?.name || data.subscriber?.name || '';
    if(!courseId) return res.status(200).json({ok:true,ignored:'product_not_mapped',productId,event});
    if(!email) return res.status(400).json({error:'buyer_email_missing'});
    if(!GRANT.has(event) && !REVOKE.has(event)) return res.status(200).json({ok:true,ignored:'event_not_used',event});
    const active=GRANT.has(event);
    const result=await changeCourseAccess(email,courseId,active,name);
    if(active && result.created){ try{await sendPasswordEmail(email)}catch(e){console.error('password_email',e.message)} }
    return res.status(200).json({ok:true,event,email,courseId,active,courses:result.courses});
  }catch(e){ console.error(e); return res.status(500).json({error:'server_error',message:e.message}); }
};
