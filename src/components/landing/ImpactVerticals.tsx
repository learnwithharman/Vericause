import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Shield, Globe, Activity } from "lucide-react";

export function ImpactVerticals() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          badge="Sovereign Tech"
          title="Autonomous Oversight Tools"
          subtitle="Decentralizing the verification layer to ensure zero-leakage allocation."
        />

        <div className="grid lg:grid-cols-3 gap-6 pt-10">
          {[
            { icon: Shield, title: "Protocol Audits", desc: "Automated verification that audits fund allocation with absolute certainty." },
            { icon: Globe, title: "Global Settlement", desc: "Real-time borderless settlement of capital directly to endpoints." },
            { icon: Activity, title: "Telemetry Proof", desc: "Granular data feeds documenting real-world impact as it happens." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 group bg-background border border-border rounded-xl transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
