"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Code2, Link as LinkIcon, LoaderCircle, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profile, socialLinks } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Informe um e-mail válido."),
  subject: z.string().trim().min(3, "Informe o assunto."),
  message: z.string().trim().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactForm) {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Não foi possível enviar a mensagem.");
      setStatus("success");
      setStatusMessage("Mensagem enviada com sucesso.");
      reset();
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Não foi possível enviar a mensagem.");
    }
  }

  return (
    <section id="contato" className="section-space">
      <div className="container-shell">
        <div className="contact-panel">
          <Reveal className="lg:max-w-md">
            <p className="eyebrow">05 / Contato</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Vamos construir algo juntos.</h2>
            <p className="mt-5 leading-7 text-[var(--muted)]">Tem uma oportunidade, projeto ou ideia? Entre em contato pelos canais abaixo.</p>
            <a href={`mailto:${profile.email}`} className="mt-8 flex items-center gap-3 font-medium">
              <span className="icon-button"><Mail size={18} /></span>
              {profile.email}
            </a>
            <div className="mt-5 flex gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon === "github" ? Code2 : LinkIcon;
                return <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="icon-button" aria-label={link.label}><Icon size={18} /></a>;
              })}
            </div>
          </Reveal>
          <Reveal className="mt-10 lg:mt-0" delay={0.08}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" error={errors.name?.message}>
                  <input {...register("name")} className="field" placeholder="Seu nome" autoComplete="name" />
                </Field>
                <Field label="E-mail" error={errors.email?.message}>
                  <input {...register("email")} type="email" className="field" placeholder="voce@email.com" autoComplete="email" />
                </Field>
              </div>
              <Field label="Assunto" error={errors.subject?.message}>
                <input {...register("subject")} className="field" placeholder="Assunto da mensagem" />
              </Field>
              <Field label="Mensagem" error={errors.message?.message}>
                <textarea {...register("message")} className="field min-h-36 resize-y" placeholder="Conte um pouco sobre sua ideia ou oportunidade" />
              </Field>
              {status !== "idle" && (
                <p role="status" className={`rounded-lg px-4 py-3 text-sm ${status === "success" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>
                  {statusMessage}
                </p>
              )}
              <button type="submit" disabled={isSubmitting} className="primary-button w-full justify-center sm:w-auto">
                {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={17} />}
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}
