import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { DollarSign, Activity, AlertTriangle, ShieldCheck, Check, X, Search, FileText, ChevronRight, Gavel, Filter, Zap, Globe, Shield, CheckCircle2, Pause, Play, Trash2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { admin as adminApi, campaigns as campaignsApi, auth, NGO, Campaign, getImageUrl } from "@/lib/api";

const donationTrendData = [
  { name: 'Mon', value: 4200 },
  { name: 'Tue', value: 3800 },
  { name: 'Wed', value: 5200 },
  { name: 'Thu', value: 4900 },
  { name: 'Fri', value: 6500 },
  { name: 'Sat', value: 5800 },
  { name: 'Sun', value: 7200 },
];


export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats(),
    refetchInterval: 10000,
  });

  const { data: ngos = [] } = useQuery({
    queryKey: ['admin-ngos'],
    queryFn: () => adminApi.listNgos(),
  });

  const { data: campaigns = [] } = useQuery({
    queryKey: ['admin-campaigns'],
    queryFn: () => adminApi.listCampaigns(),
  });

  const verifyMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'VERIFIED' | 'REJECTED' }) => adminApi.verifyNgo(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ngos'] });
      alert("NGO registry updated.");
    },
    onError: (e: Error) => alert(e.message)
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'APPROVED' | 'REJECTED' }) => adminApi.approveCampaign(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      alert("Campaign registry updated.");
    },
    onError: (e: Error) => alert(e.message)
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.toggleStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
    },
    onError: (e: Error) => alert(e.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      alert("Campaign purged from registry.");
    },
    onError: (e: Error) => alert(e.message)
  });

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />

      <main className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Executive Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                <Shield className="w-3.5 h-3.5" />
                Administrative Protocol Layer
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
                Oversight Command
              </h1>
            </motion.div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  placeholder="Audit lookup by UID..."
                  className="h-12 w-64 pl-11 pr-4 rounded-xl bg-slate-50 border border-border/60 text-[12px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                />
              </div>
              <Button className="h-12 px-6 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-[13px] shadow-lg shadow-indigo-100/50 transition-all active:scale-95">
                Generate System Audit
              </Button>
            </div>
          </div>

          {/* Stats Intelligence */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatsCard label="Operating Capital" value={`$${((stats?.totalRaised || 0) / 1000).toFixed(1)}K`} change="+14.2%" icon={DollarSign} index={0} />
            <StatsCard label="Verified Network" value={stats?.verifiedNgos?.toLocaleString() || "0"} change="Approved NGOs" icon={ShieldCheck} index={1} />
            <StatsCard label="Live Campaigns" value={stats?.activeCampaigns?.toLocaleString() || "0"} change="Active Entries" icon={Globe} index={2} />
            <StatsCard label="Moderation Queue" value={stats?.pendingCampaigns?.toLocaleString() || "0"} change="Action Required" icon={Activity} index={3} />
          </div>

          <div className="grid lg:grid-cols-12 gap-6 mb-12">
            {/* Real-time Telemetry Section */}
            <div className="lg:col-span-8">
              <div className="elite-card h-full p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="panel-header mb-0">
                    <p className="panel-subtitle">7-Day Transactional Volume</p>
                    <h3 className="panel-title">Capital Velocity</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest">
                    <Activity className="w-3 h-3" /> Live Logic
                  </div>
                </div>

                <div className="h-[340px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={donationTrendData}>
                      <defs>
                        <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.08}/>
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 9, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                        dy={8}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 8px 16px rgba(0,0,0,0.04)', fontWeight: 700, fontSize: '12px' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        fill="url(#velocityGradient)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Audit Trail Section */}
            <div className="lg:col-span-4">
              <div className="elite-card h-full p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="panel-title">System Logs</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-50 transition-colors">
                    <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </div>
                <div className="space-y-6">
                  {[
                    { user: "Admin #04", event: "Approved Verification", target: "GlobalWater", time: "4m ago" },
                    { user: "Protocol", event: "Node Settlement", target: "$4,200", time: "18m ago" },
                    { user: "Moderator", event: "Object Flagged", target: "Project #82", time: "1h ago" },
                    { user: "Admin #02", event: "Registry Updated", target: "SE Asia Node", time: "3h ago" },
                  ].map((log, i) => (
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
                <Button variant="ghost" className="w-full mt-8 h-10 rounded-xl text-[9px] font-bold uppercase tracking-widest border border-border/60 hover:bg-slate-50 transition-all">
                  Full Audit History <ChevronRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="ngos" className="space-y-8">
            <TabsList className="bg-slate-100/40 p-1 rounded-full border border-border/60 inline-flex">
              <TabsTrigger value="ngos" className="rounded-full px-6 py-2 text-[11px] font-bold uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">Organization Verification</TabsTrigger>
              <TabsTrigger value="campaigns" className="rounded-full px-6 py-2 text-[11px] font-bold uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all">Moderation Queue</TabsTrigger>
            </TabsList>

            <TabsContent value="ngos" className="mt-0 outline-none">
              <div className="elite-card overflow-hidden">
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
                                href={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${n.verificationDocUrl}`} 
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
                                  size="sm" variant="outline" className="h-9 w-9 p-0 rounded-lg hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            {n.verificationStatus !== "PENDING" && (
                              <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest text-slate-400 border-border/60">Processed</Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="mt-0 outline-none">
              <div className="grid md:grid-cols-2 gap-6">
                {campaigns.filter(c => c.status === "PENDING").map((c, i) => (
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
                {campaigns.filter(c => c.status === "PENDING").length === 0 && (
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
