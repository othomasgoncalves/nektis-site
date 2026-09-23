# Nektis — site institucional

Site institucional da [Nektis](https://nektis.tech), consultoria de tecnologia. É uma página única com as seções da empresa e um formulário de contato que envia e-mail e registra o lead no Notion.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- [Motion](https://motion.dev) para animações
- [Resend](https://resend.com) + [React Email](https://react.email) para o e-mail de contato
- [Zod](https://zod.dev) para validação do formulário
- API do Notion para registro de leads (opcional)

## Rodando localmente

Requisitos: Node.js 20.9 ou superior.

```bash
npm install
```

```bash
npm run dev
```

O site fica em [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | ESLint |

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `RESEND_API_KEY` | Sim | Chave da API do Resend |
| `CONTACT_TO_EMAIL` | Sim | E-mail que recebe as mensagens do formulário |
| `NOTION_TOKEN` | Não | Token da integração do Notion |
| `NOTION_DATABASE_ID` | Não | ID da base do Notion onde os leads são gravados |

Sem `RESEND_API_KEY` ou `CONTACT_TO_EMAIL`, o formulário responde com erro. Sem as variáveis do Notion, o envio funciona normalmente e só não registra o lead.

## Estrutura

```
app/
  layout.tsx            # HTML raiz, metadados (SEO/Open Graph) e fontes
  page.tsx              # Composição da página com as seções
  globals.css           # Tema e estilos globais
  api/contato/route.ts  # Endpoint do formulário de contato
components/             # Seções da página (Hero, OQueFazemos, QuemSomos, Contato...)
  Simbolo.tsx           # Símbolo da Nektis em SVG e suas variações
  Reveal.tsx            # Animação de entrada ao rolar a página
emails/
  ContatoEmail.tsx      # Template do e-mail enviado pelo formulário
lib/
  contato-schema.ts     # Schema Zod do formulário
  fonts.ts              # Unbounded (Google Fonts) e Satoshi (local)
  symbol.ts             # Geometria do símbolo
public/
  brand/                # Ícones da marca
  fonts/                # Satoshi
  time/                 # Fotos do time
```

## Formulário de contato

O `POST /api/contato`:

1. Limita cada IP a 5 envios por hora. O controle fica em memória e zera quando o servidor reinicia.
2. Valida os campos com o schema de `lib/contato-schema.ts`.
3. Descarta silenciosamente o envio quando o campo oculto `site` vem preenchido (honeypot anti-spam).
4. Envia o e-mail pelo Resend a partir de `contato@nektis.tech`. Quando o contato informado é um e-mail, ele vira o `reply-to`.
5. Grava o lead no Notion, se configurado.

### Resend

O domínio `nektis.tech` precisa estar verificado no painel do Resend. Para testar sem domínio verificado, troque o `from` em `app/api/contato/route.ts` por `onboarding@resend.dev`. Esse remetente só entrega para o e-mail da conta do Resend.

### Notion

A base precisa estar compartilhada com a integração e ter estas propriedades:

| Propriedade | Tipo |
|---|---|
| `Nome` | Título |
| `Empresa` | Texto |
| `Contato` | Texto |
| `Assunto` | Texto |
| `Data` | Data |
| `Status` | Seleção (com a opção `Novo`) |

Uma falha no Notion é só registrada no log e não impede o envio do e-mail.

## Deploy

O site roda na [Square Cloud](https://squarecloud.app), configurada pelo arquivo `squarecloud.app` (sobe com `next start` na porta 80). As variáveis de ambiente precisam ser cadastradas no painel da aplicação.
