import { Filter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const systemLogs = [
  { user: "Admin #04", event: "Approved Verification", target: "GlobalWater", time: "4m ago" },
  { user: "Protocol", event: "Node Settlement", target: "$4,200", time: "18m ago" },
  { user: "Moderator", event: "Object Flagged", target: "Project #82", time: "1h ago" },
  { user: "Admin #02", event: "Registry Updated", target: "SE Asia Node", time: "3h ago" },
];

export function AuditTrailLogs() {
  return (
    <div className="elite-card h-full p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="panel-title">System Logs</h3>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </div>
      <div className="space-y-6">
        {systemLogs.map((log, i) => (
          <div key={i} className="flex gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-border/40 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-1 pb-4 border-b border-border/40 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{log.user}</span>
                <span className="text-[9px] font-bold text-muted-foreground/50">{log.time}</span>
              </div>
              <p className="text-[12px] font-bold leading-tight group-hover:text-primary transition-colors">
                {log.event} <span className="text-slate-400 font-medium">for</span> {log.target}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
