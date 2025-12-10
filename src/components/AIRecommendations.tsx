import { useState } from "react";
import { Brain, CheckCircle, AlertTriangle, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  id: number;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  energySaving: string;
  status: "pending" | "applied";
}

const initialRecommendations: Recommendation[] = [
  {
    id: 1,
    title: "Optimize read() syscall batching",
    description: "Detected 847 sequential read calls. Batching could reduce latency by 34%.",
    impact: "high",
    energySaving: "12%",
    status: "pending",
  },
  {
    id: 2,
    title: "Enable async I/O for network operations",
    description: "Network syscalls blocking main thread. Async pattern recommended.",
    impact: "medium",
    energySaving: "8%",
    status: "applied",
  },
  {
    id: 3,
    title: "Memory-mapped file optimization",
    description: "Large file operations detected. mmap() would reduce copies and power usage.",
    impact: "high",
    energySaving: "15%",
    status: "pending",
  },
  {
    id: 4,
    title: "Reduce context switch frequency",
    description: "High context switch rate detected. Thread pooling suggested.",
    impact: "medium",
    energySaving: "6%",
    status: "pending",
  },
];

const AIRecommendations = () => {
  const [items, setItems] = useState<Recommendation[]>(initialRecommendations);
  const [analyzing, setAnalyzing] = useState(false);
  const [applying, setApplying] = useState<number | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleApply = async (id: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to apply optimizations.",
        variant: "destructive",
      });
      return;
    }

    setApplying(id);
    
    try {
      // Log the optimization to the database
      const { error } = await supabase.from("system_logs").insert({
        user_id: user.id,
        log_type: "optimization_applied",
        message: `Applied optimization: ${items.find(i => i.id === id)?.title}`,
        metadata: { recommendation_id: id }
      });

      if (error) throw error;

      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "applied" as const } : item
        )
      );

      toast({
        title: "Optimization Applied",
        description: "The system optimization has been successfully applied.",
      });
    } catch (error) {
      console.error("Error applying optimization:", error);
      toast({
        title: "Error",
        description: "Failed to apply optimization. Please try again.",
        variant: "destructive",
      });
    } finally {
      setApplying(null);
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add a new recommendation
    const newRec: Recommendation = {
      id: Date.now(),
      title: "Optimize epoll() event handling",
      description: "Detected suboptimal event batching. Improved polling could reduce CPU cycles by 22%.",
      impact: "high",
      energySaving: "10%",
      status: "pending",
    };
    
    setItems(prev => [newRec, ...prev]);
    setAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Found 1 new optimization opportunity.",
    });
  };

  return (
    <div className="p-6 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neon-purple/20">
            <Brain className="w-5 h-5 text-neon-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">Smart optimization suggestions</p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={runAnalysis}
          disabled={analyzing}
          className="border-neon-purple/50 hover:bg-neon-purple/10"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Re-analyze
            </>
          )}
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-4 rounded-lg border transition-all duration-300",
              item.status === "applied"
                ? "border-neon-green/30 bg-neon-green/5"
                : "border-border/50 bg-secondary/30 hover:border-primary/50"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {item.status === "applied" ? (
                    <CheckCircle className="w-4 h-4 text-neon-green" />
                  ) : item.impact === "high" ? (
                    <AlertTriangle className="w-4 h-4 text-neon-orange" />
                  ) : (
                    <Brain className="w-4 h-4 text-primary" />
                  )}
                  <span className="font-medium text-foreground text-sm">{item.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                <div className="flex gap-3 text-xs font-mono">
                  <span className={cn(
                    "px-2 py-0.5 rounded",
                    item.impact === "high" 
                      ? "bg-neon-orange/10 text-neon-orange" 
                      : "bg-primary/10 text-primary"
                  )}>
                    {item.impact} impact
                  </span>
                  <span className="px-2 py-0.5 rounded bg-neon-green/10 text-neon-green">
                    -{item.energySaving} energy
                  </span>
                </div>
              </div>
              {item.status !== "applied" && (
                <Button
                  size="sm"
                  onClick={() => handleApply(item.id)}
                  disabled={applying === item.id}
                  className="ml-4 h-8"
                >
                  {applying === item.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <>
                      Apply
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
