"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/store/osStore';

export default function Terminal() {
  const history = useOSStore((state) => state.terminalHistory);
  const executeCommand = useOSStore((state) => state.executeCommand);
  const clearTerminal = useOSStore((state) => state.clearTerminal);
  const openWindow = useOSStore((state) => state.openWindow);

  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to terminal bottom on history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep focus in terminal input
  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim();
    if (!command) return;

    const lowerCmd = command.toLowerCase();
    let output = '';

    switch (lowerCmd) {
      case 'help':
        output = `Available system modules and diagnostics:
  help           - Print this reference guidelines table
  about          - Access developer background core identity logs
  skills         - View stack capabilities ASCII matrix
  career         - Open career timeline and experience logs
  certifications - Open verified credentials registry vault
  projects       - Fetch and open project vault memory bank window
  monitor        - Launch live system telemetry widget window
  contact        - Open secure channels message dispatch form
  clear          - Purge terminal display logs`;
        break;
      case 'about':
      case 'bio':
      case 'identity':
        openWindow('bio');
        output = `IDENTITY METADATA CORE:
  Name: Mohamed Razal Kabeer
  Role: Frontend Engineer // OS Core Architect
  Location: Al Nahda, Dubai, UAE
  Focus: Next.js 15, React 19, TypeScript, Real-time systems & complex dashboards.
  Bio: Developing scalable B2B systems, custom interfaces, and advanced WebGL interactions.`;
        break;
      case 'skills':
        openWindow('skills');
        output = `CAPABILITY LOGMATRIX:
  =============================================================
  AI Tools:    Claude Code / Gemini CLI / Antigravity / Ollama
  Frontend:    React 19 / Next.js 15 / TypeScript / Tailwind CSS
  State/Data:  TanStack Query / SWR / Zustand / Jotai
  Forms/UI:    Formik / React Hook Form / Responsive Systems
  DevOps:      Git / Docker / GitHub Actions / GitLab CI/CD
  Backend:     REST APIs / FastAPI / WebSockets (Sockets)
  Testing:     Playwright / Jest / Vitest
  =============================================================`;
        break;
      case 'career':
      case 'experience':
        openWindow('career');
        output = `STATUS: Accessing Chronology Records...
Action: Invoked window [career]. Initializing professional career timeline...`;
        break;
      case 'certifications':
      case 'credentials':
        openWindow('certifications');
        output = `STATUS: Fetching Credentials Registry...
Action: Invoked window [certifications]. Opening verified certificates registry...`;
        break;
      case 'projects':
        openWindow('projects');
        output = `STATUS: Accessing Memory Bank Vault...
Action: Invoked window [projects]. Initializing core portfolio logs...`;
        break;
      case 'monitor':
        openWindow('monitor');
        output = `STATUS: Connecting core telemetry dashboard diagnostic...
Action: Invoked window [monitor]. Rendering hardware widgets...`;
        break;
      case 'contact':
        openWindow('contact');
        output = `STATUS: Establishing secure communication channel...
Action: Invoked window [contact]. Launching email message dispatch form...`;
        break;
      case 'clear':
        clearTerminal();
        setInputVal('');
        return;
      default:
        output = `syserr: command "${command}" not found. Type "help" to list available actions.`;
    }

    executeCommand(command, output);
    setInputVal('');
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full h-full p-4 font-mono text-xs md:text-sm text-green-400 bg-black/40 overflow-y-auto flex flex-col cursor-text select-text"
    >
      <div className="flex-grow flex flex-col gap-3">
        {history.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5 leading-relaxed">
            {/* Command Line Prompt */}
            <div className="flex items-center gap-2 text-color-accent-cyan">
              <span>razal@core:~#</span>
              <span className="text-white font-medium">{item.command}</span>
              <span className="text-[10px] text-text-dimmed ml-auto">{item.timestamp}</span>
            </div>
            {/* Command Output Response */}
            <div className="whitespace-pre-wrap pl-4 text-text-secondary border-l border-white/5 py-1">
              {item.output}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt Section */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
        <span className="text-color-accent-cyan shrink-0">razal@core:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-grow bg-transparent border-none outline-none text-white font-medium caret-green-400 focus:ring-0 p-0"
          placeholder='Type a command (try "help")...'
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
