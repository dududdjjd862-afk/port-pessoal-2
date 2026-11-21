# Portfólio pessoal — Next.js

Portfólio profissional responsivo desenvolvido com Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React, Motion, React Hook Form e Zod.

## Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Personalização

Atualize os dados em `src/data/`:

- `profile.ts`: nome, profissão, bio, foto, e-mail e redes sociais.
- `projects.ts`: projetos, descrições, tecnologias, recursos e links.
- `skills.ts`: categorias e competências técnicas.
- `education.ts`: formação e certificados.
- `hobbies.ts`: interesses pessoais.

Todos os campos ainda não informados aparecem como placeholders. Não substitua por dados pessoais sem confirmação.

Para adicionar fotos reais, coloque os arquivos em `public/images/` e configure o campo correspondente. Para certificados, use `public/certificates/`.

## Qualidade

```bash
npm run lint
npm run build
```

## Deploy

Implante no Vercel ou em outra plataforma compatível com Next.js. Configure as variáveis de ambiente em produção.
