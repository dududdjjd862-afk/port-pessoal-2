import { Braces, Database } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";

const icons = [Braces, Database];

export function Skills() {
  return (
    <section id="skills" className="section-space border-y border-[var(--line)] bg-[var(--surface)]">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">02 / Skills</p>
          <h2 className="section-title mt-3">Ferramentas que domino</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Atualmente aprendendo novas tecnologias em front-end e banco de dados.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = icons[index] ?? Braces;
            return (
              <Reveal key={category.title} delay={index * 0.05} className={index === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
                <article className="skill-card">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <div className="mt-5 space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <p className="font-medium">{skill.name}</p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
