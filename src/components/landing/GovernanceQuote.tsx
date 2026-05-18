import { motion } from "framer-motion";

export function GovernanceQuote() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="elite-card p-12 md:p-16 bg-slate-50 dark:bg-white/[0.03] border-none relative overflow-hidden group rounded-[2.5rem]"
        >
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="relative grid lg:grid-cols-5 gap-16 items-center text-foreground">
            <div className="lg:col-span-3">
              <blockquote className="text-2xl md:text-4xl font-bold tracking-tight mb-10 leading-[1.1]">
                "VeriCause has established the <span className="text-primary italic">gold standard</span> for verifiable impact. It's the infrastructure every NGO needs."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md shadow-primary/20">MS</div>
                <div>
                  <p className="font-bold text-lg leading-tight">Michael Sterling</p>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Principal Investor • Tech Philanthropy</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {[
                { val: "99.9%", label: "Accuracy" },
                { val: "Instant", label: "Finality" },
                { val: "24/7", label: "Monitoring" },
                { val: "No-Loss", label: "Assured" },
              ].map((p, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -3 }}
                  className="bg-white dark:bg-white/10 p-6 rounded-2xl border border-border/40 dark:border-white/10 shadow-sm text-center"
                >
                  <p className="text-xl font-bold tracking-tight mb-1 text-primary">{p.val}</p>
                  <p className="text-[9px] uppercase tracking-widest font-black text-muted-foreground">{p.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
