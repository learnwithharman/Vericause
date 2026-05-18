import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Play, Pause, Trash2 } from "lucide-react";
import { getImageUrl, Campaign } from "@/lib/api";

interface ActiveMatrixTableProps {
  campaigns: Campaign[];
  toggleStatusMutation: any;
  deleteMutation: any;
}

export function ActiveMatrixTable({ campaigns, toggleStatusMutation, deleteMutation }: ActiveMatrixTableProps) {
  return (
    <div className="elite-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-border/60">
            <TableHead className="py-5 pl-8 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Registry Entry</TableHead>
            <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Allocation Flow</TableHead>
            <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Entity Nodes</TableHead>
            <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-right pr-8">Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((c) => (
            <TableRow key={c.id} className="group hover:bg-slate-50/20 border-border/40">
              <TableCell className="py-6 pl-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center border border-border/60 group-hover:bg-primary/5 transition-all duration-300 overflow-hidden shrink-0">
                      {c.imageUrl ? (
                        <img src={getImageUrl(c.imageUrl)} alt={c.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-primary italic">{c.title.charAt(0)}</span>
                      )}
                  </div>
                  <span className="font-bold text-[14px] tracking-tight group-hover:text-primary transition-colors line-clamp-1">{c.title}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1.5 min-w-[200px]">
                  <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    <span>{Math.round((c.raisedAmount / c.goalAmount) * 100)}% Funded</span>
                    <span>Target: ${c.goalAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-border/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((c.raisedAmount / c.goalAmount) * 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-[13px] font-bold text-slate-600">{c._count?.donations ?? 0}</span>
                </div>
              </TableCell>
              <TableCell className="text-right pr-8">
                <div className="flex items-center justify-end gap-3">
                  <Badge className={
                    c.status === "APPROVED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" : 
                    c.status === "PAUSED" ? "bg-amber-50 text-amber-600 border border-amber-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" :
                    c.status === "PENDING" ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" :
                    "bg-slate-50 text-slate-400 border border-border/60 font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                  }>
                    {c.status === "PENDING" ? "REVIEW REQUIRED" : c.status}
                  </Badge>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <Button
                      onClick={() => toggleStatusMutation.mutate(c.id)}
                      variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors"
                    >
                      {c.status === "PAUSED" ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </Button>
                    <Button
                      onClick={() => {
                        if (confirm("Are you sure you want to permanently delete this campaign node?")) {
                          deleteMutation.mutate(c.id);
                        }
                      }}
                      variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
