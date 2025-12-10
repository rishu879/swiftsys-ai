import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SysOpt - AI-Enhanced System Call Optimization</title>
        <meta
          name="description"
          content="AI-powered system call optimization for low-latency operating systems. Eco-friendly, high-performance, and universally accessible computing."
        />
      </Helmet>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <Dashboard />
        <Footer />
      </main>
    </>
  );
};

export default Index;
