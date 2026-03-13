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
      className="elite-card p-8 group"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/10">
            <Icon className="w-5 h-5" />
          </div>
          {change && (
            <div className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-bold text-primary tracking-wider">
              {change}
            </div>
          )}
        </div>
        
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">{label}</div>
          <h3 className="text-3xl font-display font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
