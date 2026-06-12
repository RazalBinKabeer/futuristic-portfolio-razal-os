import { create } from "zustand";

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface CommandHistoryItem {
  command: string;
  output: string;
  timestamp: string;
}

interface OSStore {
  booted: boolean;
  cpuLoad: number;
  memoryUsage: number;
  activeWindowId: string | null;
  windows: Record<string, WindowState>;
  terminalHistory: CommandHistoryItem[];
  bootSequenceIndex: number;
  maxZIndex: number;

  // System Actions
  bootOS: (isMobile?: boolean) => void;
  incrementBootSequence: () => void;
  openWindow: (id: string, viewportWidth?: number, viewportHeight?: number) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  executeCommand: (cmd: string, output: string) => void;
  tickMetrics: () => void;
  clearTerminal: () => void;
}

const defaultWindows: Record<string, WindowState> = {
  terminal: {
    id: "terminal",
    title: "Razal.OS Terminal // command_prompt.sh",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 100 },
    size: { width: 640, height: 400 },
  },
  monitor: {
    id: "monitor",
    title: "System Telemetry Core // metrics_dashboard",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 740, y: 80 },
    size: { width: 420, height: 320 },
  },
  projects: {
    id: "projects",
    title: "Memory Bank // project_portfolio_vault",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 150, y: 160 },
    size: { width: 800, height: 500 },
  },
  skills: {
    id: "skills",
    title: "Skills Matrix // capability_core.log",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    position: { x: 200, y: 120 },
    size: { width: 720, height: 480 },
  },
  contact: {
    id: "contact",
    title: "Contact Form // secure_channel.lnk",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 420, y: 150 },
    size: { width: 480, height: 480 },
  },
  bio: {
    id: "bio",
    title: "Identity Log // executive_biography",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 300, y: 220 },
    size: { width: 500, height: 380 },
  },
  career: {
    id: "career",
    title: "Career History // professional_chronology.log",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 250, y: 180 },
    size: { width: 760, height: 500 },
  },
  certifications: {
    id: "certifications",
    title: "Credentials Registry // certification_vault.sys",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 320, y: 140 },
    size: { width: 680, height: 420 },
  },
};

export const useOSStore = create<OSStore>((set, get) => ({
  booted: false,
  cpuLoad: 24,
  memoryUsage: 42,
  activeWindowId: "terminal",
  windows: defaultWindows,
  terminalHistory: [
    {
      command: "systemctl boot",
      output:
        'Razal.OS v1.0.0 booting up...\nWelcome to the interactive portfolio of Mohamed Razal Kabeer.\nAll systems operational.\nType "help" to list available actions.',
      timestamp: "15:51:24",
    },
  ],
  bootSequenceIndex: 0,
  maxZIndex: 10,
  bootOS: (isMobile?: boolean) =>
    set((state) => {
      if (isMobile) {
        return {
          booted: true,
          windows: {
            ...state.windows,
            terminal: { ...state.windows.terminal, isOpen: false },
          },
          activeWindowId:
            state.activeWindowId === "terminal" ? null : state.activeWindowId,
        };
      }
      return { booted: true };
    }),

  incrementBootSequence: () =>
    set((state) => ({
      bootSequenceIndex: state.bootSequenceIndex + 1,
    })),

  openWindow: (id, viewportWidth, viewportHeight) =>
    set((state) => {
      const nextZ = state.maxZIndex + 1;
      const window = state.windows[id];
      if (!window) return {};

      let updates: Partial<WindowState> = {
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      };

      if (viewportWidth !== undefined && viewportHeight !== undefined) {
        if (viewportWidth < 768) {
          updates = {
            ...updates,
            isMaximized: true,
            position: { x: 0, y: 0 },
            size: { width: viewportWidth, height: viewportHeight },
          };
        } else {
          updates = {
            ...updates,
            position: {
              x: Math.max(0, (viewportWidth - window.size.width) / 2),
              y: Math.max(0, (viewportHeight - window.size.height) / 2),
            },
          };
        }
      }

      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            ...updates,
          },
        },
        activeWindowId: id,
        maxZIndex: nextZ,
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return {};
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            isOpen: false,
          },
        },
        activeWindowId:
          state.activeWindowId === id ? null : state.activeWindowId,
      };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return {};
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            isMinimized: true,
          },
        },
        activeWindowId:
          state.activeWindowId === id ? null : state.activeWindowId,
      };
    }),

  maximizeWindow: (id) =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return {};
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            isMaximized: !window.isMaximized,
          },
        },
      };
    }),

  focusWindow: (id) =>
    set((state) => {
      const window = state.windows[id];
      if (!window || window.zIndex === state.maxZIndex) return {};
      const nextZ = state.maxZIndex + 1;
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            isMinimized: false,
            zIndex: nextZ,
          },
        },
        activeWindowId: id,
        maxZIndex: nextZ,
      };
    }),

  updateWindowPosition: (id, x, y) =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return {};
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            position: { x, y },
          },
        },
      };
    }),

  updateWindowSize: (id, width, height) =>
    set((state) => {
      const window = state.windows[id];
      if (!window) return {};
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            size: { width, height },
          },
        },
      };
    }),

  executeCommand: (cmd, output) =>
    set((state) => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return {
        terminalHistory: [
          ...state.terminalHistory,
          { command: cmd, output, timestamp: time },
        ],
      };
    }),

  tickMetrics: () =>
    set((state) => {
      // Generate organic simulated fluctuations in telemetry load
      const cpuDelta = Math.floor(Math.random() * 11) - 5; // -5 to +5
      const memDelta = Math.floor(Math.random() * 5) - 2; // -2 to +2

      return {
        cpuLoad: Math.max(10, Math.min(95, state.cpuLoad + cpuDelta)),
        memoryUsage: Math.max(20, Math.min(85, state.memoryUsage + memDelta)),
      };
    }),

  clearTerminal: () => set({ terminalHistory: [] }),
}));
