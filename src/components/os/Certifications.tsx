"use client";

import { Award, ShieldCheck, Calendar, ExternalLink, ShieldAlert } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  license: string;
  link: string;
  color: string;
  badge: string;
}

export default function Certifications() {
  const certifications: Certification[] = [
    {
      title: "Introduction to subagents",
      issuer: "Anthropic",
      date: "Mar 2026",
      license: "vupr5puhq9pp",
      link: "https://verify.skilljar.com/c/vupr5puhq9pp",
      color: "border-color-accent-indigo hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]",
      badge: "text-color-accent-indigo bg-color-accent-indigo/10"
    },
    {
      title: "Claude code 101",
      issuer: "Anthropic",
      date: "Apr 2026",
      license: "c9p79juqrk3d",
      link: "https://verify.skilljar.com/c/c9p79juqrk3d",
      color: "border-color-accent-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]",
      badge: "text-color-accent-cyan bg-color-accent-cyan/10"
    },
    {
      title: "Commonwealth Bank - Software Engineering Job Simulation",
      issuer: "Forage",
      date: "Apr 2026",
      license: "adGifbuwiLxGtfH5k",
      link: "https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/xv8eSGu7nksKNiCQj_2sNmYuurxgpFYawco_69b855cf41541f54b09be125_1776839423735_completion_certificate.pdf",
      color: "border-color-accent-orange hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]",
      badge: "text-color-accent-orange bg-color-accent-orange/10"
    }
  ];

  return (
    <div className="w-full h-full p-6 bg-black/30 flex flex-col gap-6 overflow-auto font-sans">
      <div className="border-b border-white/5 pb-3">
        <h4 className="h4 text-sm font-mono tracking-wide text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-color-accent-cyan" />
          CREDENTIALS REGISTRY // CERTIFICATIONS
        </h4>
        <p className="text-[10px] text-text-dimmed mt-1">Verified industry credentials and professional software engineering certificates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert, idx) => (
          <div 
            key={idx} 
            className={`glass-panel p-5 rounded-xl border flex flex-col gap-4 transition-all duration-300 ${cert.color}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/5 shadow-md">
                <Award className="w-5 h-5 text-color-accent-cyan" />
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${cert.badge} flex items-center gap-1`}>
                <ShieldCheck className="w-3 h-3" /> VERIFIED
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h5 className="text-sm font-semibold tracking-wide text-white leading-snug">{cert.title}</h5>
              <p className="text-xs text-text-muted font-mono">{cert.issuer}</p>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-3 text-[10px] font-mono">
                <div className="flex items-center gap-1 text-text-dimmed">
                  <Calendar className="w-3.5 h-3.5 text-color-accent-orange" />
                  <span>Issued: {cert.date}</span>
                </div>
                <div className="text-text-secondary bg-white/5 px-2 py-0.5 rounded border border-white/5 truncate max-w-[150px]">
                  <span>ID: {cert.license}</span>
                </div>
              </div>

              <a 
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-1.5 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-color-accent-cyan/40 text-white rounded-lg text-xs font-mono transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Verify Credential <ExternalLink className="w-3.5 h-3.5 text-color-accent-cyan" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
