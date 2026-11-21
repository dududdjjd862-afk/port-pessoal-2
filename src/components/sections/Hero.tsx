"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDownRight, Code2, Link as LinkIcon, Mail } from "lucide-react";
import { profile, socialLinks } from "@/data/profile";

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[760px] items-center overflow-hidden pt-16">
      <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute right-[-12rem] top-24 h-96 w-96 rounded-full bg-[var(--accent)] opacity-[0.07] blur-3xl" aria-hidden="true" />
      <div className="container-shell relative grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {profile.available ? "Disponível para oportunidades" : "Portfólio profissional"}
          </div>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.18em] text-[var(--accent)]">Olá, eu sou</p>
          <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-[5.25rem]">
            {profile.name}
          </h1>
          <p className="mt-5 text-xl font-medium text-[var(--muted)] sm:text-2xl">{profile.role}</p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            {profile.headline} {profile.bio}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projetos" className="primary-button">
              Ver projetos <ArrowDownRight size={18} />
            </a>
            <a href="#contato" className="secondary-button">
              <Mail size={17} /> Entrar em contato
            </a>
          </div>
          <div className="mt-9 flex gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon === "github" ? Code2 : LinkIcon;
              return (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="icon-button" aria-label={link.label}>
                  <Icon size={19} />
                </a>
              );
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative mx-auto w-full max-w-[440px]">
          <div className="profile-frame aspect-[4/5]">
            {profile.photo ? (
              <Image src={profile.photo} alt={`Foto de ${profile.name}`} fill sizes="(max-width: 1024px) 90vw, 440px" className="object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-between p-7">
                <span className="self-start font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Foto de perfil</span>
                <div className="flex h-44 w-44 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] font-mono text-5xl font-bold text-[var(--accent)]">
                  PF
                </div>
                <span className="self-end text-right font-mono text-xs text-[var(--muted)]">Adicione uma<br />foto profissional</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
