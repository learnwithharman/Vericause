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
import { BarChart3, Users, FileText, PlusCircle, Upload, Eye, Activity, Terminal, Shield, ArrowUpRight, Zap, Pause, Play, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaigns as campaignsApi, auth } from "@/lib/api";
import { useState } from "react";

const currentUser = auth.currentUser();

export default function NgoDashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("campaigns");

  // Campaign Form State
  const [newCampaign, setNewCampaign] = useState({ title: "", description: "", goalAmount: 0, category: "" });
  const [campaignImage, setCampaignImage] = useState<File | null>(null);

  // Update Form State
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [updateData, setUpdateData] = useState({ title: "", description: "" });

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['ngo-campaigns'],
    queryFn: () => campaignsApi.list({ status: "ALL" }), // Fetch ALL statuses (Pending, Approved, Paused) for this NGO
    enabled: auth.isLoggedIn(),
  });

  const createCampaignMutation = useMutation({
    mutationFn: (data: typeof newCampaign) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("goalAmount", data.goalAmount.toString());
      formData.append("category", data.category);
      if (campaignImage) {
        formData.append("image", campaignImage);
      }
      return campaignsApi.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngo-campaigns'] });
      alert("Campaign initialized successfully!");
      setNewCampaign({ title: "", description: "", goalAmount: 0, category: "" });
      setCampaignImage(null);
      setActiveTab("campaigns");
    },
    onError: (e: Error) => alert(e.message)
  });

  const addUpdateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: typeof updateData }) => campaignsApi.addUpdate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngo-campaigns'] });
      alert("Impact update broadcasted!");
      setUpdateData({ title: "", description: "" });
      setSelectedCampaignId("");
    },
    onError: (e: Error) => alert(e.message)
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.toggleStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngo-campaigns'] });
    },
    onError: (e: Error) => alert(e.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngo-campaigns'] });
      alert("Campaign removed from registry.");
    },
    onError: (e: Error) => alert(e.message)
  });

  const totalInflow = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + (c._count?.donations ?? 0), 0);
  const totalUpdates = campaigns.reduce((sum, c) => sum + (c.impactUpdates?.length ?? 0), 0);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />

      <main className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Partner Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                <Shield className="w-3.5 h-3.5" />
                Entity Operational Layer
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
                Partner Command
              </h1>
              <p className="text-[15px] font-medium text-slate-500 mt-3 max-w-xl leading-relaxed">
                Management of your philanthropic registry entries and verifiable impact documentation.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setActiveTab("create")}
                className="h-12 px-6 bg-primary hover:bg-primary/95 text-white rounded-xl font-bold text-[13px] shadow-lg shadow-indigo-100/50 transition-all active:scale-95"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Initialize Campaign
              </Button>
              <Button
                onClick={() => {
                  setNewCampaign({
                    title: "[URGENT] Emergency Rescue",
                    description: "CRITICAL: Response required for immediate incident. Operational parameters at maximum priority.",
                    goalAmount: 100000,
                    category: "Emergency"
                  });
                  setActiveTab("create");
                }}
                variant="outline"
                className="h-12 px-6 border-red-100 bg-red-50/50 text-red-600 hover:bg-red-50 rounded-xl font-bold text-[13px] transition-all active:scale-95"
              >
                <Zap className="w-4 h-4 mr-2" /> Emergency Protocol
              </Button>
            </div>
          </div>

          {/* Operational Metrics */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <StatsCard label="Capital Inflow" value={`$${totalInflow.toLocaleString()}`} change="+18.4%" icon={BarChart3} index={0} />
            <StatsCard label="Verified Network" value={totalDonors.toString()} icon={Users} index={1} />
            <StatsCard label="Impact Objects" value={totalUpdates.toString()} change="Verifiable" icon={FileText} index={2} />
          </div>

          {/* Interaction Matrix */}
          <Tabs defaultValue="campaigns" value={activeTab} onValueChange={setActiveTab} className="space-y-12">
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
                            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-primary italic border border-border/60 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                              {c.title.charAt(0)}
                            </div>
                            <span className="font-bold text-[15px] tracking-tight group-hover:text-primary transition-colors">{c.title}</span>
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
                              c.status === "ACTIVE" || c.status === "APPROVED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" : 
                              c.status === "PAUSED" ? "bg-amber-50 text-amber-600 border border-amber-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" :
                              "bg-slate-50 text-slate-400 border border-border/60 font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                            }>
                              {c.status}
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
            </TabsContent>

            <TabsContent value="create" className="mt-0 outline-none">
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
                    <Button variant="outline" className="h-10 px-6 rounded-lg border-border/60 hover:bg-white transition-all font-bold text-[11px] uppercase tracking-widest pointer-events-none">
                      {campaignImage ? "Change Image" : "Upload Evidence"}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="updates" className="mt-0 outline-none">
              <div className="max-w-2xl elite-card p-8">
                <div className="panel-header">
                  <p className="panel-subtitle">Telemetry Injection</p>
                  <h3 className="panel-title">Impact Broadcast</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Target Campaign</label>
                    <select
                      value={selectedCampaignId}
                      onChange={e => setSelectedCampaignId(e.target.value)}
                      className="h-12 w-full bg-slate-50/50 border border-border/60 rounded-xl px-4 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    >
                      <option value="">Select a registry entry...</option>
                      {campaigns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Update Vector</label>
                    <input
                      value={updateData.title}
                      onChange={e => setUpdateData({...updateData, title: e.target.value})}
                      placeholder="e.g. Infrastructure Deployment Phase 2"
                      className="h-12 w-full bg-slate-50/50 border border-border/60 rounded-xl px-4 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Status Narrative</label>
                    <textarea
                      value={updateData.description}
                      onChange={e => setUpdateData({...updateData, description: e.target.value})}
                      placeholder="Input field telemetry..."
                      rows={5}
                      className="w-full bg-slate-50/50 border border-border/60 rounded-xl p-4 text-[13px] font-semibold focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                    />
                  </div>

                  <Button
                    onClick={() => addUpdateMutation.mutate({ id: selectedCampaignId, data: updateData })}
                    disabled={addUpdateMutation.isPending || !selectedCampaignId}
                    className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 transition-all text-[13px]"
                  >
                    {addUpdateMutation.isPending ? "Broadcasting..." : "Inject Telemetry Node"}
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
