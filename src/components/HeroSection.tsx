import { Cpu, Zap, Leaf, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 scanline pointer-events-none" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-green/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "-3s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">AI-Powered Optimization</span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">System Call</span>
            <br />
            <span className="text-glow text-primary">Optimization</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            AI-enhanced low-latency optimization for modern operating systems. 
            <span className="text-neon-green"> Eco-friendly</span> • 
            <span className="text-primary"> High-performance</span> • 
            <span className="text-neon-orange"> Universal access</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="box-glow font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Start Optimization
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
              <Activity className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "45%", label: "Latency Reduction", icon: Zap },
              { value: "99.9%", label: "Uptime", icon: Activity },
              { value: "60%", label: "Energy Saved", icon: Leaf },
              { value: "10ms", label: "Avg Response", icon: Cpu },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold font-mono text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
