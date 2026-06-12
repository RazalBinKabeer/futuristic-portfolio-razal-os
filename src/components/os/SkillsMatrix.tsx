"use client";

import { Award, Code2, Cpu, Database, ClipboardList, Settings } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0 to 100
  color: string; // Tailwind gradient color
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: Skill[];
}

export default function SkillsMatrix() {
  const skillCategories: SkillCategory[] = [
    {
      title: "AI & Workflow Automation",
      icon: Cpu,
      skills: [
        { name: "Claude Code / Gemini CLI", level: 90, color: "from-purple-400 to-indigo-500" },
        { name: "Antigravity Agentic Coding", level: 88, color: "from-pink-500 to-rose-500" },
        { name: "LLM API Integration (OpenAI, Anthropic)", level: 92, color: "from-purple-500 to-violet-500" },
        { name: "Ollama Local Inference", level: 85, color: "from-violet-500 to-indigo-600" }
      ]
    },
    {
      title: "Frontend Engineering",
      icon: Code2,
      skills: [
        { name: "React 19 / Next.js 15", level: 95, color: "from-sky-400 to-blue-500" },
        { name: "TypeScript / ES6+ JavaScript", level: 93, color: "from-blue-500 to-indigo-500" },
        { name: "Tailwind CSS & Modern SCSS", level: 96, color: "from-cyan-400 to-teal-500" },
        { name: "HTML5 / CSS3 Standards", level: 95, color: "from-teal-400 to-emerald-500" }
      ]
    },
    {
      title: "State Management & Data Fetching",
      icon: Database,
      skills: [
        { name: "TanStack Query & SWR", level: 94, color: "from-color-accent-orange to-red-500" },
        { name: "Zustand & Jotai", level: 90, color: "from-yellow-500 to-amber-500" },
        { name: "Context API & React State", level: 95, color: "from-amber-400 to-orange-500" }
      ]
    },
    {
      title: "Forms, Testing & UI Tools",
      icon: ClipboardList,
      skills: [
        { name: "Formik & React Hook Form", level: 92, color: "from-indigo-500 to-purple-500" },
        { name: "Playwright / Jest / Vitest", level: 86, color: "from-red-400 to-pink-500" },
        { name: "Figma Collaboration & Design Systems", level: 88, color: "from-teal-400 to-cyan-500" }
      ]
    },
    {
      title: "DevOps & Backend Collaboration",
      icon: Settings,
      skills: [
        { name: "Git, GitHub & GitLab", level: 92, color: "from-green-400 to-emerald-500" },
        { name: "Docker & Containerization", level: 84, color: "from-blue-400 to-sky-500" },
        { name: "CI/CD (GitHub Actions / GitLab CI)", level: 88, color: "from-emerald-400 to-teal-500" },
        { name: "REST APIs, FastAPI & WebSockets", level: 90, color: "from-cyan-500 to-blue-600" }
      ]
    }
  ];

  return (
    <div className="w-full h-full p-6 bg-black/30 font-sans flex flex-col gap-6 overflow-y-auto select-none">
      <div className="border-b border-white/5 pb-3">
        <h4 className="h4 text-sm font-mono tracking-wide text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-color-accent-cyan" />
          TECHNICAL MATRICES // CORE_COMPETENCIES
        </h4>
        <p className="text-[10px] text-text-dimmed mt-1">Registry of synchronized capabilities and engineering proficiencies</p>
      </div>

      <div className="flex flex-col gap-6">
        {skillCategories.map((category, idx) => {
          const CategoryIcon = category.icon;
          return (
            <div key={idx} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-mono text-[10px] tracking-wider uppercase border-b border-white/5 pb-1">
                <CategoryIcon className="w-3.5 h-3.5 text-color-accent-cyan" />
                <span>{category.title}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="glass-panel p-4 flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-mono text-text-secondary">
                      <span>{skill.name}</span>
                      <span className="text-color-accent-cyan font-bold">{skill.level}%</span>
                    </div>
                    {/* Glowing progress slider track */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${skill.level}%` }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
