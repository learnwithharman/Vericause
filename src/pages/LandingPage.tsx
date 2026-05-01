import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CampaignCard } from "@/components/CampaignCard";
import { ShinyText } from "@/components/ShinyText";
import { campaigns as staticCampaigns } from "@/data/campaigns";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Eye, BarChart3, Heart, Target, TrendingUp, HandHeart, Globe, CheckCircle2, Zap, Activity, Shield, ChevronDown, Cpu, Network, Lock, FileSearch } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { campaigns as campaignsApi, Campaign } from "@/lib/api";
import CurvedLoop from "@/components/CurvedLoop";

const stats = [
  { val: 12, suffix: "M", label: "Capital Tracked", icon: Target },
  { val: 540, suffix: "+", label: "Protocol Nodes", icon: ShieldCheck },
  { val: 28, suffix: "K", label: "Active Investors", icon: Activity },
];

const motivationalQuotes = [
  "Transparency is the bedrock of trust.",
  "The currency of change is verified impact.",
  "Small acts, multiplied by millions, transform the world.",
  "Invest in humanity, one verified block at a time.",
  "Your legacy is defined by the lives you touch.",
  "The future of giving is radical transparency.",
  "Turning collective empathy into measurable results.",
  "Radar for integrity, engine for impact.",
  "Verified commitment. Unwavering transparency.",
  "Philanthropy is about making a difference."
];

