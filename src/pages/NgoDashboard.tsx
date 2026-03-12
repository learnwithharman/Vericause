import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Users, FileText, PlusCircle, Upload, Eye, Activity, Terminal, Shield, ArrowUpRight } from "lucide-react";

const ngoCampaigns = [
  { title: "Clean Water for Rural Communities", raised: 45200, goal: 60000, donors: 312, status: "Active" },
  { title: "Sanitation Improvement Project", raised: 8300, goal: 25000, donors: 45, status: "Draft" },
];

export default function NgoDashboard() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Partner Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                <Shield className="w-4 h-4" /> 
                Entity Operational Layer
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-foreground leading-[1.1]">
                Partner Command
              </h1>
              <p className="text-xl font-medium text-slate-500 mt-4 max-w-xl leading-relaxed">
                Management of your philanthropic registry entries and verifiable impact documentation.
              </p>
            </motion.div>
            
            <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:shadow-2xl transition-all active:scale-95">
              <PlusCircle className="w-5 h-5 mr-3" /> Initialize Campaign
            </Button>
          </div>

          {/* Operational Metrics */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            <StatsCard label="Capital Inflow" value="$53,500" change="+18.4%" icon={BarChart3} index={0} />
            <StatsCard label="Verified Network" value="357" icon={Users} index={1} />
            <StatsCard label="Impact Objects" value="12" change="Verifiable" icon={FileText} index={2} />
          </div>

          {/* Interaction Matrix */}
          <Tabs defaultValue="campaigns" className="space-y-12">
            <div className="flex items-center justify-between border-b border-border/40 pb-1">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger value="campaigns" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Active Matrix</TabsTrigger>
                <TabsTrigger value="create" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Deployment Protocol</TabsTrigger>
                <TabsTrigger value="updates" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Impact Telemetry</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="campaigns" className="mt-0 outline-none">
              <div className="elite-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-none">
                      <TableHead className="py-6 pl-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Registry Entry</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Allocation Flow</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Entity Nodes</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right pr-10">Control</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ngoCampaigns.map((c, i) => (
                      <TableRow key={i} className="group hover:bg-slate-50/30 border-border/40">
                        <TableCell className="py-8 pl-10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-primary italic border border-border/40 group-hover:bg-primary group-hover:text-white transition-all duration-500">{c.title.charAt(0)}</div>
                            <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">{c.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2 min-w-[200px]">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              <span>{Math.round((c.raised / c.goal) * 100)}% Funded</span>
                              <span>Target: ${c.goal.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.round((c.raised / c.goal) * 100)}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-300" />
                            <span className="text-sm font-bold text-slate-600">{c.donors}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-10">
                          <div className="flex items-center justify-end gap-3">
                            <Badge className={c.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full" : "bg-slate-100 text-slate-500 border border-border/40 font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full"}>
                              {c.status}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100 transition-all">
                              <ArrowUpRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-0 outline-none">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="elite-card p-10 space-y-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">Initialization Protocol</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Campaign Title</label>
                      <input 
                        placeholder="Project designation..." 
                        className="h-14 w-full bg-slate-50 border border-border/20 rounded-2xl px-6 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Operational Mandate</label>
                      <textarea 
                        placeholder="Detailed mission parameters..." 
                        rows={4}
                        className="w-full bg-slate-50 border border-border/20 rounded-2xl p-6 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Capital Goal (USD)</label>
                        <input 
                          type="number" 
                          placeholder="50000" 
                          className="h-14 w-full bg-slate-50 border border-border/20 rounded-2xl px-6 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Registry Category</label>
                        <input 
                          placeholder="e.g. INFRASTRUCTURE" 
                          className="h-14 w-full bg-slate-50 border border-border/20 rounded-2xl px-6 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full h-16 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:shadow-2xl transition-all">
                    Register Campaign Node
                  </Button>
                </div>
                
                <div className="elite-card p-10 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50 border-dashed border-2">
                  <div className="w-20 h-20 rounded-full bg-white border border-border/40 flex items-center justify-center text-slate-300 shadow-sm mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold tracking-tight mb-2">Evidence Objects</h4>
                    <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto">
                      Attach satellite imagery, engineering specs, or regional verification documents.
                    </p>
                  </div>
                  <Button variant="outline" className="h-12 px-6 rounded-xl border-border/60 hover:bg-white transition-all">
                    Browse File Registry
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="updates" className="mt-0 outline-none">
               <div className="max-w-2xl elite-card p-10 space-y-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Telemetry Injection</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Update Vector</label>
                    <input 
                      placeholder="e.g. Infrastructure Deployment Phase 2" 
                      className="h-14 w-full bg-slate-50 border border-border/20 rounded-2xl px-6 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Status Narrative</label>
                    <textarea 
                      placeholder="Input field telemetry..." 
                      rows={5}
                      className="w-full bg-slate-50 border border-border/20 rounded-2xl p-6 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                    />
                  </div>
                  <div className="p-8 rounded-2xl border-2 border-dashed border-border/40 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/20 transition-colors">
                    <Upload className="w-6 h-6 text-slate-300 mb-2 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Attach Verifiable Evidence</span>
                  </div>
                  
                  <Button className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-100 transition-all">
                    Broadcast Update Node
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
