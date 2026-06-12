"use client";

import { useEffect } from 'react';
import { useOSStore } from '@/store/osStore';
import { Cpu, HardDrive, RefreshCw } from 'lucide-react';

export default function SystemMonitor() {
  const cpuLoad = useOSStore((state) => state.cpuLoad);
  const memoryUsage = useOSStore((state) => state.memoryUsage);
  const tickMetrics = useOSStore((state) => state.tickMetrics);

  // Tick the performance variables on interval to simulate hardware changes
  useEffect(() => {
    const interval = setInterval(() => {
      tickMetrics();
    }, 2000);

    return () => clearInterval(interval);
  }, [tickMetrics]);

  return (
    <div className="w-full h-full p-6 bg-black/30 font-sans flex flex-col gap-6 select-none">
      <div className="flex items-center justify-between border-b border-color-border-muted pb-3">
        <h4 className="h4 text-sm font-mono tracking-wide text-white flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-color-accent-cyan" />
          DIAGNOSTIC CORE // LOAD_MONITOR
        </h4>
        <span className="text-[10px] font-mono text-text-dimmed">STATUS: ACTIVE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CPU Telemetry Card */}
        <div className="glass-panel p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-mono">CPU LOAD</span>
            <Cpu className="w-4 h-4 text-color-accent-indigo" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-mono font-bold text-white">{cpuLoad}</span>
            <span className="text-xs font-mono text-color-accent-indigo">%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              style={{ width: `${cpuLoad}%` }}
              className="h-full bg-gradient-to-r from-color-accent-indigo to-color-accent-cyan transition-all duration-1000 ease-out"
            />
          </div>
        </div>

        {/* Memory Allocation Card */}
        <div className="glass-panel p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-mono">RAM BUFFER</span>
            <HardDrive className="w-4 h-4 text-color-accent-cyan" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-mono font-bold text-white">{memoryUsage}</span>
            <span className="text-xs font-mono text-color-accent-cyan">%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              style={{ width: `${memoryUsage}%` }}
              className="h-full bg-gradient-to-r from-color-accent-cyan to-color-accent-violet transition-all duration-1000 ease-out"
            />
          </div>
        </div>
      </div>

      {/* System Telemetry Logs Grid */}
      <div className="flex-grow glass-panel p-4 font-mono text-xs text-text-muted flex flex-col gap-2 overflow-auto">
        <div className="text-[10px] text-color-accent-cyan border-b border-white/5 pb-1 mb-1">HARDWARE ALLOCATIONS // REGISTER</div>
        <div className="flex justify-between">
          <span>Thread Registry:</span>
          <span className="text-white">Active (8 Cores)</span>
        </div>
        <div className="flex justify-between">
          <span>Clock Frequency:</span>
          <span className="text-white">3.8 GHz</span>
        </div>
        <div className="flex justify-between">
          <span>Active Tasks:</span>
          <span className="text-white">4 Running Windows</span>
        </div>
        <div className="flex justify-between">
          <span>WebGL Context:</span>
          <span className="text-color-accent-cyan">Render Pipeline Active</span>
        </div>
        <div className="flex justify-between">
          <span>Synaptic Bind:</span>
          <span className="text-white">Connected</span>
        </div>
      </div>
    </div>
  );
}
