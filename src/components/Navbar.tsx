import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Globe, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/api";

export function Navbar() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("vc_theme");
    return saved === "dark";
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("vc_theme", dark ? "dark" : "light");
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dark]);

  const links = [
    { to: "/campaigns", label: "Explore" },
    ...(user?.role === "DONOR" ? [{ to: "/donor-dashboard", label: "Dashboard" }] : []),
    ...(user?.role === "NGO" ? [{ to: "/ngo-dashboard", label: "NGO Command" }] : []),
    ...(user?.role === "ADMIN" ? [{ to: "/admin", label: "Oversight" }] : []),
  ];

  const handleLogout = () => {
    auth.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "nav-glass py-3" : "bg-transparent border-b border-transparent py-4"
    }`}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group relative">
              <div className="relative flex items-center justify-center w-10 h-10 group">
                {/* Ambient glowing background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-xl blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
                
                {/* Glassmorphic Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full h-full bg-background/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl rounded-xl flex items-center justify-center overflow-hidden"
                >
                  {/* Dynamic inner gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Core Symbol */}
                  <svg viewBox="0 0 24 24" className="w-6 h-6 z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="url(#gradient-outer)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="origin-center"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    />
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      d="M8 12L11 15L16 9"
                      stroke="url(#gradient-inner)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-[0_0_6px_rgba(45,212,191,0.8)]"
                    />
                    <defs>
                      <linearGradient id="gradient-outer" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#6366f1" />
                        <stop offset="1" stopColor="#2dd4bf" />
                      </linearGradient>
                      <linearGradient id="gradient-inner" x1="8" y1="9" x2="16" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a855f7" />
                        <stop offset="1" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display font-black text-2xl tracking-tighter text-foreground bg-clip-text"
              >
                VeriCause
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors relative group ${
                    location.pathname === l.to
                      ? "text-foreground bg-accent/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
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

            {user ? (
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex text-[12px] font-bold px-4 h-9 rounded-full text-foreground gap-2">
                  <Link to={user.role === "NGO" ? "/ngo-dashboard" : user.role === "ADMIN" ? "/admin" : "/donor-dashboard"}>
                    <User className="w-4 h-4 text-primary" /> {user.name.split(' ')[0]}
                  </Link>
                </Button>
                <Button onClick={handleLogout} size="sm" variant="outline" className="hidden sm:inline-flex border-border/40 text-muted-foreground hover:text-red-500 hover:border-red-100 hover:bg-red-50 text-[11px] font-bold px-4 h-9 rounded-full transition-all">
                  <LogOut className="w-3.5 h-3.5 mr-2" /> LOGOUT
                </Button>
              </div>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex text-sm font-medium px-4 h-9 text-muted-foreground hover:text-foreground">
                  <Link to="/auth">Sign In</Link>
                </Button>
                
                <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 h-9 shadow-sm transition-all">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}

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
