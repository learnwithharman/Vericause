import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface CampaignData {
  id: string;
  title: string;
  org: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
  daysLeft: number;
  category: string;
  verified: boolean;
}

export function CampaignCard({ campaign, index = 0 }: { campaign: CampaignData; index?: number }) {
  const pct = Math.round((campaign.raised / campaign.goal) * 100);
  const transparencyScore = 88 + (index * 2) % 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/campaign/${campaign.id}`} className="block">
        <div className="elite-card h-full flex flex-col group-hover:scale-[1.01]">
          <div className="relative h-60 overflow-hidden">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-5 left-5 flex gap-2">
              <Badge className="bg-white/90 backdrop-blur-xl text-foreground/80 hover:bg-white text-[10px] font-bold uppercase tracking-[0.1em] border-none shadow-sm h-6 px-2.5">
                {campaign.category}
              </Badge>
              {campaign.verified && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-primary/20">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </div>
              )}
            </div>

            <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-white/40 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          <div className="p-8 flex flex-col flex-1">
            <div className="flex-1 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${campaign.org}`} alt={campaign.org} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{campaign.org}</span>
              </div>
              <h3 className="font-display font-bold text-2xl tracking-tight leading-tight text-foreground transition-colors line-clamp-2 mb-3">
                {campaign.title}
              </h3>
            </div>

            <div className="space-y-6 pt-6 border-t border-border/40">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Capital Raised</div>
                  <div className="text-2xl font-display font-bold text-foreground tracking-tighter">${campaign.raised.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">{pct}%</div>
                  <div className="text-[10px] font-bold text-muted-foreground">OF ${campaign.goal.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-primary origin-left rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + index}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground">+{campaign.donors} active donors</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-border/40">
                  <Clock className="w-3 h-3 text-primary/60" />
                  <span>{campaign.daysLeft}d left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
