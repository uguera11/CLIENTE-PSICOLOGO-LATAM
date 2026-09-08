MAURICIO BERÓN — ACTIVACIÓN DEFINITIVA EN VERCEL

1) SUPABASE
- Crear el proyecto desde una cuenta propiedad de Mauricio Berón (mauricioberon@yahoo.com).
- Ejecutar supabase-setup.sql en SQL Editor.
- Authentication > Users: invitar/crear el usuario mauricioberon@yahoo.com. Mauricio debe definir su propia contraseña.
- Authentication > URL Configuration: agregar la URL de Vercel y, luego, https://psicologomauricioberon.com.

2) VARIABLES EN VERCEL > Project > Settings > Environment Variables
SUPABASE_URL = Project URL de Supabase
SUPABASE_ANON_KEY = anon/public key de Supabase
SUPABASE_STORAGE_BUCKET = course-images
SITE_BASE_URL = URL pública actual de Vercel (después cambiar a https://psicologomauricioberon.com)

3) FORMULARIO POR VERCEL FUNCTION
El formulario ya NO usa Netlify Forms. POST -> /api/contact.
Crear una cuenta de Resend preferentemente con el correo de Mauricio y configurar:
RESEND_API_KEY = API key de Resend
CONTACT_TO_EMAIL = mauricioberon@yahoo.com
CONTACT_FROM_EMAIL = Sitio Mauricio Berón <onboarding@resend.dev> (para la prueba inicial)
Después de vincular/verificar el dominio, usar por ejemplo: Sitio Mauricio Berón <contacto@psicologomauricioberon.com>.

4) PRUEBAS
- /api/status debe informar supabaseConfigured:true y emailConfigured:true.
- /admin.html debe pedir email + contraseña.
- Crear un curso de prueba, publicar, abrir formacion.html en incógnito y verificar que aparezca.
- Enviar el formulario real y confirmar recepción en mauricioberon@yahoo.com.
- Navegar desde ?utm_source=instagram&utm_medium=social y verificar en /admin.html > Estadísticas.

5) MASTERCLASS
- 19/09/2026
- Horario: 09:00 a 12:00
- Duración: 3 horas
- Precio: $3.500 UYU
- Certificado: A CONFIRMAR (no se inventó Sí/No porque Mauricio todavía debe confirmarlo).
