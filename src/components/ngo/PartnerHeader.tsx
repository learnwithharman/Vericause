import { motion } from "framer-motion";
import { Shield, PlusCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartnerHeaderProps {
  setActiveTab: (tab: string) => void;
  setNewCampaign: (campaign: any) => void;
}

export function PartnerHeader({ setActiveTab, setNewCampaign }: PartnerHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
          <Shield className="w-3.5 h-3.5" />
          Entity Operational Layer
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
          Partner Command
        </h1>
        <p className="text-[15px] font-medium text-slate-500 mt-3 max-w-xl leading-relaxed">
          Management of your philanthropic registry entries and verifiable impact documentation.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setActiveTab("create")}
          className="h-12 px-6 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-[13px] shadow-lg shadow-indigo-100/50 transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Initialize Campaign
        </Button>
        <Button
          onClick={() => {
            setNewCampaign({
              title: "[URGENT] Emergency Rescue",
              description: "CRITICAL: Response required for immediate incident. Operational parameters at maximum priority.",
              goalAmount: 100000,
              category: "Emergency"
            });
            setActiveTab("create");
          }}
          variant="outline"
          className="h-12 px-6 border-red-100 bg-red-50/50 text-red-600 hover:bg-red-50 rounded-xl font-bold text-[13px] transition-all active:scale-95"
        >
          <Zap className="w-4 h-4 mr-2" /> Emergency Protocol
        </Button>
      </div>
    </div>
  );
}
