import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { campaigns as staticCampaigns } from "@/data/campaigns";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Users, Clock, Heart, Star, MapPin, ChevronRight, Share2, Info, CheckCircle2, ArrowRight, BarChart3, Globe, Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { campaigns as campaignsApi, donations as donationsApi, auth } from "@/lib/api";
import { useState } from "react";

const impactUpdates = [
  { 
    date: "March 05, 2026", 
    title: "Critical Infrastructure Deployment", 
    status: "Verified",
    type: "Logistics",
    desc: "The primary solar arrays and pump controllers have been successfully deployed. Engineering verification is complete for the first quadrant.",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
  },
  { 
    date: "February 28, 2026", 
    title: "Phase 1 Civil Works Complete", 
    status: "Audited",
    type: "Engineering",
    desc: "Foundation work for the central water hub has reached 100% completion. Structural audits confirm compliance with international standards.",
    image: "https://images.unsplash.com/photo-1541888941259-7b9f9233feaa?q=80&w=800&auto=format&fit=crop"
  },
];

const fundAllocationData = [
  { name: "Infrastructure", value: 45, color: "hsl(226 100% 50%)" },
  { name: "Field Operations", value: 25, color: "hsl(215 100% 50%)" },
  { name: "Verification", value: 15, color: "hsl(150 100% 35%)" },
  { name: "Community Engagement", value: 10, color: "hsl(224 30% 12%)" },
  { name: "Administration", value: 5, color: "hsl(210 20% 80%)" },
];

