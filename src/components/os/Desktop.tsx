"use client";

import { useOSStore } from "@/store/osStore";
import WindowFrame from "./WindowFrame";
import Terminal from "./Terminal";
import SystemMonitor from "./SystemMonitor";
import Dock from "./Dock";
import SynapticCore from "../canvas/SynapticCore";
import FloatingLogos from "../canvas/FloatingLogos";
import SkillsMatrix from "./SkillsMatrix";
import ContactForm from "./ContactForm";
import Career from "./Career";
import Certifications from "./Certifications";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDevice } from "@/hooks/useDevice";
import {
  Terminal as TermIcon,
  Activity,
  FolderGit,
  User,
  Mail,
  Code2,
  Github,
  Linkedin,
  ExternalLink,
  Briefcase,
  Award,
  Phone,
  MapPin,
  Download,
} from "lucide-react";

export default function Desktop() {
  const windows = useOSStore((state) => state.windows);
  const openWindow = useOSStore((state) => state.openWindow);
  const booted = useOSStore((state) => state.booted);
  const bootOS = useOSStore((state) => state.bootOS);
  const device = useDevice();
  const isMobile = device === "mobile";

  // Desktop shortcuts arranged in a horizontal row at the top
  const desktopShortcuts = [
    {
      id: "bio",
      label: "Identity.log",
      icon: User,
      color: "text-color-accent-orange",
    },
    {
      id: "skills",
      label: "Skills.sys",
      icon: Code2,
      color: "text-color-accent-cyan",
    },
    {
      id: "career",
      label: "Career.log",
      icon: Briefcase,
      color: "text-purple-400",
    },
    {
      id: "certifications",
      label: "Credentials.lnk",
      icon: Award,
      color: "text-yellow-400",
    },
    {
      id: "projects",
      label: "Projects.lnk",
      icon: FolderGit,
      color: "text-color-accent-indigo",
    },
    {
      id: "terminal",
      label: "Terminal.sh",
      icon: TermIcon,
      color: "text-green-400",
    },
    {
      id: "monitor",
      label: "Telemetry.sys",
      icon: Activity,
      color: "text-color-accent-cyan",
    },
    {
      id: "contact",
      label: "Contact.lnk",
      icon: Mail,
      color: "text-color-accent-orange",
    },
  ];

  const projectsData = [
    {
      title: "HorecaHub E-Commerce Platform",
      tag: "NEXT.JS // TYPESCRIPT // I18N",
      desc: "Multilingual B2B e-commerce platform for hospitality businesses. Built barcode scanning and voice recognition capabilities.",
      link: "https://horecahub.ae/",
    },
    {
      title: "Caribou Coffee Dashboard",
      tag: "REACT // ZUSTAND // SOCKETS",
      desc: "Enterprise dashboard for operational workflows. Integrated real-time updates using socket-based communication.",
    },
    {
      title: "VGuard Charity Management Application",
      tag: "REACT // SWR // JOTAI",
      desc: "Role-based beneficiary management. Developed a dynamic form builder system and installment splitting tools.",
    },
    {
      title: "Middlesex University Dubai Official Website",
      tag: "NEXT.JS // SSR // SWR",
      desc: "Large-scale university web platform supporting 1500+ pages. Implemented SSR strategies to boost SEO and performance.",
      link: "https://mdx.ac.ae/",
    },
    {
      title: "IKEA Food Platform",
      tag: "REACT // MAGENTO // GRAPHQL",
      desc: "Dynamic ordering platform with optimized cart, checkout flows, and GraphQL API integrations.",
      link: "https://food.ikea.ae/",
    },
    {
      title: "Waterfall Pumps Corporate Platform",
      tag: "REACT // SEO // RESPONSIVE",
      desc: "Corporate web platform showcasing industrial products and technical catalogs with asset optimization.",
      link: "https://wfpumps.com/",
    },
    {
      title: "Moishi E-Commerce Platform (UAE/Egypt)",
      tag: "SHOPIFY LIQUID // JAVASCRIPT",
      desc: "Responsive Shopify storefront interfaces for a multi-region dessert brand.",
      link: "https://moishi.com/",
    },
    {
      title: "Technoid Corporate Website",
      tag: "HTML5 // CSS3 // JAVASCRIPT",
      desc: "Corporate website built with vanilla web technologies focusing on asset delivery optimization.",
      link: "https://technoid.ae/",
    },
  ];

  if (!booted) {
    return (
      <div className="fixed inset-0 z-[99999] bg-bg-dark flex flex-col items-center justify-center p-6 font-mono text-xs md:text-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col gap-6 items-center text-center max-w-md"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-color-accent-indigo to-color-accent-cyan rounded-xl rotate-45 flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 bg-bg-dark rounded-lg rotate-45" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="h2 text-lg tracking-wider text-white">
              MOHAMED RAZAL KABEER
            </h1>
            <p className="text-text-muted">
              Interactive Frontend Engineering Portfolio. Run initial boot
              diagnostics to enter.
            </p>
          </div>
          <button
            onClick={() => bootOS(isMobile)}
            className="w-full mt-2 px-6 py-3 bg-white text-bg-dark rounded-lg font-semibold hover:bg-neutral-200 transition-colors duration-200 cursor-pointer shadow-lg"
          >
            BOOT RAZAL OS
          </button>
        </motion.div>
      </div>
    );
  }

  const customCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none' stroke='%2306b6d4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='16' cy='16' r='6'/><path d='M16 4v6M16 22v6M4 16h6M22 16h6'/></svg>") 16 16, auto`;

  return (
    <div
      className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-bg-dark p-6"
      style={{ cursor: customCursor }}
    >
      {/* 1. Backdrop Grid, Bouncing Tech Logos, and 3D WebGL Core */}
      <div className="absolute inset-0 z-0">
        <div className="ambient-grid h-full w-full" />

        {/* Giant Watermark Background Text */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-sans font-extrabold text-[12vw] tracking-tighter text-white/[0.035] blur-[1px] leading-none uppercase">
              RAZAL.OS
            </span>
          </div>
        )}

        <FloatingLogos />
        <div className="absolute inset-0 w-full h-full opacity-60">
          <SynapticCore />
        </div>
      </div>

      {/* 2. Desktop Shortcut Icons Grid */}
      <div
        className={`absolute top-6 left-6 right-6 z-10 flex flex-row flex-wrap pointer-events-auto items-start ${
          isMobile
            ? "gap-6 justify-center mt-6"
            : "gap-4 md:gap-6 justify-start"
        }`}
      >
        {desktopShortcuts.map((shortcut) => {
          const ShortcutIcon = shortcut.icon;
          return (
            <motion.button
              key={shortcut.id}
              onClick={() =>
                openWindow(shortcut.id, window.innerWidth, window.innerHeight)
              }
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`group flex flex-col items-center justify-center gap-2 rounded-xl backdrop-blur-[4px] hover:bg-white/[0.08] hover:border-color-accent-indigo/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-200 cursor-pointer text-center select-none shadow-lg ${
                isMobile
                  ? "w-20 h-20 bg-transparent border-transparent"
                  : "w-24 h-24 bg-white/[0.02] border border-white/[0.04]"
              }`}
            >
              <div
                className={`flex items-center justify-center transition-all duration-200 shadow-md ${
                  isMobile
                    ? "w-14 h-14 rounded-[1.2rem] bg-gradient-to-tr from-white/10 to-white/5 border border-white/20"
                    : "w-11 h-11 rounded-lg bg-black/40 border border-white/5 group-hover:border-color-accent-cyan/30 group-hover:bg-black/60"
                }`}
              >
                <ShortcutIcon
                  className={`${isMobile ? "w-6 h-6" : "w-5 h-5"} ${shortcut.color} group-hover:scale-1.1 transition-transform duration-200`}
                />
              </div>
              <span
                className={`font-mono tracking-wide transition-colors duration-200 ${
                  isMobile
                    ? "text-[11px] text-white font-medium drop-shadow-md"
                    : "text-[10px] text-text-secondary group-hover:text-white"
                }`}
              >
                {isMobile ? shortcut.label.split(".")[0] : shortcut.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* 3. Render Mounted Windows */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="relative w-full h-full pointer-events-none">
          {/* Terminal Window */}
          <WindowFrame id="terminal">
            <Terminal />
          </WindowFrame>

          {/* System Performance Monitor Window */}
          <WindowFrame id="monitor">
            <SystemMonitor />
          </WindowFrame>

          {/* Projects Portfolio Window */}
          <WindowFrame id="projects">
            <div className="w-full h-full p-6 bg-black/30 flex flex-col gap-6 overflow-auto">
              <div className="border-b border-white/5 pb-3">
                <h4 className="h4 text-sm font-mono tracking-wide text-white">
                  PORTFOLIO VAULT // REPOSITORIES
                </h4>
                <p className="text-[10px] text-text-dimmed mt-1">
                  Select vault records to access repository documentation
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectsData.map((project, idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-5 flex flex-col gap-3 hover:border-color-accent-indigo hover:bg-white/[0.03] transition-colors duration-200"
                  >
                    <span className="font-mono text-[10px] text-color-accent-cyan">
                      {project.tag}
                    </span>
                    <h5 className="h4 text-base tracking-wide text-white font-semibold">
                      {project.title}
                    </h5>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {project.desc}
                    </p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-mono text-color-accent-indigo hover:text-color-accent-cyan transition-colors mt-auto self-start"
                      >
                        Live Website <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </WindowFrame>

          {/* Skills Matrix Window */}
          <WindowFrame id="skills">
            <SkillsMatrix />
          </WindowFrame>

          {/* Contact Form Window */}
          <WindowFrame id="contact">
            <ContactForm />
          </WindowFrame>

          {/* Identity/Biography Window */}
          <WindowFrame id="bio">
            <div className="w-full h-full p-6 bg-black/30 flex flex-col gap-6 overflow-auto font-sans">
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="relative w-12 h-12 rounded-full border-2 border-color-accent-indigo overflow-hidden shrink-0 flex items-center justify-center">
                  <Image
                    src="/dp.png"
                    alt="Razal Kabeer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="h4 text-base text-white">
                    Mohamed Razal Kabeer
                  </h4>
                  <p className="text-xs text-color-accent-cyan font-mono">
                    Frontend Engineer // OS Core
                  </p>
                  <a
                    href="/Razal_Kabeer_Frontend_Resume.pdf"
                    download="Razal_Kabeer_Frontend_Resume.pdf"
                    className="mt-2 inline-flex items-center justify-center gap-2 bg-color-accent-indigo text-white text-[10px] font-mono rounded-md hover:bg-color-accent-cyan transition-colors cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                  >
                    <Download className="w-3 h-3" /> DOWNLOAD_RESUME.pdf
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-xs text-text-muted leading-relaxed">
                <p>
                  Frontend Engineer with experience building scalable SaaS
                  platforms, enterprise dashboards, B2B e-commerce applications,
                  and dynamic web portals. Specialized in React, Next.js,
                  frontend architectures, server-side rendering (SSR), and
                  real-time socket interfaces.
                </p>

                <div className="glass-panel p-3 flex flex-col gap-1.5 font-mono text-[10px]">
                  <div className="text-color-accent-cyan mb-0.5 border-b border-white/5 pb-0.5">
                    ACADEMIC_LOGS
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Degree:</span>
                    <span className="text-white">
                      BCA (Computer Applications)
                    </span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>University:</span>
                    <span className="text-white">Calicut University</span>
                  </div>
                </div>

                <div className="glass-panel p-4 flex flex-col gap-2 font-mono">
                  <div className="text-[10px] text-color-accent-orange mb-1 border-b border-white/5 pb-1">
                    COMMUNICATION_CHANNELS
                  </div>

                  <div className="flex items-center justify-between text-text-secondary">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-color-accent-orange" />{" "}
                      Location:
                    </span>
                    <span className="text-white">Al Nahda, Dubai, UAE</span>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary mt-1">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-color-accent-cyan" /> Email:
                    </span>
                    <a
                      href="mailto:razalkabeer@hotmail.com"
                      className="hover:text-color-accent-cyan flex items-center gap-1.5"
                    >
                      razalkabeer@hotmail.com{" "}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-green-400" /> Phone/WA:
                    </span>
                    <a
                      href="https://wa.me/971558736619"
                      target="_blank"
                      className="hover:text-color-accent-cyan flex items-center gap-1.5"
                    >
                      +971 55 873 6619 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary mt-1">
                    <span className="flex items-center gap-1">
                      <Github className="w-3 h-3 text-white" /> GitHub:
                    </span>
                    <a
                      href="https://github.com/RazalBinKabeer"
                      target="_blank"
                      className="hover:text-color-accent-cyan flex items-center gap-1.5"
                    >
                      @RazalBinKabeer <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-text-secondary mt-1">
                    <span className="flex items-center gap-1">
                      <Linkedin className="w-3 h-3 text-color-accent-indigo" />{" "}
                      LinkedIn:
                    </span>
                    <a
                      href="https://www.linkedin.com/in/razal-bin-kabeer/"
                      target="_blank"
                      className="hover:text-color-accent-cyan flex items-center gap-1.5"
                    >
                      /in/razal-bin-kabeer <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </WindowFrame>

          {/* Career Timeline Window */}
          <WindowFrame id="career">
            <Career />
          </WindowFrame>

          {/* Certifications Registry Window */}
          <WindowFrame id="certifications">
            <Certifications />
          </WindowFrame>
        </div>
      </div>

      {/* 4. Bottom Dock Utility Controls */}
      <Dock />
    </div>
  );
}
