import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, ShieldCheck, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-primary mb-8 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              VeriCause 2.5 is now available
            </div>

            <h1 className="text-6xl lg:text-[5.5rem] font-display font-black tracking-tighter leading-[1.05] text-foreground mb-6 drop-shadow-sm">
              Transparent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                Impact Verification.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
              The institutional standard for verified philanthropy. We build the infrastructure to ensure every donation is tracked, transparent, and transformative.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-foreground text-background font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 dark:bg-primary dark:text-primary-foreground text-lg">
                <Link to="/campaigns" className="flex items-center">Get Started <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-2xl font-bold border-border/60 hover:bg-accent/50 hover:border-border hover:scale-105 backdrop-blur-sm transition-all duration-300 text-lg">
                <Link to="/ngo-dashboard">Institutional Access</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Web3 / Futuristic SaaS Illustration */}
            <div className="relative w-full aspect-square max-w-lg mx-auto mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-cyan-400/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
              
              <motion.div 
                whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ perspective: 1000 }}
                className="relative h-full w-full elite-card bg-white/40 dark:bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent rounded-[2.5rem] pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Verification Node</div>
                      <div className="text-xs text-muted-foreground font-medium">Syncing blocks...</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-cyan-500 bg-cyan-500/10 px-3 py-1.5 rounded-full uppercase tracking-wider border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Live
                  </span>
                </div>

                <div className="space-y-5 relative z-10 flex-grow flex flex-col justify-center">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="text-3xl font-display font-black tracking-tight text-foreground">$24.5M</div>
                      <div className="text-sm font-bold text-emerald-500 mb-1">+12.4%</div>
                    </div>
                    <div className="h-1.5 w-full bg-border/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" 
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-2">
                      <span>Allocated</span>
                      <span>Verified</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="bg-background/50 dark:bg-black/50 p-4 rounded-2xl border border-white/20 dark:border-white/5">
                        <div className="h-2 w-1/3 bg-muted rounded-full mb-3" />
                        <div className="h-3 w-2/3 bg-foreground/20 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 elite-card bg-background/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex items-center gap-4 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-400/20">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Network Status</p>
                  <p className="text-base font-black text-foreground">Zero Leakage</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce opacity-30" />
      </motion.div>
    </section>
  );
}
