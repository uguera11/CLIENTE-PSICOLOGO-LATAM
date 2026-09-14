module.exports = function handler(req,res){
  res.setHeader('Set-Cookie','mb_session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax');
  res.setHeader('Cache-Control','no-store');
  return res.status(200).json({ok:true});
};
