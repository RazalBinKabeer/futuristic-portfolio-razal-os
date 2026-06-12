import { useEffect, useRef } from "react";
import { useOSStore } from "@/store/osStore";

const SEQUENCE = ["bio", "projects", "skills", "career", "certifications", "contact"];

export function useAutoPilot() {
  const isAutoPilotMode = useOSStore((state) => state.isAutoPilotMode);
  const setAutoPilotMode = useOSStore((state) => state.setAutoPilotMode);
  const openWindow = useOSStore((state) => state.openWindow);
  const closeWindow = useOSStore((state) => state.closeWindow);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isAutoPilotMode) {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      const runSequence = async () => {
        try {
          // 1. Close all currently open windows first
          const state = useOSStore.getState();
          Object.keys(state.windows).forEach((id) => {
            if (state.windows[id].isOpen) {
              closeWindow(id);
            }
          });

          // Wait a bit for them to close
          await new Promise((r) => setTimeout(r, 600));
          if (signal.aborted) return;

          for (let i = 0; i < SEQUENCE.length; i++) {
            if (signal.aborted) break;

            const currentId = SEQUENCE[i];

            // Open window
            openWindow(currentId, window.innerWidth, window.innerHeight);

            // Wait for window to render and animate in
            await new Promise((r) => setTimeout(r, 800));
            if (signal.aborted) break;

            // Find the scrollable container
            const windowEl = document.getElementById(`window-scroll-container-${currentId}`);
            let container = windowEl;
            
            if (windowEl) {
              // Sometimes the actual scrollable content is a nested div
              if (windowEl.scrollHeight <= windowEl.clientHeight) {
                const scrollableChildren = Array.from(
                  windowEl.querySelectorAll(".overflow-auto, .overflow-y-auto")
                ) as HTMLElement[];
                
                for (const child of scrollableChildren) {
                  if (child.scrollHeight > child.clientHeight) {
                    container = child;
                    break;
                  }
                }
              }
            }

            if (container) {
              const maxScroll = container.scrollHeight - container.clientHeight;
              if (maxScroll > 0) {
                // Slower scroll (e.g., 35px per second) for readability
                let duration = (maxScroll / 35) * 1000;
                duration = Math.max(5000, Math.min(duration, 20000));

                const startTime = performance.now();
                const startScroll = container.scrollTop;

                await new Promise<void>((resolve) => {
                  const animateScroll = (time: number) => {
                    if (signal.aborted) {
                      resolve();
                      return;
                    }

                    const elapsed = time - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Linear scroll is better for reading steadily than ease-in-out
                    container.scrollTop = startScroll + maxScroll * progress;

                    if (progress < 1) {
                      requestAnimationFrame(animateScroll);
                    } else {
                      // wait a good amount of time at the bottom before moving to next
                      setTimeout(() => resolve(), 3000);
                    }
                  };
                  requestAnimationFrame(animateScroll);
                });
              } else {
                // Not scrollable, just give the user more time to read
                await new Promise((r) => setTimeout(r, 5000));
              }
            } else {
              // Container not found, wait a bit as a fallback
              await new Promise((r) => setTimeout(r, 5000));
            }

            if (signal.aborted) break;

            // Close the window unless it's the last one
            if (i < SEQUENCE.length - 1) {
              closeWindow(currentId);
              // Brief pause before opening the next window
              await new Promise((r) => setTimeout(r, 500));
            }
          }
        } finally {
          if (useOSStore.getState().isAutoPilotMode) {
            setAutoPilotMode(false);
          }
        }
      };

      runSequence();
    } else {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isAutoPilotMode, openWindow, closeWindow, setAutoPilotMode]);

  useEffect(() => {
    if (!isAutoPilotMode) return;

    const handleUserInteraction = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("#autopilot-toggle")) {
        return;
      }
      setAutoPilotMode(false);
    };

    let attached = false;
    const timer = setTimeout(() => {
      attached = true;
      window.addEventListener("wheel", handleUserInteraction, { passive: true, capture: true });
      window.addEventListener("touchstart", handleUserInteraction, { passive: true, capture: true });
      window.addEventListener("mousedown", handleUserInteraction, { passive: true, capture: true });
      window.addEventListener("keydown", handleUserInteraction, { passive: true, capture: true });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (attached) {
        window.removeEventListener("wheel", handleUserInteraction, { capture: true });
        window.removeEventListener("touchstart", handleUserInteraction, { capture: true });
        window.removeEventListener("mousedown", handleUserInteraction, { capture: true });
        window.removeEventListener("keydown", handleUserInteraction, { capture: true });
      }
    };
  }, [isAutoPilotMode, setAutoPilotMode]);
}
