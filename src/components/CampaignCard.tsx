import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Clock, ShieldCheck } from "lucide-react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/campaign/${campaign.id}`} className="block">
        <div className="rounded-xl overflow-hidden bg-card border border-border hover-lift shadow-sm hover:shadow-xl">
          <div className="relative h-48 overflow-hidden">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary" className="bg-card/80 backdrop-blur-md text-xs">
                {campaign.category}
              </Badge>
              {campaign.verified && (
                <span className="trust-badge">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
          </div>
          <div className="p-5 space-y-3">
            <div>
              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                {campaign.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{campaign.org}</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-semibold">${campaign.raised.toLocaleString()}</span>
                <span className="text-muted-foreground">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2" />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {campaign.donors} donors</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {campaign.daysLeft}d left</span>
            </div>
            <Button size="sm" className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90 mt-1">
              <Heart className="w-3.5 h-3.5 mr-1.5" /> Donate Now
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
