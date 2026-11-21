"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, Layers3 } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";

const categories = ["Todos", "Web", "Mobile", "Dados", "Outro"] as const;

export function Projects() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const filtered = category === "Todos" ? projects : projects.filter((project) => project.category === category);

  return (
    <section id="projetos" className="section-space">
      <div className="container-shell">
        <Reveal>
          <p className="eyebrow">01 / Projetos</p>
          <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="section-title">Trabalhos selecionados</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button key={item} type="button" onClick={() => setCategory(item)} className={`filter-button ${category === item ? "filter-button-active" : ""}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {filtered.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <article className="project-card group">
                <div className="project-preview">
                  {project.image ? (
                    <Image src={project.image} alt={`Prévia do projeto ${project.name}`} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <Layers3 className="mx-auto mb-3 text-[var(--accent)]" size={28} />
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Imagem do projeto</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">{project.category}</p>
                      <h3 className="text-2xl font-semibold">{project.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="icon-button" aria-label={`Repositório de ${project.name}`}><Code2 size={17} /></a>}
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="icon-button" aria-label={`Demo de ${project.name}`}><ArrowUpRight size={18} /></a>}
                    </div>
                  </div>
                  <p className="mt-4 leading-7 text-[var(--muted)]">{project.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                    {project.features.map((feature) => <li key={feature}>• {feature}</li>)}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => <span key={technology} className="tag">{technology}</span>)}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
