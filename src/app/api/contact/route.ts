import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await request.json());
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL;

    if (!apiKey || !recipient) {
      return NextResponse.json(
        { error: "O envio de e-mail ainda não foi configurado. Defina RESEND_API_KEY e CONTACT_EMAIL no arquivo .env.local." },
        { status: 503 },
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "Portfolio <onboarding@resend.dev>",
        to: [recipient],
        reply_to: body.email,
        subject: `[Portfólio] ${body.subject}`,
        text: `Nome: ${body.name}\nE-mail: ${body.email}\n\n${body.message}`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Falha no envio de e-mail:", error);
      return NextResponse.json({ error: "Não foi possível enviar a mensagem. Tente novamente." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Verifique os dados enviados." }, { status: 400 });
    }
    console.error("Erro inesperado no contato:", error);
    return NextResponse.json({ error: "Erro interno ao enviar a mensagem." }, { status: 500 });
  }
}
