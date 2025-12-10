import { useState, useEffect, useRef } from "react";
import { Terminal, Circle } from "lucide-react";

const syscalls = [
  "read(fd=3, buf=0x7fff..., count=4096) = 1024",
  "write(fd=1, buf=0x55a..., count=64) = 64",
  "mmap(addr=NULL, len=8192, prot=RW) = 0x7f...",
  "futex(uaddr=0x7f..., op=WAIT) = 0",
  "epoll_wait(epfd=4, events=[], maxevents=128) = 1",
  "recvfrom(sockfd=5, buf=0x55a..., len=1500) = 512",
  "sendto(sockfd=5, buf=0x55a..., len=128) = 128",
  "clock_gettime(CLOCK_MONOTONIC) = {tv_sec=123}",
  "nanosleep({tv_sec=0, tv_nsec=100000}) = 0",
  "ioctl(fd=6, request=TCGETS) = 0",
];

const optimizations = [
  "⚡ Batched 12 sequential read() calls → 67% latency reduction",
  "🔄 Enabled async I/O for fd=5 → non-blocking",
  "♻️ Memory pool allocated → reduced mmap() overhead",
  "🌱 Power-saving mode activated → C3 state enabled",
  "📊 Context switches reduced from 1247/s → 312/s",
];

const LiveTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const isOptimization = Math.random() > 0.7;
      const message = isOptimization
        ? optimizations[Math.floor(Math.random() * optimizations.length)]
        : syscalls[Math.floor(Math.random() * syscalls.length)];
      
      setLogs((prev) => [...prev.slice(-50), `[${new Date().toISOString().split('T')[1].slice(0, 12)}] ${message}`]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-secondary/30">
        <div className="flex gap-1.5">
          <Circle className="w-3 h-3 fill-destructive text-destructive" />
          <Circle className="w-3 h-3 fill-neon-orange text-neon-orange" />
          <Circle className="w-3 h-3 fill-neon-green text-neon-green" />
        </div>
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono text-muted-foreground">syscall-monitor</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs text-neon-green font-mono">LIVE</span>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={containerRef}
        className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed scrollbar-thin"
      >
        {logs.map((log, i) => (
          <div
            key={i}
            className={`${
              log.includes("⚡") || log.includes("🔄") || log.includes("♻️") || log.includes("🌱") || log.includes("📊")
                ? "text-neon-green"
                : "text-muted-foreground"
            }`}
          >
            {log}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
      </div>
    </div>
  );
};

export default LiveTerminal;
