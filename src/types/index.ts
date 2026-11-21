export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};

export type Project = {
  name: string;
  description: string;
  image?: string;
  technologies: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: "Web" | "Mobile" | "Dados" | "Outro";
};

export type Skill = {
  name: string;
  description: string;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export type Education = {
  institution: string;
  course: string;
  degree: string;
  period: string;
  status: "Concluído" | "Em andamento";
  description: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  date: string;
  hours?: string;
  image?: string;
  validationUrl?: string;
};
