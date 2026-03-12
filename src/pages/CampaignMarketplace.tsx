import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns } from "@/data/campaigns";
import { Search, Filter, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All Registry", "Water", "Education", "Emergency", "Environment", "Health", "Social"];

export default function CampaignMarketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Registry");

  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.org.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Registry" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
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
            </motion.div>
          </div>

          {/* Precision Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                placeholder="Search by project name or entity..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-14 w-full pl-12 pr-6 rounded-2xl bg-slate-50 border border-border/40 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
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
                  className={`h-11 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                    category === cat 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "bg-white border border-border/40 text-slate-500 hover:border-primary/20 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
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
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-300">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">Registry Mismatch</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  No active campaigns match your current parameters. Try widening your search or category selection.
                </p>
                <button 
                  onClick={() => { setSearch(""); setCategory("All Registry"); }}
                  className="mt-8 text-primary font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  Reset Parameters <ArrowRight className="w-3 h-3" />
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

import { Globe as LucideGlobe } from "lucide-react";
function Globe(props: any) { return <LucideGlobe {...props} />; }
