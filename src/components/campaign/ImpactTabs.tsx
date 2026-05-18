import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/lib/api";

interface ImpactTabsProps {
  campaign: Campaign;
  fundAllocationData: any[];
  impactUpdates: any[];
}

export function ImpactTabs({ campaign, fundAllocationData, impactUpdates }: ImpactTabsProps) {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-10 rounded-full bg-primary" />
          <h3 className="text-2xl font-bold tracking-tight">Project Mandate</h3>
        </div>
        <p className="text-2xl font-medium text-slate-800 dark:text-slate-200 leading-snug tracking-tight">
          {campaign.description || "This initiative addresses immediate clean water access via high-efficiency solar infrastructure. Beyond the physical assets, we are establishing a sovereign community maintenance layer to ensure generational resilience."}
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
          Our transparent framework ensures that every unit of capital deployed is mapped to professional-grade engineering documentation and verified on-field arrival.
        </p>
      </div>

      <Tabs defaultValue="transparency" className="w-full">
        <TabsList className="bg-slate-100/50 dark:bg-white/5 p-1.5 rounded-full border border-border/40 mb-12 inline-flex">
          <TabsTrigger value="transparency" className="rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-[0.1em] data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all">Transparency Protocol</TabsTrigger>
          <TabsTrigger value="timeline" className="rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-[0.1em] data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all">Impact Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="transparency" className="mt-0 space-y-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={"65%"}
                    outerRadius={"85%"}
                    paddingAngle={10}
                    dataKey="value"
                    stroke="none"
                  >
                    {fundAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-display font-bold tracking-tight">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Capital Audited</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {fundAllocationData.map((f, i) => (
                <div key={i} className="elite-card p-6 flex items-center justify-between group cursor-pointer hover:border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-10 rounded-full" style={{ backgroundColor: f.color }} />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">{f.name}</p>
                      <h5 className="font-bold text-lg">{f.value}% <span className="text-sm text-muted-foreground font-medium">Allocation</span></h5>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-0">
          <div className="relative pt-8 pl-12 space-y-20 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border/60">
            {impactUpdates.map((u, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="absolute -left-[33px] top-1.5 w-[3px] h-[3px] rounded-full bg-primary outline outline-[8px] outline-primary/10 shadow-[0_0_20px_rgba(79,70,229,0.5)] z-10" />
                <div className="grid md:grid-cols-12 gap-10">
                  <div className="md:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{u.date}</span>
                      <div className="h-px w-8 bg-primary/20" />
                    </div>
                    <h4 className="text-2xl font-bold tracking-tight">{u.title}</h4>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 border border-border/40 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                      {u.type}
                    </div>
                  </div>
                  <div className="md:col-span-8 flex flex-col md:flex-row gap-8 bg-slate-50/50 dark:bg-white/5 rounded-[2rem] p-8 border border-border/20">
                    <div className="flex-1 space-y-6">
                      <p className="text-muted-foreground leading-relaxed font-medium">{u.desc}</p>
                      <Button variant="ghost" className="h-10 px-0 hover:bg-transparent text-primary text-[10px] font-bold uppercase tracking-widest">
                        EXPLORE DOCUMENTATION <ArrowRight className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                    {u.image && (
                      <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-border/40">
                        <img src={u.image} alt={u.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
