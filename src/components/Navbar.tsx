import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dark]);

  const links = [
    { to: "/campaigns", label: "Explore" },
    { to: "/donor-dashboard", label: "Dashboard" },
    { to: "/admin", label: "Oversight" },
    { to: "/ngo-dashboard", label: "NGOs" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "py-4" : "py-8"
    }`}>
      <div className="container mx-auto px-6">
        <div className={`mx-auto max-w-5xl flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-500 ${
          scrolled ? "elite-glass shadow-lg" : "bg-transparent border-transparent"
        }`}>
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group relative">
              <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-primary overflow-hidden shadow-indigo-200/50 shadow-lg group-hover:rotate-[15deg] transition-transform duration-500">
                <Globe className="w-5 h-5 text-white/90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display font-bold text-xl tracking-tighter text-foreground"
              >
                Veri<span className="text-primary">Cause</span>
                <div className="absolute -bottom-1 left-10 right-0 h-px bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all duration-300 relative group overflow-hidden ${
                    location.pathname === l.to
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  {location.pathname === l.to && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/5 rounded-full z-0"
                    />
                  )}
                  <div className="absolute inset-0 bg-secondary/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(!dark)}
              className="rounded-full w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </Button>
            
            <div className="h-4 w-px bg-border/60 mx-2 hidden sm:block" />

            <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex text-[13px] font-semibold px-5 h-9 rounded-full text-muted-foreground hover:text-foreground">
              <Link to="/auth">Sign In</Link>
            </Button>
            
            <Button size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-white text-[13px] font-bold px-6 h-9 rounded-full shadow-md shadow-indigo-100 hover:shadow-lg transition-all active:scale-95 group">
              Join Now <motion.span initial={{ x: 0 }} group-hover={{ x: 3 }} transition={{ duration: 0.3 }}><X className="w-3 h-3 ml-1.5 rotate-45" /></motion.span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full h-9 w-9 ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5 text-muted-foreground" /> : <Menu className="w-5 h-5 text-muted-foreground" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden absolute top-full left-0 right-0 px-6 mt-2"
          >
            <div className="elite-glass rounded-3xl p-4 flex flex-col gap-1 border-white/60">
              {links.map((l, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={l.to}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition-all ${
                      location.pathname === l.to
                        ? "bg-primary/5 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {l.label}
                    <X className="w-4 h-4 rotate-45 opacity-20" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-3">
                <Button variant="outline" className="rounded-2xl h-11 text-xs font-bold">Sign In</Button>
                <Button className="rounded-2xl h-11 text-xs font-bold bg-primary text-white">Join Now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
