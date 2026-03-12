import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/StatsCard";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns } from "@/data/campaigns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Heart, TrendingUp, Bookmark, Camera, MapPin, ChevronRight, Activity, ArrowUpRight } from "lucide-react";

const donations = [
  { campaign: "Clean Water for Rural Communities", amount: 1500, date: "Mar 01, 2026", status: "Verified" },
  { campaign: "Education for Every Child", amount: 750, date: "Feb 15, 2026", status: "Verified" },
  { campaign: "Disaster Relief – Earthquake", amount: 2000, date: "Feb 01, 2026", status: "Verified" },
  { campaign: "Healthcare Access in Rural Africa", amount: 1000, date: "Jan 20, 2026", status: "Processing" },
];

const impactUpdates = [
  { campaign: "Clean Water Project", date: "4h ago", text: "Infrastructure deployment validated by node #42.", icon: Activity },
  { campaign: "Education Initiative", date: "2d ago", text: "Phase 1 structural audit complete.", icon: MapPin },
];

export default function DonorDashboard() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Dashboard Header */}
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                <Activity className="w-4 h-4" /> 
                Capital Allocation Profile
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter text-foreground mb-6">
                Investor Dashboard
              </h1>
              <p className="text-xl font-medium text-slate-500 max-w-xl leading-relaxed">
                Management of your philanthropic commitments and real-time impact telemetry.
              </p>
            </motion.div>
          </div>

          {/* Core Performance Layers */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatsCard label="Capital Deployed" value="$5,250" change="+12.4%" icon={DollarSign} index={0} />
            <StatsCard label="Entities Supported" value="04" icon={Heart} index={1} />
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
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-none">
                      <TableHead className="py-6 pl-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Campaign Registry</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Amount (USD)</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Date Logged</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right pr-10">Verification</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((d, i) => (
                      <TableRow key={i} className="group hover:bg-slate-50/30 border-border/40">
                        <TableCell className="py-8 pl-10">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-primary italic border border-border/40 group-hover:bg-primary group-hover:text-white transition-all duration-500">{d.campaign.charAt(0)}</div>
                            <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">{d.campaign}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-display font-bold text-lg tracking-tight">${d.amount.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-slate-500">{d.date}</span>
                        </TableCell>
                        <TableCell className="text-right pr-10">
                          <Badge className={d.status === "Verified" ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-none font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full" : "bg-slate-100 text-slate-500 border border-border/40 font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full"}>
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
              <div className="grid md:grid-cols-2 gap-8">
                {impactUpdates.map((u, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.1 }} 
                    className="elite-card p-8 group cursor-pointer"
                  >
                    <div className="flex gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-border/40 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <u.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{u.campaign}</p>
                          <span className="text-[10px] font-bold text-slate-400">{u.date}</span>
                        </div>
                        <p className="font-bold text-lg leading-snug tracking-tight mb-4">{u.text}</p>
                        <button className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 text-slate-400 group-hover:text-primary transition-colors">
                          EXPLORE DOCUMENTATION <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="mt-0 outline-none">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 font-sans">
                {campaigns.slice(0, 3).map((c, i) => (
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
