import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CampaignCard } from "@/components/CampaignCard";
import { Search, SlidersHorizontal, ArrowRight, Globe } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { campaigns as campaignsApi, Campaign } from "@/lib/api";

const categories = ["All Registry", "Water", "Education", "Emergency", "Environment", "Healthcare", "Social"];

const ProtocolBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 protocol-grid opacity-[0.03] dark:opacity-[0.05]" />
    <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
  </div>
);

const TelemetryTicker = () => {
  const [ticks, setTicks] = useState<string[]>([]);
  
  useEffect(() => {
    const events = [
      "AUDIT_PULSE: SECURE_NODE_ALPHA",
      "SIGNAL_VERIFIED: ENDPOINT_74",
      "FINALITY_REACHED: BATCH_902",
      "TRUST_SCORE_UPDATE: NGO_GLOBAL_WATER",
      "CONSENSUS_SYNC: REGISTRY_PRIMARY",
      "DECRYPTION_SUCCESS: HASH_AX92"
    ];
    
    const interval = setInterval(() => {
      const event = events[Math.floor(Math.random() * events.length)];
      const timestamp = new Date().toLocaleTimeString();
      setTicks(prev => [`[${timestamp}] ${event}`, ...prev].slice(0, 3));
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:flex items-center gap-6 px-6 py-2 bg-slate-900/5 dark:bg-white/5 border-y border-border/40 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-500">Live Protocol Signal</span>
      </div>
      <div className="flex-1 flex gap-8 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {ticks.map((tick, i) => (
            <motion.span
              key={tick}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-[9px] font-mono text-muted-foreground whitespace-nowrap"
            >
              {tick}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ImpactSummary = ({ total }: { total: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 border border-border/40 rounded-2xl overflow-hidden mt-8">
    {[
      { label: "Active Nodes", val: "542", color: "text-primary" },
      { label: "Capital Audited", val: "$12.8M", color: "text-primary" },
      { label: "Lives Projecting", val: "2.4M", color: "text-emerald-500" },
      { label: "Trust Integrity", val: "99.9%", color: "text-primary" },
    ].map((item, i) => (
      <div key={i} className="bg-white/50 dark:bg-white/[0.02] p-6 text-center backdrop-blur-sm">
        <div className={`text-xl font-display font-bold mb-1 ${item.color}`}>{item.val}</div>
        <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</div>
      </div>
    ))}
  </div>
);

export default function CampaignMarketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Registry");
  const [sortBy, setSortBy] = useState<"Default" | "Trust Score" | "Urgency">("Default");

  const { data: allCampaigns = [], isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => campaignsApi.list({ status: "APPROVED" }),
    staleTime: 30_000,
  });

  // Map API campaign shape to what CampaignCard expects
  const mapped = allCampaigns.map((c: Campaign) => {
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
      description: c.description || "",
      org: c.ngo?.organizationName ?? "Unknown NGO",
      image: `https://images.unsplash.com/${photoId}?w=600&h=400&fit=crop`,
      raised: c.raisedAmount,
      goal: c.goalAmount,
      donors: c._count?.donations ?? 0,
      daysLeft: 30,
      category: c.category,
      verified: c.ngo?.verificationStatus === "VERIFIED",
      transparencyScore: c.transparencyScore || (88 + (parseInt(c.id) % 10 || 0)),
    };
  });

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Registry": mapped.length };
    mapped.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [mapped]);

  const filtered = mapped.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.org.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Registry" || c.category === category;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    if (sortBy === "Trust Score") return (b.transparencyScore || 0) - (a.transparencyScore || 0);
    if (sortBy === "Urgency") return a.daysLeft - b.daysLeft;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 relative">
      <Navbar />
      <ProtocolBackground />

      <main className="pt-32 pb-32 relative z-10">
        <TelemetryTicker />
        <div className="container mx-auto px-6 max-w-7xl pt-16">
          {/* Marketplace Header */}
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                <Globe className="w-4 h-4" />
                Global Impact Registry
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-foreground mb-6">
                Active Campaigns
              </h1>
              <p className="text-xl font-medium text-slate-500 max-w-xl leading-relaxed">
                A verified directory of high-impact philanthropic initiatives, audited for radical transparency and operational efficiency.
              </p>
              <ImpactSummary total={mapped.length} />
            </motion.div>
          </div>

          {/* Precision Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
            <div className="relative flex-1 max-w-lg group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                placeholder="Search by project name or entity..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-14 w-full pl-12 pr-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-border/40 text-[13px] font-semibold focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary/40 transition-all outline-none shadow-sm hover:border-primary/20"
              />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-2 mr-4 bg-slate-50 px-4 py-2 rounded-xl border border-border/40">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Filter By</span>
              </div>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`h-11 px-6 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all relative whitespace-nowrap ${
                    category === cat
                      ? "text-white"
                      : "text-slate-500 hover:text-primary"
                  }`}
                >
                  {category === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat}
                    <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${
                      category === cat ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-white/10 text-slate-400"
                    }`}>
                      {categoryCounts[cat] || 0}
                    </span>
                  </span>
                </button>
              ))}
              
              <div className="h-11 px-4 flex items-center gap-2 bg-slate-50 dark:bg-white/5 border border-border/40 rounded-full ml-auto">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mr-2">Sort:</span>
                {(["Default", "Trust Score", "Urgency"] as const).map(s => (
                  <button 
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-all ${sortBy === s ? 'bg-primary text-white' : 'text-muted-foreground hover:text-primary'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* States: Loading / Error / Grid */}
          {isLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="elite-card aspect-[4/5] bg-slate-50 dark:bg-white/[0.02] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="p-8 h-full flex flex-col">
                    <div className="w-full h-48 rounded-2xl bg-border/20 mb-6" />
                    <div className="w-24 h-3 rounded-full bg-border/20 mb-4" />
                    <div className="w-full h-6 rounded-full bg-border/20 mb-3" />
                    <div className="w-2/3 h-6 rounded-full bg-border/20 mb-auto" />
                    <div className="w-full h-2 rounded-full bg-border/20 mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-4 rounded-full bg-border/20" />
                      <div className="w-16 h-4 rounded-full bg-border/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="py-16 text-center">
              <p className="text-red-500 font-semibold">Could not load campaigns. Is the server running?</p>
              <p className="text-xs text-slate-400 mt-2 font-mono">Make sure <code>npx ts-node-dev src/index.ts</code> is running in the server folder.</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isLoading && !error && filtered.length > 0 && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filtered.map((c, i) => (
                  <CampaignCard key={c.id} campaign={c} index={i} />
                ))}
              </motion.div>
            )}
            {!isLoading && !error && filtered.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center elite-card bg-slate-50/50 dark:bg-white/[0.02] border-dashed border-2"
              >
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-8 text-primary shadow-xl shadow-primary/5">
                  <Globe className="w-10 h-10 animate-spin-slow" />
                </div>
                <h3 className="text-3xl font-display font-bold tracking-tight mb-4 text-foreground">Registry Mismatch</h3>
                <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed mb-10">
                  Protocol scan complete. No active campaigns match your current search parameters or category filter.
                </p>
                <button
                  onClick={() => { setSearch(""); setCategory("All Registry"); setSortBy("Default"); }}
                  className="h-12 px-10 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all"
                >
                  Reset Parameters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
