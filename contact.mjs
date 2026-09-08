const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'mauricioberon@yahoo.com';

function esc(value='') {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Método no permitido.'});
  if (!process.env.RESEND_API_KEY) return res.status(503).json({error:'El formulario todavía no está activado en Vercel. Falta configurar el servicio de correo.'});

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (body.bot_field) return res.status(200).json({ok:true});

  const nombre = String(body.nombre || '').trim().slice(0,120);
  const email = String(body.email || '').trim().slice(0,160);
  const telefono = String(body.telefono || '').trim().slice(0,80);
  const motivo = String(body.motivo || '').trim().slice(0,120);
  const mensaje = String(body.mensaje || '').trim().slice(0,5000);
  if (!nombre || !email || !motivo || !mensaje) return res.status(400).json({error:'Complete nombre, email, motivo y mensaje.'});
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({error:'Ingrese un email válido.'});

  const from = process.env.CONTACT_FROM_EMAIL || 'Sitio Mauricio Berón <onboarding@resend.dev>';
  const html = `<h2>Nueva consulta desde psicologomauricioberon.com</h2>
    <p><strong>Nombre:</strong> ${esc(nombre)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Teléfono / WhatsApp:</strong> ${esc(telefono || 'No indicado')}</p>
    <p><strong>Motivo:</strong> ${esc(motivo)}</p>
    <p><strong>Mensaje:</strong></p><p>${esc(mensaje).replace(/\n/g,'<br>')}</p>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type':'application/json'},
      body: JSON.stringify({from, to:[TO_EMAIL], reply_to:email, subject:`Consulta web · ${motivo} · ${nombre}`, html})
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('Resend error', response.status, data);
      return res.status(502).json({error:'No fue posible enviar la consulta en este momento.'});
    }
    return res.status(200).json({ok:true,id:data.id||null});
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:'No fue posible enviar la consulta en este momento.'});
  }
}
