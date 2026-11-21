import { Award, GraduationCap } from "lucide-react";
import { certificates, education } from "@/data/education";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section id="trajetoria" className="section-space">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">03 / Trajetória</p>
          <h2 className="section-title mt-3">Formação e certificados</h2>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
          <div>
            {education.map((item, index) => (
              <Reveal key={`${item.institution}-${item.course}`} delay={index * 0.06}>
                <article className="timeline-card">
                  <div className="timeline-marker"><GraduationCap size={18} /></div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold">{item.course}</h3>
                  <p className="mt-1 font-medium text-[var(--muted)]">{item.institution} · {item.degree}</p>
                  <span className="mt-4 inline-block rounded-full border border-[var(--line)] px-3 py-1 text-xs">{item.status}</span>
                  <p className="mt-4 leading-7 text-[var(--muted)]">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Certificações</p>
            {certificates.map((certificate) => (
              <Reveal key={certificate.name}>
                <article className="certificate-card">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]"><Award size={19} /></div>
                  <div>
                    <h3 className="font-semibold">{certificate.name}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{certificate.issuer} · {certificate.date}</p>
                    {certificate.hours && <p className="mt-2 font-mono text-xs text-[var(--muted)]">{certificate.hours}</p>}
                    {certificate.validationUrl && <a href={certificate.validationUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium text-[var(--accent)] underline underline-offset-4">Validar certificado</a>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
