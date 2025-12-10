import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  variant?: "default" | "success" | "warning";
  className?: string;
}

const MetricsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  variant = "default",
  className,
}: MetricsCardProps) => {
  const variantStyles = {
    default: "border-border/50 hover:border-primary/50",
    success: "border-neon-green/30 hover:border-neon-green/60 box-glow-green",
    warning: "border-neon-orange/30 hover:border-neon-orange/60 box-glow-orange",
  };

  const iconColors = {
    default: "text-primary",
    success: "text-neon-green",
    warning: "text-neon-orange",
  };

  return (
    <div
      className={cn(
        "relative p-6 rounded-xl border bg-card/80 backdrop-blur-sm transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-secondary/50">
          <Icon className={cn("w-5 h-5", iconColors[variant])} />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-mono px-2 py-1 rounded",
              changeType === "positive" && "text-neon-green bg-neon-green/10",
              changeType === "negative" && "text-destructive bg-destructive/10",
              changeType === "neutral" && "text-muted-foreground bg-muted"
            )}
          >
            {change}
          </span>
        )}
      </div>
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-3xl font-bold font-mono text-foreground">{value}</p>
    </div>
  );
};

export default MetricsCard;
