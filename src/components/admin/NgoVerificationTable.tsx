import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import { getImageUrl, NGO } from "@/lib/api";

interface NgoVerificationTableProps {
  ngos: NGO[];
  verifyMutation: any;
}

export function NgoVerificationTable({ ngos, verifyMutation }: NgoVerificationTableProps) {
  return (
    <div className="elite-card overflow-hidden">
      <div className="p-8 border-b border-border/40">
        <h3 className="panel-title mb-1">Entity Verification</h3>
        <p className="panel-subtitle">Onboarding queue for institutional partners</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-border/60">
            <TableHead className="py-5 pl-8 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Organization Registry</TableHead>
            <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Status Core</TableHead>
            <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center">Nodes</TableHead>
            <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-right pr-8">Administrative Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ngos.map((n) => (
            <TableRow key={n.id} className="group hover:bg-slate-50/20 border-border/40">
              <TableCell className="py-6 pl-8">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-primary italic border border-border/60 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {n.organizationName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[15px] tracking-tight mb-0.5">{n.organizationName}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{n.user.email}</span>
                      <div className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{n.contactInfo || "No Contact Provided"}</span>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Badge
                    className={
                      n.verificationStatus === "VERIFIED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" :
                      n.verificationStatus === "REJECTED" ? "bg-red-50 text-red-600 border border-red-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" :
                      "bg-amber-50 text-amber-600 border border-amber-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                    }
                  >
                    {n.verificationStatus}
                  </Badge>
                  {n.verificationDocUrl && (
                    <a 
                      href={getImageUrl(n.verificationDocUrl)} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-all border border-border/40"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="inline-flex flex-col">
                  <span className="text-lg font-display font-bold text-foreground tracking-tight">{n._count.campaigns}</span>
                  <span className="text-[7.5px] font-bold uppercase tracking-widest text-muted-foreground">Campaigns</span>
                </div>
              </TableCell>
              <TableCell className="text-right pr-8">
                <div className="flex gap-2 justify-end opacity-40 group-hover:opacity-100 transition-all duration-300">
                  {n.verificationStatus === "PENDING" && (
                    <>
                      <Button
                        onClick={() => verifyMutation.mutate({ id: n.id, status: 'VERIFIED' })}
                        size="sm" className="h-9 px-4 bg-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => verifyMutation.mutate({ id: n.id, status: 'REJECTED' })}
                        variant="outline" size="sm" className="h-9 w-9 p-0 border-red-100 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition-all active:scale-95"
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
