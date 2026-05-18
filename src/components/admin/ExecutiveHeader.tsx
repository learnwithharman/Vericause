import { motion } from "framer-motion";
import { Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExecutiveHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
          <Shield className="w-3.5 h-3.5" />
          Administrative Protocol Layer
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
          Oversight Command
        </h1>
      </motion.div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            placeholder="Audit lookup by UID..."
            className="h-12 w-64 pl-11 pr-4 rounded-xl bg-slate-50 border border-border/60 text-[12px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
          />
        </div>
        <Button className="h-12 px-6 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-[13px] shadow-lg shadow-indigo-100/50 transition-all active:scale-95">
          Generate System Audit
        </Button>
      </div>
    </div>
  );
}
