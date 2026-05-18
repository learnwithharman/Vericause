import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";
import { CampaignCard, CampaignData } from "@/components/CampaignCard";

interface LiveRegistriesProps {
  displayCampaigns: CampaignData[];
}

export function LiveRegistries({ displayCampaigns }: LiveRegistriesProps) {
  return (
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
  );
}
