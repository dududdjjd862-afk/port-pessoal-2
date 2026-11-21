import { Camera, Heart, Mountain } from "lucide-react";
import { hobbies } from "@/data/hobbies";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Camera, Mountain, Heart];

export function Hobbies() {
  return (
    <section id="sobre" className="section-space border-y border-[var(--line)] bg-[var(--surface)]">
      <div className="container-shell grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">04 / Sobre mim</p>
          <h2 className="section-title mt-3">Além do código</h2>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            [Adicione uma descrição pessoal autêntica: como você gosta de trabalhar, o que te motiva, quais valores orientam suas decisões e como seus interesses pessoais influenciam sua criatividade.]
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {hobbies.map((hobby, index) => {
            const Icon = icons[index] ?? Heart;
            return (
              <Reveal key={hobby.title} delay={index * 0.07}>
                <article className="hobby-card">
                  <Icon size={23} className="text-[var(--accent)]" />
                  <h3 className="mt-10 text-lg font-semibold">{hobby.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{hobby.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
