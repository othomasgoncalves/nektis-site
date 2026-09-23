import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contatoSchema, isEmail } from "@/lib/contato-schema";
import ContatoEmail from "@/emails/ContatoEmail";

export const dynamic = "force-dynamic";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

async function salvarNoNotion(input: {
  nome: string;
  empresa: string;
  contato: string;
  assunto: string;
}) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) return;

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Nome: { title: [{ text: { content: input.nome } }] },
          Empresa: { rich_text: [{ text: { content: input.empresa } }] },
          Contato: { rich_text: [{ text: { content: input.contato } }] },
          Assunto: { rich_text: [{ text: { content: input.assunto } }] },
          Data: { date: { start: new Date().toISOString() } },
          Status: { select: { name: "Novo" } },
        },
      }),
    });

    if (!res.ok) {
      console.error("Notion: falha ao gravar lead", await res.text());
    }
  } catch (err) {
    console.error("Notion: erro ao gravar lead", err);
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um pouco antes de tentar de novo." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const parsed = contatoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { nome, empresa, contato, assunto, site } = parsed.data;

  if (site && site.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!resendApiKey || !to) {
    console.error("Contato: RESEND_API_KEY ou CONTACT_TO_EMAIL não configurados.");
    return NextResponse.json(
      { error: "Não foi possível enviar agora. Tente novamente mais tarde." },
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: "Nektis <contato@nektis.tech>",
    to,
    replyTo: isEmail(contato) ? contato : undefined,
    subject: `Novo contato — ${empresa}`,
    react: ContatoEmail({ nome, empresa, contato, assunto }),
  });

  if (error) {
    console.error("Resend: falha ao enviar e-mail", error);
    return NextResponse.json(
      { error: "Não foi possível enviar agora. Tente novamente mais tarde." },
      { status: 500 }
    );
  }

  await salvarNoNotion({ nome, empresa, contato, assunto });

  return NextResponse.json({ ok: true });
}
