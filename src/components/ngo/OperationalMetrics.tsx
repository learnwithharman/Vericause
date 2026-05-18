import { StatsCard } from "@/components/StatsCard";
import { BarChart3, Users, FileText } from "lucide-react";

interface OperationalMetricsProps {
  totalInflow: number;
  totalDonors: number;
  totalUpdates: number;
}

export function OperationalMetrics({ totalInflow, totalDonors, totalUpdates }: OperationalMetricsProps) {
  return (
    <div className="grid sm:grid-cols-3 gap-4 mb-12">
      <StatsCard label="Capital Inflow" value={`$${totalInflow.toLocaleString()}`} change="+18.4%" icon={BarChart3} index={0} />
      <StatsCard label="Verified Network" value={totalDonors.toString()} icon={Users} index={1} />
      <StatsCard label="Impact Objects" value={totalUpdates.toString()} change="Verifiable" icon={FileText} index={2} />
    </div>
  );
}
