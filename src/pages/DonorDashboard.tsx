import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns as staticCampaigns } from "@/data/campaigns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Heart, TrendingUp, Bookmark, Camera, MapPin, ChevronRight, Activity, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { donations as donationsApi, auth } from "@/lib/api";



const impactUpdates = [
  { campaign: "Clean Water Project", date: "4h ago", text: "Infrastructure deployment validated by node #42.", icon: Activity },
  { campaign: "Education Initiative", date: "2d ago", text: "Phase 1 structural audit complete.", icon: MapPin },
];

export default function DonorDashboard() {
  const isLoggedIn = auth.isLoggedIn();
  const { data: myDonations = [], isLoading } = useQuery({
    queryKey: ['my-donations'],
    queryFn: () => donationsApi.myDonations(),
    enabled: isLoggedIn,
    staleTime: 30_000,
  });

  const totalDeployed = myDonations.reduce((sum, d) => sum + d.amount, 0);
  const campaignsSupported = new Set(myDonations.map(d => d.campaign?.title)).size;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />

      <main className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Dashboard Header */}
          <div className="max-w-3xl mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                <Activity className="w-3.5 h-3.5" />
                Capital Allocation Profile
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-4">
                Investor Dashboard
              </h1>
              <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
                Management of your philanthropic commitments and real-time impact telemetry.
              </p>
            </motion.div>
          </div>

          {/* Core Performance Layers */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <StatsCard label="Capital Deployed" value={`$${totalDeployed.toLocaleString()}`} change="+12.4%" icon={DollarSign} index={0} />
            <StatsCard label="Entities Supported" value={campaignsSupported.toString().padStart(2, '0')} icon={Heart} index={1} />
            <StatsCard label="Impact Fidelity" value="98.2%" change="Optimal" icon={TrendingUp} index={2} />
            <StatsCard label="Watchlist Units" value="03" icon={Bookmark} index={3} />
          </div>

          {/* Interaction matrix */}
          <Tabs defaultValue="history" className="space-y-12">
            <div className="flex items-center justify-between border-b border-border/40 pb-1">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger value="history" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Commitment History</TabsTrigger>
                <TabsTrigger value="impact" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Impact Telemetry</TabsTrigger>
                <TabsTrigger value="saved" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Registry Watchlist</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="history" className="mt-0 outline-none">
              <div className="elite-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-border/60">
                      <TableHead className="py-5 pl-8 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Campaign Registry</TableHead>
                      <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Amount (USD)</TableHead>
                      <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Date Logged</TableHead>
                      <TableHead className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-right pr-8">Verification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myDonations.map((d, i) => (
                      <TableRow key={i} className="group hover:bg-slate-50/20 border-border/40">
                        <TableCell className="py-6 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-primary italic border border-border/60 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                              {d.campaign?.title?.charAt(0) ?? '?'}
                            </div>
                            <span className="font-bold text-[15px] tracking-tight group-hover:text-primary transition-colors">{d.campaign?.title ?? 'Unknown Campaign'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-display font-bold text-[15px] tracking-tight">${d.amount.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-[13px] font-medium text-slate-500">{new Date(d.createdAt).toLocaleDateString()}</span>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <Badge className={d.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full" : "bg-slate-50 text-slate-400 border border-border/60 font-bold text-[8px] uppercase tracking-widest px-2.5 py-0.5 rounded-full"}>
                            {d.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="mt-0 outline-none">
              <div className="grid md:grid-cols-2 gap-6">
                {impactUpdates.map((u, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="elite-card p-6 group cursor-pointer"
                  >
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-border/60 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                        <u.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-primary">{u.campaign}</p>
                          <span className="text-[9px] font-bold text-slate-400">{u.date}</span>
                        </div>
                        <p className="font-bold text-[15px] leading-tight tracking-tight mb-3">{u.text}</p>
                        <button className="text-[8px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-slate-400 group-hover:text-primary transition-colors">
                          EXPLORE DOCUMENTATION <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-0 outline-none">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                {staticCampaigns.slice(0, 3).map((c, i) => (
                  <CampaignCard key={c.id} campaign={c} index={i} />
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