function MotivationalQuoteEngine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden mb-6">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-[11px] font-bold uppercase tracking-[0.4em] text-center"
        >
          {motivationalQuotes[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: featuredCampaigns = [], isLoading } = useQuery({
    queryKey: ['featured-campaigns'],
    queryFn: () => campaignsApi.list({ status: 'ACTIVE' }),
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mappedApiCampaigns = featuredCampaigns.map((c: Campaign) => {
    const categoryImages: Record<string, string> = {
      Water: "photo-1541544741938-0af808871cc0",
      Education: "photo-1497633762265-9d179a990aa6",
      Emergency: "photo-1469571486292-0ba58a3f068b",
      Environment: "photo-1441974231531-c6227db76b6e",
      Healthcare: "photo-1576091160550-2173dba999ef",
      Social: "photo-1573497620053-ea5300f94f21"
    };
    
    const photoId = categoryImages[c.category] || "photo-1488521787991-ed7bbaae773c";

    return {
      id: c.id,
      title: c.title,
      description: c.description,
      org: c.ngo?.organizationName || "Verified NGO",
      image: `https://images.unsplash.com/${photoId}?w=600&h=400&fit=crop`,
      raised: c.raisedAmount || 0,
      goal: c.goalAmount || 1000,
      donors: c._count?.donations || 0,
      daysLeft: 30,
      category: c.category,
      verified: c.ngo?.verificationStatus === 'VERIFIED',
    };
  });

  const displayCampaigns = mappedApiCampaigns.length > 0 
    ? mappedApiCampaigns.slice(0, 3) 
    : staticCampaigns.slice(0, 3);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground selection:bg-primary/10 transition-colors duration-700 overflow-x-hidden">
      <Navbar />
      
      {/* Strategic Demo Indicator */}
      <div className="fixed top-24 left-6 z-50 pointer-events-none hidden md:block">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg"
        >
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping absolute inset-0" />
            <div className="w-2 h-2 rounded-full bg-primary relative" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Strategic Demo Active</span>
        </motion.div>
      </div>

      {/* High-Value SaaS Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-40 dark:opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at top center, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%)' }} />
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] opacity-20 pointer-events-none blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, transparent 60%)' }} />

      <div className="relative z-10">
        {/* Hero Section - SaaS Left/Right Layout */}
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-start text-left z-10"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-primary mb-8 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  VeriCause 2.5 is now available
                </div>

                <h1 className="text-6xl lg:text-[5.5rem] font-display font-black tracking-tighter leading-[1.05] text-foreground mb-6 drop-shadow-sm">
                  Transparent <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                    Impact Verification.
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
                  The institutional standard for verified philanthropy. We build the infrastructure to ensure every donation is tracked, transparent, and transformative.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                  <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-foreground text-background font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 dark:bg-primary dark:text-primary-foreground text-lg">
                    <Link to="/campaigns" className="flex items-center">Get Started <ArrowRight className="w-5 h-5 ml-2" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-2xl font-bold border-border/60 hover:bg-accent/50 hover:border-border hover:scale-105 backdrop-blur-sm transition-all duration-300 text-lg">
                    <Link to="/ngo-dashboard">Institutional Access</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                {/* Web3 / Futuristic SaaS Illustration */}
                <div className="relative w-full aspect-square max-w-lg mx-auto mt-10 lg:mt-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-cyan-400/20 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />
                  
                  <motion.div 
                    whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ perspective: 1000 }}
                    className="relative h-full w-full elite-card bg-white/40 dark:bg-[#0A0A0A]/60 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent rounded-[2.5rem] pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">Verification Node</div>
                          <div className="text-xs text-muted-foreground font-medium">Syncing blocks...</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-cyan-500 bg-cyan-500/10 px-3 py-1.5 rounded-full uppercase tracking-wider border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        Live
                      </span>
                    </div>

                    <div className="space-y-5 relative z-10 flex-grow flex flex-col justify-center">
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <div className="text-3xl font-display font-black tracking-tight text-foreground">$24.5M</div>
                          <div className="text-sm font-bold text-emerald-500 mb-1">+12.4%</div>
                        </div>
                        <div className="h-1.5 w-full bg-border/50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" 
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-2">
                          <span>Allocated</span>
                          <span>Verified</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        {[1, 2].map((i) => (
                          <div key={i} className="bg-background/50 dark:bg-black/50 p-4 rounded-2xl border border-white/20 dark:border-white/5">
                            <div className="h-2 w-1/3 bg-muted rounded-full mb-3" />
                            <div className="h-3 w-2/3 bg-foreground/20 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute -bottom-8 -left-8 elite-card bg-background/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex items-center gap-4 z-20"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-400/20">
                      <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-0.5">Network Status</p>
                      <p className="text-base font-black text-foreground">Zero Leakage</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
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
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-500 mb-4 block">Open Source Trust</span>
                <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-[1.05] text-foreground">Live Impact <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">Registries.</span></h2>
              </motion.div>
              <Button asChild variant="outline" className="h-14 border-indigo-500/30 text-foreground hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-400 hover:text-white hover:border-transparent rounded-2xl px-8 transition-all duration-300 font-bold text-sm shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Link to="/campaigns" className="flex items-center">Access Data Protocol <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            
            {/* Infinite Horizontal Registry Scroll */}
            <div className="relative w-full overflow-hidden py-10 mt-4">
              <div className="absolute inset-y-0 left-0 w-60 z-20 bg-gradient-to-r from-background via-background/60 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-60 z-20 bg-gradient-to-l from-background via-background/60 to-transparent pointer-events-none" />
              
              <div 
                className="flex gap-8 w-max animate-marquee"
                style={{ "--duration": "50s" } as React.CSSProperties}
              >
                {[...displayCampaigns, ...displayCampaigns].map((c, i) => (
                  <div 
                    key={`${c.id}-${i}`} 
                    className="w-[480px] shrink-0"
                  >
                    <GlowCard className="h-full hover:scale-[1.02] transition-transform duration-500">
                      <CampaignCard campaign={c} index={i} isBento={false} />
                    </GlowCard>
                  </div>
                ))}
              </div>
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

        {/* Global CTA - Refined Clean Panel */}
        <section className="py-32 px-6 md:px-20 border-t border-white/5 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-500/5 pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-foreground mb-8">Ready to redefine <br className="hidden sm:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">your impact?</span></h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-xl mx-auto font-medium">
              Join thousands of organizations using VeriCause to track and verify their global impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-foreground text-background font-bold shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 transition-all duration-300 dark:bg-primary dark:text-primary-foreground text-lg">
                <Link to="/campaigns" className="flex items-center">Get Started Today <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 rounded-2xl font-bold border-border/60 hover:bg-accent/50 hover:border-border hover:scale-105 transition-all duration-300 text-lg">
                <Link to="/ngo-dashboard">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
