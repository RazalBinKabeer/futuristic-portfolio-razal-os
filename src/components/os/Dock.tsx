"use client";

import { useOSStore } from '@/store/osStore';
import { motion } from 'framer-motion';
import { Terminal, Activity, FolderGit, User, RefreshCw } from 'lucide-react';

export default function Dock() {
  const windows = useOSStore((state) => state.windows);
  const openWindow = useOSStore((state) => state.openWindow);
  const activeWindowId = useOSStore((state) => state.activeWindowId);

  const dockItems = [
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'text-green-400' },
    { id: 'monitor', label: 'System Monitor', icon: Activity, color: 'text-color-accent-cyan' },
    { id: 'projects', label: 'Projects', icon: FolderGit, color: 'text-color-accent-indigo' },
    { id: 'bio', label: 'Identity Log', icon: User, color: 'text-color-accent-orange' },
  ];

  const handleDockItemClick = (id: string) => {
    openWindow(id);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="pointer-events-auto flex items-center gap-4 px-5 py-3 glass-panel rounded-2xl bg-black/45 border border-white/5 shadow-2xl relative"
      >
        {dockItems.map((item) => {
          const wState = windows[item.id];
          const isOpen = wState?.isOpen;
          const isActive = activeWindowId === item.id;

          const IconComponent = item.icon;

          return (
            <div key={item.id} className="relative group">
              {/* Tooltip Label */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-bg-dark border border-color-border-muted text-[10px] font-mono text-white rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md">
                {item.label}
              </div>

              {/* Interactive Dock Shortcut Icon */}
              <motion.button
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDockItemClick(item.id)}
                className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.02] border transition-colors duration-200 cursor-pointer ${
                  isActive 
                    ? "border-color-accent-indigo bg-white/[0.04]" 
                    : isOpen
                      ? "border-white/20"
                      : "border-white/5 hover:border-white/20"
                }`}
              >
                <IconComponent className={`w-5 h-5 ${item.color}`} />
              </motion.button>

              {/* Status indicator dots */}
              {isOpen && (
                <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                  isActive ? "bg-color-accent-indigo shadow-[0_0_8px_rgba(99,102,241,1)]" : "bg-white/40"
                }`} />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