export default function CampaignDetail() {
  const { id } = useParams();
  const [donateAmount, setDonateAmount] = useState(25);
  const [donating, setDonating] = useState(false);

  // Fetch live campaign data, fall back to static if server is down
  const { data: apiCampaign } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => campaignsApi.get(id!),
    enabled: !!id,
    staleTime: 30_000,
  });

  const staticCampaign = staticCampaigns.find(c => c.id === id) || staticCampaigns[0];

  // Merge: use API data if available, otherwise static
  const campaign = apiCampaign
    ? {
        id: apiCampaign.id,
        title: apiCampaign.title,
        org: apiCampaign.ngo?.organizationName ?? 'Unknown NGO',
        image: staticCampaign.image,
        raised: apiCampaign.raisedAmount,
        goal: apiCampaign.goalAmount,
        donors: apiCampaign._count?.donations ?? 0,
        daysLeft: 30,
        category: apiCampaign.category,
        verified: apiCampaign.ngo?.verificationStatus === 'VERIFIED',
      }
    : staticCampaign;

  const liveUpdates = apiCampaign?.impactUpdates ?? [];
  const pct = Math.round((campaign.raised / campaign.goal) * 100);

  async function handleDonate() {
    if (!auth.isLoggedIn()) { alert('Please log in to donate.'); return; }
    setDonating(true);
    try {
      await donationsApi.donate(campaign.id, donateAmount);
      alert(`Donation of $${donateAmount} successful! Thank you.`);
    } catch (e: unknown) {
      const err = e as Error;
      alert(err.message || 'Donation failed');
    } finally {
      setDonating(false);
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                <Link to="/campaigns" className="hover:text-primary transition-colors">Registry</Link>
                <ChevronRight className="w-3 h-3 opacity-30" />
                <span className="text-foreground/60">{campaign.category}</span>
                <ChevronRight className="w-3 h-3 opacity-30" />
                <span className="text-primary">Project #{campaign.id}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground leading-[1.05] mb-8">
                {campaign.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-border/40">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white overflow-hidden italic">
                    {campaign.org.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-foreground">{campaign.org}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Verified NGO</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-3"
            >
              <Button variant="ghost" className="rounded-full h-12 w-12 p-0 border border-border/40 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-foreground transition-all uppercase">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="rounded-full h-12 w-12 p-0 border border-border/40 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-foreground transition-all uppercase">
                <Star className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Content Column */}
            <div className="lg:col-span-8 space-y-20">
              {/* Cover Image Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[16/10] rounded-[3rem] overflow-hidden group shadow-2xl shadow-indigo-100/50"
              >
                <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-10 left-10 flex gap-4">
                  <div className="elite-glass rounded-2xl px-6 py-4 flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Impact Radius</span>
                      <span className="text-xl font-display font-bold">+5,400 Lives</span>
                    </div>
                    <div className="w-px h-8 bg-border/20" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</span>
                      <span className="text-xl font-display font-bold text-emerald-500">Live</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description Layer */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Info className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Project Mandate</h3>
                </div>
                <p className="text-2xl font-medium text-slate-800 dark:text-slate-200 leading-snug tracking-tight">
                  This initiative addresses immediate clean water access via high-efficiency solar infrastructure. Beyond the physical assets, we are establishing a sovereign community maintenance layer to ensure generational resilience.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium">
                  Our transparent framework ensures that every unit of capital deployed is mapped to professional-grade engineering documentation and verified on-field arrival.
                </p>
              </div>

              {/* Data Layers */}
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
                            <div className="w-full md:w-40 aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-800 shrink-0">
                              <img src={u.image} alt={u.title} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar / Interaction Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="elite-card p-12 bg-white dark:bg-slate-900/50 relative overflow-hidden ring-4 ring-primary/5"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
                  
                  <div className="space-y-10">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Commitment Goal</span>
                        <h2 className="text-4xl font-display font-bold tracking-tighter text-foreground">${campaign.raised.toLocaleString()}</h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary block mb-1">{pct}%</span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Funded</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <Progress value={pct} className="h-2 rounded-full bg-slate-100 dark:bg-slate-800" />
                       <p className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-[0.2em] opacity-40">Target Protocol: ${campaign.goal.toLocaleString()} USD</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-border/20 dark:border-white/10 text-center">
                        <div className="text-2xl font-display font-bold text-foreground mb-1">{campaign.donors}</div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">VERIFIED DONORS</div>
                      </div>
                      <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-border/20 dark:border-white/10 text-center">
                        <div className="text-2xl font-display font-bold text-foreground mb-1">{campaign.daysLeft}</div>
                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">DAYS REMAINING</div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center text-foreground/40">Select Commitment Tier</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[25, 50, 100].map(a => (
                          <button key={a} className="h-14 rounded-2xl border border-border/40 font-bold text-base hover:border-primary hover:bg-primary/5 transition-all outline-none focus:ring-2 focus:ring-primary/20">
                            ${a}
                          </button>
                        ))}
                      </div>
                      <div className="relative group">
                        <input 
                           type="text" 
                           placeholder="Precision commitment" 
                           className="w-full h-14 bg-slate-50 dark:bg-white/5 border border-border/20 dark:border-white/10 rounded-2xl px-6 text-sm font-bold focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-muted-foreground">USD</span>
                      </div>
                    </div>

                    <Button size="lg" className="w-full h-16 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-2xl shadow-xl shadow-indigo-100 group transition-all active:scale-95">
                      Confirm Contribution <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <div className="flex items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">TLS 1.3</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">KYC READY</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3" />
                        <span className="text-[8px] font-bold uppercase tracking-widest">INSTANT</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Authority Ledger */}
                <div className="elite-card p-10 space-y-8">
                   <div className="flex items-center justify-between">
                     <h5 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">Recent Flows</h5>
                     <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Protocol Live</span>
                     </div>
                   </div>
                   <div className="space-y-6">
                      {[
                        { name: "Executive donor", amt: 2500, time: "4m ago", icon: Globe },
                        { name: "Institutional", amt: 1200, time: "18m ago", icon: ShieldCheck },
                        { name: "Private Angel", amt: 500, time: "1h ago", icon: Heart },
                      ].map((d, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0 last:pb-0">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400">
                                <d.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{d.name}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{d.time}</p>
                              </div>
                           </div>
                           <p className="text-sm font-bold text-primary">+${d.amt.toLocaleString()}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
