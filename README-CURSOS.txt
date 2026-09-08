PANEL EDITABLE DE CURSOS / MASTERCLASSES
========================================

ARCHIVOS:
- formacion.html  -> listado público de cursos
- curso.html      -> página individual / compartible de cada curso
- admin.html      -> panel de edición
- config.js       -> conexión de Supabase y datos generales
- course-data.js  -> lógica de datos
- supabase-setup.sql -> estructura de base de datos y permisos
- _redirects      -> URLs limpias en Netlify

MODO DEMOSTRACIÓN
-----------------
Tal como se entrega, si config.js no tiene Supabase configurado, el panel funciona en modo demostración con localStorage. Sirve para probar crear, editar, duplicar, publicar y reemplazar cursos en el mismo navegador. No sincroniza cambios con otros dispositivos.

PARA QUE MAURICIO PUEDA EDITAR EL SITIO EN PRODUCCIÓN SIN DISEÑADOR
-------------------------------------------------------------------
1. Crear un proyecto gratuito en Supabase.
2. En SQL Editor, ejecutar todo el archivo supabase-setup.sql.
3. En Authentication > Users, crear el usuario de Mauricio con email y contraseña.
4. En Project Settings > API copiar Project URL y anon public key.
5. Pegarlos en config.js:
   supabaseUrl: "https://...supabase.co"
   supabaseAnonKey: "..."
6. Volver a subir la carpeta/ZIP a Netlify.

Después de esa configuración inicial:
- Mauricio entra a /admin
- inicia sesión
- crea/edita/duplica/archiva cursos
- sube la imagen
- define fecha, horario, modalidad, precio y certificado
- pega el enlace de inscripción/checkout
- marca “Publicado”
- si marca “Destacar en la página principal”, sustituye automáticamente la formación destacada anterior

ENLACES COMPARTIBLES
--------------------
Cada curso queda con URL limpia:
https://dominio.com/formacion/slug-del-curso

La página individual incluye:
- Compartir nativo del teléfono
- WhatsApp
- Facebook
- Copiar enlace (para Instagram/TikTok/bio/stories)

NOTA SOBRE INSTAGRAM Y TIKTOK
-----------------------------
La web no puede publicar automáticamente en una cuenta de Instagram/TikTok sin una integración adicional con sus APIs. Por eso la solución correcta es Compartir nativo + Copiar enlace.
