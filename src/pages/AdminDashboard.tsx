import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { DollarSign, Activity, AlertTriangle, ShieldCheck, Check, X, Search, FileText, ChevronRight, Gavel, Filter, Zap, Globe, Shield, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const donationTrendData = [
  { name: 'Mon', value: 4200 },
  { name: 'Tue', value: 3800 },
  { name: 'Wed', value: 5200 },
  { name: 'Thu', value: 4900 },
  { name: 'Fri', value: 6500 },
  { name: 'Sat', value: 5800 },
  { name: 'Sun', value: 7200 },
];

const ngos = [
  { name: "Global Water Initiative", status: "Verified", docs: 12, date: "Jan 15, 2026", trustScore: 98, region: "East Africa" },
  { name: "Solar Horizon Trust", status: "Pending", docs: 8, date: "Mar 01, 2026", trustScore: 0, region: "SE Asia" },
  { name: "EcoSanctuary NGO", status: "Review", docs: 4, date: "Feb 20, 2026", trustScore: 84, region: "Europe" },
];

const campaignQueue = [
  { title: "Grid-Scale Solar Array", ngo: "Solar Horizon", date: "Mar 03, 2026", category: "Energy", priority: "High" },
  { title: "Emergency Medical Logistics", ngo: "HealthFirst", date: "Mar 02, 2026", category: "Health", priority: "Critical" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Executive Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                <Shield className="w-4 h-4" /> 
                Administrative Protocol Layer
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-foreground leading-[1.1]">
                Oversight Command
              </h1>
            </motion.div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  placeholder="Audit lookup by UID..." 
                  className="h-14 w-72 pl-12 pr-6 rounded-2xl bg-slate-50 border border-border/40 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                />
              </div>
              <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:shadow-2xl transition-all active:scale-95">
                Generate System Audit
              </Button>
            </div>
          </div>

          {/* Stats Intelligence */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatsCard label="Operating Capital" value="$42.8M" change="+14.2%" icon={DollarSign} index={0} />
            <StatsCard label="Network Nodes" value="2,104" change="Stable" icon={Globe} index={1} />
            <StatsCard label="Verification Rate" value="99.4%" change="Target met" icon={ShieldCheck} index={2} />
            <StatsCard label="Anomalies Detected" value="0" change="Last 24h" icon={AlertTriangle} index={3} />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            {/* Real-time Telemetry Section */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="elite-card flex-1 p-10 flex flex-col">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1">Capital Velocity</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">7-Day Transactional Volume</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">
                    <Activity className="w-3.5 h-3.5" /> Live Logic
                  </div>
                </div>
                
                <div className="h-[400px] w-full mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={donationTrendData}>
                      <defs>
                        <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(226 100% 50%)" stopOpacity={0.1}/>
                          <stop offset="100%" stopColor="hsl(226 100% 50%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontWeight: 700 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(226 100% 50%)" 
                        strokeWidth={4} 
                        fill="url(#velocityGradient)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Audit Trail Section */}
            <div className="lg:col-span-4">
              <div className="elite-card h-full p-10">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold tracking-tight">System Logs</h3>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-slate-50 transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="space-y-8">
                  {[
                    { user: "Admin #04", event: "Approved Verification", target: "GlobalWater", time: "4m ago" },
                    { user: "Protocol", event: "Node Settlement", target: "$4,200", time: "18m ago" },
                    { user: "Moderator", event: "Object Flagged", target: "Project #82", time: "1h ago" },
                    { user: "Admin #02", event: "Registry Updated", target: "SE Asia Node", time: "3h ago" },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-5 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-border/40 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 pb-6 border-b border-border/40 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{log.user}</span>
                          <span className="text-[9px] font-bold text-muted-foreground/50">{log.time}</span>
                        </div>
                        <p className="text-[13px] font-bold leading-tight group-hover:text-primary transition-colors">
                          {log.event} <span className="text-slate-400 font-medium">for</span> {log.target}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-10 h-12 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] border border-border/40 hover:bg-slate-50">
                  Full Audit History <ChevronRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="ngos" className="space-y-12">
            <TabsList className="bg-slate-100/50 p-1.5 rounded-full border border-border/40 inline-flex">
              <TabsTrigger value="ngos" className="rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-[0.1em] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all">Organization Verification</TabsTrigger>
              <TabsTrigger value="campaigns" className="rounded-full px-8 py-2.5 text-xs font-bold uppercase tracking-[0.1em] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all">Moderation Queue</TabsTrigger>
            </TabsList>

            <TabsContent value="ngos" className="mt-0 outline-none">
              <div className="elite-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-none">
                      <TableHead className="py-6 pl-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Organization Registry</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Status Core</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-center">Fidelity Score</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right pr-10">Administrative Control</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ngos.map((n, i) => (
                      <TableRow key={i} className="group hover:bg-slate-50/30 border-border/40">
                        <TableCell className="py-8 pl-10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-primary italic border border-border/40 group-hover:bg-primary group-hover:text-white transition-all duration-500">{n.name.charAt(0)}</div>
                            <div>
                              <p className="font-bold text-lg tracking-tight mb-0.5">{n.name}</p>
                              <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-500">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{n.region}</span>
                                <div className="w-1 h-1 rounded-full bg-border" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Joined {n.date}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              n.status === "Verified" ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full" :
                              "bg-amber-50 text-amber-600 border border-amber-100 shadow-none font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full"
                            }
                          >
                            {n.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                           <div className="inline-flex flex-col">
                             <span className="text-xl font-display font-bold text-foreground tracking-tight">{n.trustScore > 0 ? n.trustScore : '--'}</span>
                             <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Score Index</span>
                           </div>
                        </TableCell>
                        <TableCell className="text-right pr-10">
                          <div className="flex gap-2 justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" className="h-10 px-6 bg-primary text-white rounded-xl font-bold text-[11px] uppercase tracking-widest">Perform Audit</Button>
                            <Button size="sm" variant="outline" className="h-10 w-10 p-0 rounded-xl hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-all"><X className="w-5 h-5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="mt-0 outline-none">
               <div className="grid md:grid-cols-2 gap-8">
                 {campaignQueue.map((c, i) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="elite-card p-10 group"
                   >
                      <div className="flex justify-between items-start mb-10">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[9px] tracking-widest uppercase px-3 rounded-full">{c.category}</Badge>
                            <Badge className={`${c.priority === "Critical" ? "bg-red-50 text-red-500 border border-red-100" : "bg-primary/5 text-primary border border-primary/10"} font-bold text-[9px] tracking-widest uppercase px-3 rounded-full`}>{c.priority} Priority</Badge>
                          </div>
                          <h4 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{c.title}</h4>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-border/40 flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl overflow-hidden italic">
                          {c.ngo.charAt(0)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-12">
                        <div className="bg-slate-50/50 p-5 rounded-2xl border border-border/40">
                           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Entity</p>
                           <p className="font-bold tracking-tight mb-2">{c.ngo}</p>
                           <div className="flex items-center gap-1.5 text-emerald-500">
                             <CheckCircle2 className="w-3 h-3" />
                             <span className="text-[9px] font-bold uppercase tracking-widest">KYC Clear</span>
                           </div>
                        </div>
                        <div className="bg-slate-50/50 p-5 rounded-2xl border border-border/40">
                           <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Impact Target</p>
                           <p className="font-bold tracking-tight mb-2">Institutional</p>
                           <div className="text-[9px] font-bold uppercase tracking-widest text-primary">Verifiable Node</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button className="flex-1 h-14 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:shadow-2xl transition-all">Approve Deployment</Button>
                        <Button variant="outline" className="flex-1 h-14 font-bold rounded-2xl border-border/60 hover:bg-slate-50 transition-all">Quarantine Object</Button>
                      </div>
                   </motion.div>
                 ))}
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
