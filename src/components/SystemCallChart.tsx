import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const generateData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    optimized: Math.floor(Math.random() * 30) + 10,
    standard: Math.floor(Math.random() * 50) + 40,
    calls: Math.floor(Math.random() * 1000) + 500,
  }));
};

const SystemCallChart = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const lastHour = parseInt(prev[prev.length - 1].time);
        newData.push({
          time: `${(lastHour + 1) % 24}:00`,
          optimized: Math.floor(Math.random() * 30) + 10,
          standard: Math.floor(Math.random() * 50) + 40,
          calls: Math.floor(Math.random() * 1000) + 500,
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Call Latency</h3>
          <p className="text-sm text-muted-foreground">Optimized vs Standard (ms)</p>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Optimized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-orange" />
            <span className="text-muted-foreground">Standard</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(175, 80%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="standardGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(35, 100%, 55%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(35, 100%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(180, 30%, 60%)", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(180, 30%, 60%)", fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 25%, 8%)",
                border: "1px solid hsl(180, 50%, 20%)",
                borderRadius: "8px",
                fontFamily: "JetBrains Mono",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(180, 100%, 95%)" }}
            />
            <Area
              type="monotone"
              dataKey="standard"
              stroke="hsl(35, 100%, 55%)"
              strokeWidth={2}
              fill="url(#standardGradient)"
            />
            <Area
              type="monotone"
              dataKey="optimized"
              stroke="hsl(175, 80%, 50%)"
              strokeWidth={2}
              fill="url(#optimizedGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SystemCallChart;
