import { motion } from "framer-motion";
import { ChevronRight, Share2, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/lib/api";

interface CampaignHeroProps {
  campaign: Campaign;
}

export function CampaignHero({ campaign }: CampaignHeroProps) {
  return (
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
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-primary italic border border-border/60">
              {campaign.ngo?.organizationName?.charAt(0) || "N"}
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Verified Entity</p>
              <p className="text-sm font-bold text-foreground">{campaign.ngo?.organizationName || "Strategic Partner"}</p>
            </div>
          </div>
          <div className="h-8 w-px bg-border/60 hidden sm:block" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Protocol
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="h-14 w-14 rounded-2xl p-0 border-border/60 hover:bg-slate-50 transition-all">
          <Share2 className="w-5 h-5 text-foreground/60" />
        </Button>
        <Button variant="outline" size="lg" className="h-14 w-14 rounded-2xl p-0 border-border/60 hover:bg-slate-50 transition-all">
          <Heart className="w-5 h-5 text-foreground/60" />
        </Button>
      </div>
    </div>
  );
}
