"use client";

import { Calendar, Briefcase, ExternalLink, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectDetail {
  name: string;
  tech: string;
  points: string[];
  link?: string;
}

interface CareerPosition {
  role: string;
  company: string;
  location: string;
  period: string;
  projects: ProjectDetail[];
}

export default function Career() {
  const experiences: CareerPosition[] = [
    
    {
      role: "Associate Software Developer",
      company: "WebandCrafts (WAC)",
      location: "Kerala, India",
      period: "Jan 2025 -- May 2025",
      projects: [
        {
          name: "Caribou Coffee Dashboard",
          tech: "React, TanStack Query, Zustand, Formik, Context API, Sockets",
          points: [
            "Led frontend development for an enterprise dashboard handling operational workflows.",
            "Integrated real-time updates using socket-based communication to improve live operational visibility."
          ]
        },
        {
          name: "VGuard Charity Management Application",
          tech: "React, SWR, Formik, Jotai, Context API, Sockets",
          points: [
            "Served as Frontend Lead Developer implementing role-based UI previews and installment splitting/merging tools.",
            "Developed a dynamic form builder system allowing administrators to create and manage custom forms."
          ]
        },
        {
          name: "Middlesex University Dubai Official Website",
          tech: "Next.js, SWR, Formik, SSR, TanStack Table",
          link: "https://mdx.ac.ae/",
          points: [
            "Developed and maintained large-scale university web platform supporting 1500+ dynamic page architectures.",
            "Implemented server-side rendering (SSR) strategies to improve SEO performance and page load speed."
          ]
        },
        {
          name: "IKEA Food Platform",
          tech: "React, Magento, GraphQL",
          link: "https://food.ikea.ae/",
          points: [
            "Built a dynamic ordering platform with optimized cart, checkout flows, and GraphQL API integrations."
          ]
        }
      ]
    },
    {
      role: "Frontend Developer",
      company: "Waterfall Pumps",
      location: "Dubai, UAE",
      period: "Apr 2023 -- Dec 2024",
      projects: [
        {
          name: "Waterfall Pumps Corporate Platform",
          tech: "React, responsive layout, SEO, Asset Optimization",
          link: "https://wfpumps.com/",
          points: [
            "Developed and maintained corporate web platform showcasing industrial products and technical catalogs.",
            "Improved frontend performance through asset optimization and responsive rendering strategies."
          ]
        }
      ]
    },
    {
      role: "Junior Web Developer",
      company: "Technoid FZE",
      location: "Dubai, UAE",
      period: "Jul 2022 -- Mar 2023",
      projects: [
        {
          name: "Moishi E-Commerce Platform (UAE/Egypt)",
          tech: "Shopify Liquid, JavaScript, responsive UI",
          link: "https://moishi.com/",
          points: [
            "Developed responsive Shopify storefront interfaces for a multi-region dessert brand.",
            "Optimized customer shopping experiences and mobile layouts across devices."
          ]
        },
        {
          name: "Technoid Corporate Website",
          tech: "HTML5, CSS3, JavaScript, asset delivery optimization",
          link: "https://technoid.ae/",
          points: [
            "Developed and maintained the company corporate website, improving frontend responsiveness."
          ]
        }
      ]
    }
  ];

  return (
    <div className="w-full h-full p-6 bg-black/30 flex flex-col gap-6 overflow-auto font-sans">
      <div className="border-b border-white/5 pb-3">
        <h4 className="h4 text-sm font-mono tracking-wide text-white">CAREER CHRONOLOGY // WORK EXPERIENCE</h4>
        <p className="text-[10px] text-text-dimmed mt-1">Timeline logs of professional software engineering contracts</p>
      </div>

      <div className="relative border-l border-white/10 pl-6 ml-3 flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-bg-dark border-2 border-color-accent-indigo flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
              <div className="w-1.5 h-1.5 rounded-full bg-color-accent-cyan animate-pulse" />
            </div>

            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 mb-3">
              <div>
                <h5 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-color-accent-indigo" />
                  {exp.role}
                </h5>
                <p className="text-xs text-color-accent-cyan font-mono mt-0.5 flex items-center gap-1">
                  {exp.company}
                  <span className="text-text-dimmed">|</span>
                  <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" /> {exp.location}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded-md self-start md:self-auto">
                <Calendar className="w-3.5 h-3.5 text-color-accent-orange" />
                {exp.period}
              </div>
            </div>

            {/* Projects list */}
            <div className="flex flex-col gap-4 mt-2">
              {exp.projects.map((proj, pIdx) => (
                <div key={pIdx} className="glass-panel p-4 rounded-lg flex flex-col gap-2 hover:border-white/10 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-1.5">
                    <span className="text-xs font-semibold text-white font-mono flex items-center gap-1">
                      {proj.name}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-color-accent-indigo hover:text-color-accent-cyan transition-colors">
                          <ExternalLink className="w-3 h-3 inline ml-0.5" />
                        </a>
                      )}
                    </span>
                    <span className="text-[9px] font-mono text-color-accent-cyan bg-color-accent-cyan/10 border border-color-accent-cyan/10 px-1.5 py-0.5 rounded sm:text-right w-fit">
                      {proj.tech}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-text-muted flex flex-col gap-1 leading-normal">
                    {proj.points.map((pt, ptIdx) => (
                      <li key={ptIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
