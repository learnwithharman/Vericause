import { motion } from "framer-motion";
import { Target, ShieldCheck, Activity } from "lucide-react";

const stats = [
  { val: 12, suffix: "M", label: "Capital Tracked", icon: Target },
  { val: 540, suffix: "+", label: "Protocol Nodes", icon: ShieldCheck },
  { val: 28, suffix: "K", label: "Active Investors", icon: Activity },
];

export function StatsTelemetry() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 border border-primary/10 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-xl"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-white/60 dark:bg-[#0A0A0A]/60 p-10 flex flex-col items-center group transition-all duration-700 hover:bg-white dark:hover:bg-[#111111]">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 mb-6 flex items-center justify-center text-primary shadow-sm group-hover:bg-gradient-to-tr group-hover:from-indigo-500 group-hover:to-cyan-400 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                <s.icon className="w-7 h-7" />
              </div>
              <div className="text-5xl lg:text-6xl font-display font-black tracking-tighter text-foreground mb-2 drop-shadow-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-cyan-400 transition-all">
                {s.val}{s.suffix}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground group-hover:text-foreground transition-colors">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
