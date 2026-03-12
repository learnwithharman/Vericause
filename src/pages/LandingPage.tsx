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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

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
                <div key={i} className="bg-slate-900/40 dark:bg-slate-900/60 p-8 flex flex-col items-center group transition-all duration-700">
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
                  className="elite-card p-10 group bg-slate-900/40 dark:bg-white/5 backdrop-blur-md border-white/20 transition-all hover:scale-[1.01]"
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
              className="elite-card p-12 md:p-16 bg-slate-900/80 dark:bg-white/[0.03] border-none relative overflow-hidden group rounded-[2.5rem]"
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
