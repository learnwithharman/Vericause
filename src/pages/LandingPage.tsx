import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns } from "@/data/campaigns";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ShieldCheck, Eye, BarChart3, Heart, Target, TrendingUp, HandHeart, Globe, CheckCircle2, Zap, Activity, Shield, ChevronDown, Cpu, Network, Lock, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const stats = [
  { val: 12, suffix: "M", label: "Capital Tracked", icon: Target },
  { val: 540, suffix: "+", label: "Protocol Nodes", icon: ShieldCheck },
  { val: 28, suffix: "K", label: "Active Investors", icon: Activity },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: zoomProgress } = useScroll({
    target: zoomRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  
  // Zoom Animation Logic
  const zoomScale = useTransform(zoomProgress, [0.1, 0.5], [0.85, 1.05]);
  const zoomOpacity = useTransform(zoomProgress, [0.1, 0.3], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground selection:bg-primary/10 transition-colors duration-700 overflow-x-hidden">
      <Navbar />

      {/* Protocol Background Engine */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 protocol-grid opacity-[0.03] dark:opacity-[0.08]" 
        />
        <div className="absolute inset-0 protocol-grid-dots opacity-[0.15] dark:opacity-[0.2]" />
        <div className="impact-node w-96 h-96 top-[5%] left-[-5%] bg-primary/5 dark:bg-primary/10" style={{ "--duration": "25s" } as any} />
        <div className="impact-node w-[600px] h-[600px] bottom-[10%] right-[-10%] bg-indigo-500/5 dark:bg-indigo-500/10" style={{ "--duration": "35s" } as any} />
      </div>

      <div className="relative z-10">
        {/* Hero Section - Condensed */}
        <section className="relative h-[85vh] flex items-center justify-center pt-16 pb-8 overflow-hidden">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="container mx-auto px-6"
          >
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-sm mb-8 group cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-foreground/70">Autonomous Verification Protocol v2.5.0</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </motion.div>

              <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] mb-8">
                <div className="text-reveal-mask">
                  <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="block">Transparent</motion.span>
                </div>
                <div className="text-reveal-mask">
                  <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="block text-primary">Impact.</motion.span>
                </div>
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-normal mb-10"
              >
                The institutional standard for cryptographically verified philanthropy. Building the world's first <span className="protocol-accent font-bold text-foreground">sovereign trust layer</span> for global giving.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all">
                  <Link to="/campaigns" className="flex items-center">Enter Registry <Zap className="w-4 h-4 ml-2 fill-white" /></Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="h-14 px-10 rounded-2xl text-sm font-bold bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-border/40 hover:bg-white dark:hover:bg-white/10 transition-all">
                  <Link to="/ngo-dashboard">Network Node</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce opacity-30" />
          </motion.div>
        </section>

        {/* High-Density Scroll Zoom - Oversight Command */}
        <section ref={zoomRef} className="h-[120vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <motion.div 
              style={{ scale: zoomScale, opacity: zoomOpacity }}
              className="relative w-full max-w-5xl aspect-[16/10] rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden bg-slate-50 dark:bg-slate-900/80 backdrop-blur-3xl group/dash"
            >
              <div className="absolute inset-0 protocol-grid opacity-[0.05]" />
              
              {/* Dashboard Content */}
              <div className="p-6 md:p-10 h-full flex flex-col relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 rounded-md bg-white/50 dark:bg-white/5 border border-white/20 text-[8px] font-black tracking-widest uppercase text-muted-foreground">OVERSIGHT COMMAND V4.2</div>
                    <div className="text-[8px] font-mono text-primary/60">NODE_ID: VC_77XC_09</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-12 gap-5 h-full overflow-hidden">
                  {/* Sidebar Components */}
                  <div className="col-span-3 space-y-4">
                    <div className="h-20 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/20 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center"><Shield className="w-3 h-3 text-primary" /><span className="text-[7px] font-bold text-muted-foreground uppercase">Stability</span></div>
                      <div className="text-sm font-bold text-foreground">99.98%</div>
                    </div>
                    <div className="h-32 rounded-2xl bg-primary/[0.03] border border-primary/20 p-4 relative overflow-hidden">
                       <div className="relative z-10">
                         <div className="text-[7px] font-bold text-primary uppercase mb-2">Network Load</div>
                         <div className="flex flex-col gap-1.5">
                           {[60, 45, 80, 55].map((w, i) => (
                             <div key={i} className="h-1 bg-primary/10 rounded-full overflow-hidden">
                               <motion.div initial={{ width: 0 }} animate={{ width: `${w}%` }} transition={{ delay: 1 + i * 0.1, duration: 1.5 }} className="h-full bg-primary" />
                             </div>
                           ))}
                         </div>
                       </div>
                    </div>
                    <div className="h-20 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/20 p-4">
                      <div className="text-[7px] font-bold text-muted-foreground uppercase mb-1">Active Ledger</div>
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
                        <div className="h-1 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Main Display Area */}
                  <div className="col-span-9 h-full">
                    <div className="h-full rounded-[2rem] bg-white/70 dark:bg-white/5 border border-white/20 p-6 flex flex-col">
                       <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><Activity className="w-5 h-5" /></div>
                           <div className="space-y-1">
                             <div className="text-[10px] font-bold text-foreground">Real-time Impact Stream</div>
                             <div className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /><span className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Live Audit</span></div>
                           </div>
                         </div>
                         <div className="flex gap-2">
                           <div className="w-12 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20" />
                           <div className="w-12 h-6 rounded-lg bg-primary/10 border border-primary/20" />
                         </div>
                       </div>

                       <div className="flex-1 grid grid-cols-2 gap-4">
                         {/* Live Allocation Feed */}
                         <div className="rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-white/10 p-4 flex flex-col gap-3 overflow-hidden">
                            <div className="text-[7px] font-bold text-primary uppercase tracking-widest opacity-70">Protocol Redirections</div>
                            <div className="space-y-2">
                              {[
                                { id: "TX_4401", node: "EU_WEST_1", status: "PENDING" },
                                { id: "TX_4402", node: "SA_SOUTH_2", status: "VERIFIED" },
                                { id: "TX_4403", node: "AP_EAST_4", status: "REDIRECT" },
                              ].map((tx, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-white/5 border border-white/10 shadow-sm relative overflow-hidden group">
                                  <div className="flex items-center gap-2 relative z-10">
                                    <div className={`w-1 h-1 rounded-full ${tx.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`} />
                                    <div className="text-[8px] font-bold text-foreground">{tx.id}</div>
                                  </div>
                                  <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[6px] font-mono text-primary/60">NODE_VC</span>
                                    <ArrowRight className="w-2 h-2 text-muted-foreground" />
                                    <span className="text-[6px] font-mono text-foreground/70">{tx.node}</span>
                                  </div>
                                  <div className={`text-[6px] font-black px-1.5 py-0.5 rounded-md ${tx.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'}`}>{tx.status}</div>
                                </div>
                              ))}
                            </div>
                         </div>

                         {/* Node Topology Preview */}
                         <div className="rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-white/10 p-4 relative overflow-hidden">
                            <div className="text-[7px] font-bold text-muted-foreground uppercase mb-3">Topology Relay Map</div>
                            <div className="relative h-full flex flex-col justify-between">
                               <div className="relative">
                                 <svg className="w-full h-24 opacity-20" viewBox="0 0 100 40">
                                   <motion.path 
                                     d="M10,20 Q30,5 50,20 T90,20" 
                                     stroke="currentColor" 
                                     fill="none" 
                                     strokeWidth="0.5" 
                                     className="text-primary"
                                     initial={{ pathLength: 0 }}
                                     animate={{ pathLength: 1 }}
                                     transition={{ duration: 2, repeat: Infinity }}
                                   />
                                   <circle cx="10" cy="20" r="1.5" fill="currentColor" className="text-primary" />
                                   <circle cx="50" cy="20" r="1.5" fill="currentColor" className="text-primary" />
                                   <circle cx="90" cy="20" r="1.5" fill="currentColor" className="text-primary" />
                                 </svg>
                               </div>
                               <div className="text-[6px] font-mono text-primary/40 text-right space-y-0.5 mt-auto">
                                 <div>UPTIME: 124D 12H 09M</div>
                                 <div>SEC_PROTOCOL: ENABLED</div>
                                 <div className="text-primary/60">SIG: SH-256_AUTH</div>
                               </div>
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geometric Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02] protocol-grid-dots" />
            </motion.div>
            
            {/* Absolute Overlay Text */}
            <motion.div 
              style={{ opacity: useTransform(zoomProgress, [0.3, 0.4], [0, 1]) }}
              className="absolute pointer-events-none text-center"
            >
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-foreground shadow-sm">Complete Operational <br />Transparency.</h2>
            </motion.div>
          </div>
        </section>

        {/* Real-time Telemetry Section - Condensed */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 border border-primary/10 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-xl"
            >
              {stats.map((s, i) => (
                <div key={i} className="bg-white/60 dark:bg-slate-900/60 p-8 flex flex-col items-center group transition-all duration-700">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 mb-6 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-display font-bold tracking-tighter text-foreground mb-1">
                    {s.val}{s.suffix}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Impact Verticals - Condensed */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <SectionHeading 
              badge="Sovereign Tech"
              title="Autonomous Oversight Tools"
              subtitle="Decentralizing the verification layer to ensure zero-leakage allocation."
            />

            <div className="grid lg:grid-cols-3 gap-6 pt-10">
              {[
                { icon: Shield, title: "Protocol Audits", desc: "Automated verification nodes that audit fund allocation every second." },
                { icon: Globe, title: "Global Settlement", desc: "Real-time borderless settlement of capital directly to project endpoints." },
                { icon: Activity, title: "Telemetry Proof", desc: "Granular, live data feeds documenting real-world impact as it happens." },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="elite-card p-10 group bg-white/40 dark:bg-white/5 backdrop-blur-md border-white/20 transition-all hover:scale-[1.01]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-border/50 dark:border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm mb-8">
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Registries - Condensed */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-lg"
              >
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-primary mb-4 block">Open Source Trust</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight text-foreground">Live Impact <br />Registries.</h2>
              </motion.div>
              <Button asChild variant="outline" className="h-12 border-primary/40 text-primary hover:bg-primary hover:text-white rounded-xl px-8 transition-all font-bold text-xs">
                <Link to="/campaigns" className="flex items-center">Access Data Protocol <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.slice(0, 3).map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CampaignCard campaign={c} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance Quotes - Condensed */}
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
                      <div className="font-display font-black text-xl mb-1 text-primary">{p.val}</div>
                      <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">{p.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global CTA - Refined Blue Panel */}
        <section className="py-16 px-6 md:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto rounded-[3rem] bg-indigo-600 dark:bg-primary p-12 md:p-20 relative overflow-hidden group text-center shadow-2xl transition-all hover:shadow-primary/20"
          >
            {/* Geometric Detail Layer */}
            <div className="absolute inset-0 protocol-grid opacity-[0.15]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="absolute bottom-4 right-8 text-[8px] font-mono text-white/30 uppercase tracking-[0.5em] hidden md:block">PROTOCOL_ACCESS_GRANTED // SECURE_ALLOCATION</div>
            <div className="absolute top-4 left-8 text-[8px] font-mono text-white/30 uppercase tracking-[0.5em] hidden md:block">VERICAUSE_ORIGIN_NODE // 2026_COLLECTION</div>

            <div className="relative">
              <h2 className="text-4xl md:text-7xl font-display font-black tracking-tighter text-white mb-10 leading-[0.9]">Redefine your <br />impact legacy.</h2>
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
                <Button asChild className="h-16 px-12 rounded-2xl bg-white text-indigo-600 dark:text-primary text-base font-bold shadow-xl hover:bg-slate-50 hover:scale-[1.05] transition-all group">
                  <Link to="/campaigns" className="flex items-center">Start Integration <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></Link>
                </Button>
                <Button asChild variant="ghost" className="h-16 px-12 rounded-2xl border border-white/20 text-white text-base font-bold hover:bg-white/10 transition-all">
                  <Link to="/ngo-dashboard">Institutional Access</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
