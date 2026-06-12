"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useOSStore } from "@/store/osStore";
import { X, Minus, Square } from "lucide-react";
import { useDevice } from "@/hooks/useDevice";

interface WindowFrameProps {
  id: string;
  children: ReactNode;
}

export default function WindowFrame({ id, children }: WindowFrameProps) {
  const windowState = useOSStore((state) => state.windows[id]);
  const activeWindowId = useOSStore((state) => state.activeWindowId);

  const closeWindow = useOSStore((state) => state.closeWindow);
  const minimizeWindow = useOSStore((state) => state.minimizeWindow);
  const maximizeWindow = useOSStore((state) => state.maximizeWindow);
  const focusWindow = useOSStore((state) => state.focusWindow);

  const dragControls = useDragControls();
  const device = useDevice();

  if (!windowState || !windowState.isOpen || windowState.isMinimized)
    return null;

  const isActive = activeWindowId === id;
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";

  let left = windowState.isMaximized ? "0px" : `${windowState.position.x}px`;
  let top = windowState.isMaximized ? "0px" : `${windowState.position.y}px`;
  let width = windowState.isMaximized ? "100vw" : `${windowState.size.width}px`;
  let height = windowState.isMaximized ? "100vh" : `${windowState.size.height}px`;
  let borderRadius = "0.5rem";

  if (isMobile) {
    left = "0px";
    top = "0px";
    width = "100%";
    height = "100dvh";
    borderRadius = "0px";
  } else if (isTablet) {
    left = "5vw";
    top = "5vh";
    width = "90vw";
    height = "85vh";
  }

  return (
    <AnimatePresence>
      <motion.div
        drag={!isMobile && !isTablet ? true : false}
        dragMomentum={false}
        dragControls={!isMobile && !isTablet ? dragControls : undefined}
        onPointerDown={() => focusWindow(id)}
        initial={{ scale: 0.92, opacity: 0, y: isMobile ? 50 : 0 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: isMobile ? 50 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          position: "fixed",
          left,
          top,
          width,
          height,
          zIndex: windowState.zIndex,
          backdropFilter: "blur(16px) saturate(180%)",
          borderRadius,
        }}
        className={`flex flex-col glass-panel overflow-hidden border transition-colors duration-200 pointer-events-auto ${
          isActive
            ? "border-color-accent-indigo shadow-[0_12px_40px_rgba(99,102,241,0.15)]"
            : "border-color-border-muted shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
        }`}
      >
        {/* Desktop / Tablet Drag Bar */}
        {!isMobile && (
          <div
            onPointerDown={(e) => {
              if (!isTablet) dragControls.start(e);
            }}
            className={`window-drag-bar h-10 px-4 flex items-center justify-between border-b select-none ${
              !isTablet ? "cursor-grab active:cursor-grabbing" : ""
            } ${
              isActive
                ? "bg-white/[0.03] border-color-border-active"
                : "bg-black/[0.08] border-color-border-muted"
            }`}
          >
            {/* OS Window Traffic Lights Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center group"
                title="Close"
              >
                <X className="w-2 h-2 text-red-950 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 flex items-center justify-center group"
                title="Minimize"
              >
                <Minus className="w-2 h-2 text-yellow-950 opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isTablet) maximizeWindow(id);
                }}
                className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-500 flex items-center justify-center group"
                title="Maximize"
              >
                <Square className="w-1.5 h-1.5 text-green-950 opacity-0 group-hover:opacity-100" />
              </button>
            </div>

            {/* Window Title */}
            <div className="text-xs font-mono font-medium tracking-wide text-text-muted truncate max-w-[70%]">
              {windowState.title}
            </div>

            {/* Dummy indicator */}
            <div className="w-12 h-1" />
          </div>
        )}

        {/* Mobile Header */}
        {isMobile && (
          <div className="h-12 flex items-center justify-center border-b border-white/5 bg-black/40 px-4 shrink-0 relative">
            <div className="text-sm font-semibold text-white tracking-wide truncate max-w-[70%]">
              {windowState.title.split('//')[0].trim()}
            </div>
            <button 
              onClick={() => closeWindow(id)} 
              className="absolute right-4 text-xs font-semibold text-color-accent-cyan active:opacity-50 transition-opacity"
            >
              Done
            </button>
          </div>
        )}

        {/* Window Body Container */}
        <div
          className="flex-grow overflow-auto bg-black/[0.1] text-text-secondary relative"
          data-lenis-prevent
        >
          {children}
        </div>


      </motion.div>
    </AnimatePresence>
  );
}
