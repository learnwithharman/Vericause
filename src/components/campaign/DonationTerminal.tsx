import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DollarSign, ShieldCheck, Zap } from "lucide-react";
import { Campaign } from "@/lib/api";

interface DonationTerminalProps {
  campaign: Campaign;
  donateAmount: number;
  setDonateAmount: (amount: number) => void;
  handleDonate: () => void;
  donating: boolean;
  demoMode?: boolean;
}

export function DonationTerminal({
  campaign,
  donateAmount,
  setDonateAmount,
  handleDonate,
  donating,
  demoMode
}: DonationTerminalProps) {
  const percent = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100);

  return (
    <div className="sticky top-40 space-y-8">
      <div className="elite-card p-10 relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border-border shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
        
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h3 className="text-4xl font-display font-black tracking-tight text-foreground">
              ${campaign.raisedAmount.toLocaleString()}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Registry Total</p>
          </div>
          <div className="text-right space-y-1">
            <h4 className="text-xl font-bold tracking-tight text-foreground/60">
              ${campaign.goalAmount.toLocaleString()}
            </h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Protocol Target</p>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <Zap className="w-3 h-3" /> Efficiency Layer
            </span>
            <span className="text-[10px] font-black text-foreground/40">{percent}% Complete</span>
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden border border-border/20">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 2, ease: "circOut" }}
              className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" 
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <DollarSign className="w-5 h-5" />
            </div>
            <input 
              type="number"
              value={donateAmount}
              onChange={(e) => setDonateAmount(Number(e.target.value))}
              placeholder="Operational Capital..."
              className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-border/60 dark:border-white/10 rounded-2xl pl-14 pr-6 text-xl font-bold focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[25, 50, 100, 250].map((amt) => (
              <button
                key={amt}
                onClick={() => setDonateAmount(amt)}
                className={`h-11 rounded-xl text-[10px] font-black transition-all border ${
                  donateAmount === amt 
                    ? "bg-primary text-white border-primary shadow-lg shadow-indigo-100/50" 
                    : "bg-white dark:bg-white/5 text-muted-foreground border-border/60 hover:bg-slate-50"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          <Button 
            size="lg" 
            className="w-full h-16 rounded-2xl bg-foreground text-background font-bold text-lg shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all dark:bg-primary dark:text-primary-foreground"
            onClick={handleDonate}
            disabled={donating}
          >
            {donating ? "Finalizing Transaction..." : "Deploy Capital"}
          </Button>
          
          <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-border/40">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Verifiable Finality Guaranteed</p>
          </div>
          
          {demoMode && (
            <div className="text-center">
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Running in Strategic Demo Mode</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Entity Profile */}
      <div className="elite-card p-8 bg-slate-50 dark:bg-white/5 border-none">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center font-bold text-xl text-primary italic border border-border/40 shadow-sm">
            {campaign.ngo?.organizationName?.charAt(0) || "N"}
          </div>
          <div>
            <h4 className="font-bold text-lg">{campaign.ngo?.organizationName || "Strategic Partner"}</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Certified Entity</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-6">
          Authorized verification node with zero leakage history and 100% operational audit clearance.
        </p>
        <Button variant="outline" className="w-full h-12 rounded-xl border-border/60 hover:bg-white transition-all font-bold text-[11px] uppercase tracking-widest">
          View Entity Registry
        </Button>
      </div>
    </div>
  );
}
