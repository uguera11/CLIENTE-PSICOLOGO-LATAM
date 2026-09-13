PROJETO INTEGRADO — PASSO 1

Rotas principais:
/                         Site profissional atual
/admin.html               Admin atual (preservado)
/cursos/                  Catálogo público dos cursos
/cursos/curso.html        Página de venda/detalhes
/cursos/login/            Login de alunos (DEMO neste passo)
/cursos/minha-area/       Dashboard do aluno (DEMO)
/cursos/formacoes/conductas-sexuales-abusivas/   Primeiro curso com PDFs e certificado

IMPORTANTE:
O admin atual continua usando a configuração Supabase/Edge Function que já existia no projeto original. Não foi alterado.
O login de alunos deste Passo 1 é somente uma simulação via localStorage para validar estrutura, navegação e visual. Ele NÃO é segurança real.
O próximo passo é substituir essa simulação por autenticação e autorização no servidor e associar compras/cursos por e-mail.
