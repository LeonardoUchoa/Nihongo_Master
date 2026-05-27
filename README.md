# Nihongo Master

Nihongo Master e um aplicativo mobile-first para estudo de japones. A proposta e ajudar estudantes a praticar hiragana, katakana, kanji, revisoes e progresso de estudo em uma experiencia simples, visual e gamificada.

O projeto foi iniciado a partir de um bundle do Figma Make e evoluiu para uma aplicacao React com autenticacao via Supabase.

## Funcionalidades

- Splash screen com identidade visual do app.
- Login, cadastro, recuperacao de senha e login social com Google via Supabase Auth.
- Protecao de rotas para impedir acesso sem usuario autenticado.
- Tela inicial com resumo de XP, sequencia de estudos e sessoes do dia.
- Tela de estudo de kanji com leitura, significado, mnemônico, audio visual e exemplos.
- Tela de progresso com estatisticas, mapa de atividade e conquistas.
- Perfil basico salvo no Supabase em `public.profiles`, incluindo o nivel inicial do usuario.

## Stack

- React 18
- Vite
- Tailwind CSS v4
- React Router
- Supabase
- Lucide React
- shadcn/Radix UI components

## Estrutura

```text
src/
  app/
    auth/                 # Contexto de autenticacao e rotas protegidas
    components/           # Telas e componentes da interface
  lib/
    supabase.ts           # Cliente Supabase e tipos do banco
supabase/
  schema.sql              # Tabelas, policies e triggers do Supabase
```

## Configuracao

Instale as dependencias:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com base em `.env.example`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

No painel do Supabase, execute o conteudo de `supabase/schema.sql` no SQL Editor. Esse script cria a tabela `profiles`, ativa Row Level Security, adiciona policies para o usuario acessar apenas o proprio perfil e cria um trigger para gerar o perfil automaticamente apos o cadastro no Auth.

## Rodando localmente

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:5173/
```

ou:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

## Observacoes

- Nunca commite o arquivo `.env`.
- Use apenas a `anon public key` no front-end.
- Nao use a `service_role key` no app React.
- O backend atual depende do Supabase Auth e da tabela `profiles`; as demais telas ainda usam dados mockados.
