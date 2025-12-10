import { Cpu, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-foreground">Sys</span>
              <span className="text-primary">Opt</span>
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Analytics
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              API
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" className="border-primary/50">
              Sign In
            </Button>
            <Button size="sm" className="box-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Analytics
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                API
              </a>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1 border-primary/50">
                  Sign In
                </Button>
                <Button size="sm" className="flex-1">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
