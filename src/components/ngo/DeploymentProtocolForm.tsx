import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

interface DeploymentProtocolFormProps {
  newCampaign: any;
  setNewCampaign: (campaign: any) => void;
  campaignImage: File | null;
  setCampaignImage: (file: File | null) => void;
  verificationDoc: File | null;
  setVerificationDoc: (file: File | null) => void;
  createCampaignMutation: any;
}

export function DeploymentProtocolForm({
  newCampaign,
  setNewCampaign,
  campaignImage,
  setCampaignImage,
  verificationDoc,
  setVerificationDoc,
  createCampaignMutation
}: DeploymentProtocolFormProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="elite-card p-8">
        <div className="panel-header">
          <p className="panel-subtitle">Deployment Protocol</p>
          <h3 className="panel-title">Initialization Logic</h3>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Campaign Title</label>
            <input
              value={newCampaign.title}
              onChange={e => setNewCampaign({...newCampaign, title: e.target.value})}
              placeholder="Project designation..."
              className="h-12 w-full bg-slate-50/50 border border-border/60 rounded-xl px-4 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Operational Mandate</label>
            <textarea
              value={newCampaign.description}
              onChange={e => setNewCampaign({...newCampaign, description: e.target.value})}
              placeholder="Detailed mission parameters..."
              rows={4}
              className="w-full bg-slate-50/50 border border-border/60 rounded-xl p-4 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Capital Goal (USD)</label>
              <input
                type="number"
                value={newCampaign.goalAmount}
                onChange={e => setNewCampaign({...newCampaign, goalAmount: Number(e.target.value)})}
                placeholder="50000"
                className="h-12 w-full bg-slate-50/50 border border-border/60 rounded-xl px-4 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Registry Category</label>
              <select
                value={newCampaign.category}
                onChange={e => setNewCampaign({...newCampaign, category: e.target.value})}
                className="h-12 w-full bg-slate-50/50 border border-border/60 rounded-xl px-4 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              >
                <option value="">Select Category...</option>
                <option value="Water">Water</option>
                <option value="Education">Education</option>
                <option value="Emergency">Emergency</option>
                <option value="Environment">Environment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Social">Social</option>
              </select>
            </div>
          </div>
        </div>

        <Button
          onClick={() => createCampaignMutation.mutate(newCampaign)}
          disabled={createCampaignMutation.isPending}
          className="w-full mt-8 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-indigo-100/50 hover:bg-primary/95 transition-all text-[13px]"
        >
          {createCampaignMutation.isPending ? "Configuring Node..." : "Register Campaign Entry"}
        </Button>
      </div>

      <div className="elite-card p-8 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/30 border-dashed border-2 border-border/60">
        <div className="w-16 h-16 rounded-2xl bg-white border border-border/40 flex items-center justify-center text-slate-300 shadow-sm overflow-hidden">
          {campaignImage ? (
            <img src={URL.createObjectURL(campaignImage)} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold tracking-tight mb-1">Evidence Objects</h4>
          <p className="text-[12px] font-medium text-slate-400 max-w-[240px] mx-auto leading-relaxed">
            Attach satellite imagery, engineering specs, or regional verification documents.
          </p>
        </div>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={e => setCampaignImage(e.target.files ? e.target.files[0] : null)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Button variant="outline" className="h-10 px-6 rounded-lg border-border/60 hover:bg-white transition-all font-bold text-[11px] uppercase tracking-widest pointer-events-none w-full">
            {campaignImage ? "Change Image" : "Upload Evidence"}
          </Button>
        </div>

        <div className="w-full pt-4 border-t border-border/40">
          <h4 className="text-[11px] font-bold tracking-tight mb-3 text-slate-500 uppercase tracking-widest">Verification Node</h4>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={e => setVerificationDoc(e.target.files ? e.target.files[0] : null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Button variant="outline" className={`h-12 w-full rounded-xl border border-border/60 font-bold text-[12px] transition-all ${verificationDoc ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-white text-slate-400"}`}>
              <FileText className="w-4 h-4 mr-2" />
              {verificationDoc ? verificationDoc.name : "Attach Final Documentation"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
