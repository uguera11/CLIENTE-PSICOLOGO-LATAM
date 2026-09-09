MAURICIO BERÓN — VERSIÓN FINAL PARA VERCEL

ARQUITECTURA
- Vercel: alojamiento de los archivos del sitio.
- Supabase: autenticación del panel, cursos, contenido, imágenes y estadísticas.
- FormSubmit: envío del formulario a mauricioberon@yahoo.com. No requiere Resend ni variables de email en Vercel.

SUPABASE
El proyecto ya está conectado en los archivos mediante la URL del proyecto y una publishable key pública.
El acceso administrativo está restringido por las políticas del banco al correo:
mauricioberon@yahoo.com

El usuario ya fue invitado en Supabase Authentication. Mauricio debe abrir el correo de invitación y definir su contraseña antes del primer acceso.

FORMULARIO
El formulario usa FormSubmit.
Destino: mauricioberon@yahoo.com

En el PRIMER envío, FormSubmit enviará un mensaje de activación a ese correo. Mauricio deberá confirmar ese mensaje una sola vez. Después, las consultas siguientes llegarán normalmente.

No se usa Netlify Forms.
No se usa Resend.
No se necesita RESEND_API_KEY.
No se necesita una Vercel Function para el formulario.

PRUEBA FINAL RECOMENDADA
1. Subir este ZIP a Vercel.
2. Mauricio acepta la invitación de Supabase y crea su contraseña.
3. Abrir /admin.html e iniciar sesión con mauricioberon@yahoo.com.
4. Modificar un texto o un curso y verificar que el cambio sea persistente.
5. Abrir páginas públicas para generar visitas y verificar Estadísticas en el panel.
6. Enviar el formulario. En el primer envío, confirmar el email de activación de FormSubmit.
7. Enviar una segunda consulta y comprobar que llega a mauricioberon@yahoo.com.

MASTERCLASS
- Fecha: 19/09/2026
- Horario: 09:00 a 12:00
- Duración: 3 horas
- Precio: $3.500 UYU
- Certificado: a confirmar
