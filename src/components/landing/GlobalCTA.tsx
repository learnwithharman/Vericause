import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function GlobalCTA() {
  return (
    <section className="py-32 px-6 md:px-20 border-t border-white/5 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500/5 pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-foreground mb-8">Ready to redefine <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">your impact?</span></h2>
        <p className="text-muted-foreground text-xl mb-12 max-w-xl mx-auto font-medium">
          Join thousands of organizations using VeriCause to track and verify their global impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-foreground text-background font-bold shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 transition-all duration-300 dark:bg-primary dark:text-primary-foreground text-lg">
            <Link to="/campaigns" className="flex items-center">Get Started Today <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-2xl font-bold border-border/60 hover:bg-accent/50 hover:border-border hover:scale-105 backdrop-blur-sm transition-all duration-300 text-lg">
            <Link to="/auth">Create Account</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
