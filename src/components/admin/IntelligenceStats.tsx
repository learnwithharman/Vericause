import { StatsCard } from "@/components/StatsCard";
import { DollarSign, ShieldCheck, Globe, Activity } from "lucide-react";

interface IntelligenceStatsProps {
  stats: any;
}

export function IntelligenceStats({ stats }: IntelligenceStatsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      <StatsCard label="Operating Capital" value={`$${((stats?.totalRaised || 0) / 1000).toFixed(1)}K`} change="+14.2%" icon={DollarSign} index={0} />
      <StatsCard label="Verified Network" value={stats?.verifiedNgos?.toLocaleString() || "0"} change="Approved NGOs" icon={ShieldCheck} index={1} />
      <StatsCard label="Live Campaigns" value={stats?.activeCampaigns?.toLocaleString() || "0"} change="Active Entries" icon={Globe} index={2} />
      <StatsCard label="Moderation Queue" value={stats?.pendingCampaigns?.toLocaleString() || "0"} change="Action Required" icon={Activity} index={3} />
    </div>
  );
}
