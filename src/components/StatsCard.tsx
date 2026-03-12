import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  index?: number;
}

export function StatsCard({ label, value, change, icon: Icon, index = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="elite-card p-10 group"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20">
            <Icon className="w-6 h-6" />
          </div>
          {change && (
            <div className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary tracking-wider animate-pulse-subtle">
              {change}
            </div>
          )}
        </div>
        
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">{label}</div>
          <h3 className="text-4xl font-display font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
