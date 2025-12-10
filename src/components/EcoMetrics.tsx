import { Leaf, BatteryCharging, ThermometerSun, Recycle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ecoData = [
  {
    icon: Leaf,
    label: "Carbon Footprint Reduction",
    value: 42,
    unit: "%",
    description: "CO₂ saved this month",
  },
  {
    icon: BatteryCharging,
    label: "Power Efficiency",
    value: 87,
    unit: "%",
    description: "Optimal resource usage",
  },
  {
    icon: ThermometerSun,
    label: "Thermal Optimization",
    value: 23,
    unit: "°C",
    description: "Below thermal threshold",
  },
  {
    icon: Recycle,
    label: "Resource Recycling",
    value: 94,
    unit: "%",
    description: "Memory reuse rate",
  },
];

const EcoMetrics = () => {
  return (
    <div className="p-6 rounded-xl border border-neon-green/30 bg-gradient-to-br from-neon-green/5 to-transparent backdrop-blur-sm box-glow-green">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-green/20">
          <Leaf className="w-5 h-5 text-neon-green" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Eco-Friendly Metrics</h3>
          <p className="text-sm text-muted-foreground">Sustainable computing impact</p>
        </div>
      </div>

      <div className="grid gap-4">
        {ecoData.map((item, i) => (
          <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
              <span className="text-lg font-bold font-mono text-neon-green">
                {item.value}{item.unit}
              </span>
            </div>
            <Progress 
              value={item.unit === "%" ? item.value : (item.value / 100) * 100} 
              className="h-2 bg-secondary"
            />
            <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-neon-green/10 border border-neon-green/30">
        <div className="flex items-center gap-2 mb-2">
          <Recycle className="w-4 h-4 text-neon-green" />
          <span className="text-sm font-semibold text-neon-green">Monthly Impact</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Your optimizations have saved approximately <span className="text-neon-green font-mono">127 kWh</span> of energy, 
          equivalent to planting <span className="text-neon-green font-mono">3.2 trees</span> this month.
        </p>
      </div>
    </div>
  );
};

export default EcoMetrics;
