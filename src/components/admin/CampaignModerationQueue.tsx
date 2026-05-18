import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Play, Pause, Trash2, Check } from "lucide-react";
import { getImageUrl, Campaign } from "@/lib/api";

interface CampaignModerationQueueProps {
  campaigns: Campaign[];
  approveMutation: any;
  toggleStatusMutation: any;
  deleteMutation: any;
}

export function CampaignModerationQueue({ campaigns, approveMutation, toggleStatusMutation, deleteMutation }: CampaignModerationQueueProps) {
  const pendingCampaigns = campaigns.filter(c => c.status === "PENDING");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {pendingCampaigns.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="elite-card p-8 group"
        >
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[8px] tracking-widest uppercase px-2.5 py-0.5 rounded-full">{c.category}</Badge>
                <Badge className={`${c.category === "Emergency" ? "bg-red-50 text-red-500 border border-red-100" : "bg-primary/5 text-primary border border-primary/10"} font-bold text-[8px] tracking-widest uppercase px-2.5 py-0.5 rounded-full`}>{c.category === "Emergency" ? "Critical" : "Standard"} Priority</Badge>
                {c.status === "PAUSED" && <Badge className="bg-amber-50 text-amber-600 border border-amber-100 font-bold text-[8px] tracking-widest uppercase px-2.5 py-0.5 rounded-full">Paused</Badge>}
              </div>
              <h4 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{c.title}</h4>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-border/40 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm overflow-hidden italic uppercase text-sm">
              {c.ngo?.organizationName?.charAt(0) || "N"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50/40 p-4 rounded-xl border border-border/40">
              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Entity</p>
              <p className="font-bold text-[13px] tracking-tight mb-1 truncate" title={c.ngo?.organizationName || "Unknown Options"}>{c.ngo?.organizationName || "Unknown NGO"}</p>
              <div className="flex items-center gap-1.5 text-emerald-500">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-[8px] font-bold uppercase tracking-widest">KYC Clear</span>
              </div>
            </div>
            <div className="bg-slate-50/40 p-4 rounded-xl border border-border/40">
              <div className="text-[8px] font-bold uppercase tracking-widest text-primary">Verifiable Node</div>
              {c.verificationDocUrl && (
                <a 
                  href={getImageUrl(c.verificationDocUrl)} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  <FileText className="w-3 h-3" /> View Documentation
                </a>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => approveMutation.mutate({ id: c.id, status: 'APPROVED' })}
              className="flex-1 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-indigo-100/50 hover:bg-primary/95 transition-all text-[12px]"
            >
              Approve
            </Button>
            <Button
              onClick={() => approveMutation.mutate({ id: c.id, status: 'REJECTED' })}
              variant="outline"
              className="flex-1 h-12 font-bold rounded-xl border-red-100 text-red-500 hover:text-red-700 hover:bg-red-50 transition-all text-[12px]"
            >
              Quarantine
            </Button>
          </div>

          <div className="flex gap-2 mt-3 pt-3 border-t border-border/40">
            <Button
              onClick={() => toggleStatusMutation.mutate(c.id)}
              variant="ghost" size="sm" className="flex-1 h-10 rounded-xl text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-primary transition-colors gap-2"
            >
              {c.status === "PAUSED" ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              {c.status === "PAUSED" ? "Resume" : "Pause"}
            </Button>
            <Button
              onClick={() => {
                if (confirm("ADMIN OVERRIDE: Permanently delete this campaign node?")) {
                  deleteMutation.mutate(c.id);
                }
              }}
              variant="ghost" size="sm" className="flex-1 h-10 rounded-xl text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-red-500 transition-colors gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" /> Purge
            </Button>
          </div>
        </motion.div>
      ))}
      {pendingCampaigns.length === 0 && (
        <div className="col-span-full py-16 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-border/40 flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">Queue Empty</h3>
          <p className="text-[13px] font-medium text-muted-foreground max-w-sm">
            All programmatic campaign nodes have been processed and settled.
          </p>
        </div>
      )}
    </div>
  );
}
