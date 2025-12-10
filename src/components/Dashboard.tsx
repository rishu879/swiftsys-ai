import { Cpu, Activity, Clock, Zap, Database, Network } from "lucide-react";
import MetricsCard from "./MetricsCard";
import SystemCallChart from "./SystemCallChart";
import AIRecommendations from "./AIRecommendations";
import EcoMetrics from "./EcoMetrics";
import LiveTerminal from "./LiveTerminal";

const Dashboard = () => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Real-Time <span className="text-primary text-glow">Monitoring</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Track system performance, apply AI optimizations, and monitor eco-friendly impact in real-time.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <MetricsCard
            title="Active Processes"
            value="1,247"
            change="+12"
            changeType="neutral"
            icon={Cpu}
          />
          <MetricsCard
            title="Avg Latency"
            value="8.3ms"
            change="-34%"
            changeType="positive"
            icon={Clock}
            variant="success"
          />
          <MetricsCard
            title="Syscalls/sec"
            value="45.2K"
            change="+8%"
            changeType="positive"
            icon={Activity}
          />
          <MetricsCard
            title="CPU Usage"
            value="42%"
            change="-18%"
            changeType="positive"
            icon={Zap}
            variant="success"
          />
          <MetricsCard
            title="Memory"
            value="6.8GB"
            change="72%"
            changeType="neutral"
            icon={Database}
          />
          <MetricsCard
            title="I/O Ops"
            value="12.4K"
            change="+5%"
            changeType="neutral"
            icon={Network}
          />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column - Chart and Terminal */}
          <div className="lg:col-span-2 space-y-6">
            <SystemCallChart />
            <LiveTerminal />
          </div>

          {/* Right column - AI and Eco */}
          <div className="space-y-6">
            <AIRecommendations />
            <EcoMetrics />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
