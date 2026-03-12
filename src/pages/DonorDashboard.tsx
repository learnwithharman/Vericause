import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns } from "@/data/campaigns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { DollarSign, Heart, TrendingUp, Bookmark, Camera, MapPin } from "lucide-react";

const donations = [
  { campaign: "Clean Water for Rural Communities", amount: 150, date: "Mar 1, 2026", status: "Completed" },
  { campaign: "Education for Every Child", amount: 75, date: "Feb 15, 2026", status: "Completed" },
  { campaign: "Disaster Relief – Earthquake", amount: 200, date: "Feb 1, 2026", status: "Completed" },
  { campaign: "Healthcare Access in Rural Africa", amount: 100, date: "Jan 20, 2026", status: "Processing" },
];

const impactFeed = [
  { campaign: "Clean Water", date: "Mar 3, 2026", text: "Water pump now serving 200+ families!", icon: Camera },
  { campaign: "Education for Every Child", date: "Feb 28, 2026", text: "New classroom construction complete.", icon: MapPin },
];

export default function DonorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold">Donor Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your donations and impact.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard label="Total Donated" value="$525" change="+12% this month" icon={DollarSign} index={0} />
            <StatsCard label="Campaigns Supported" value="4" icon={Heart} index={1} />
            <StatsCard label="Impact Score" value="92" change="Top 5% donor" icon={TrendingUp} index={2} />
            <StatsCard label="Saved Campaigns" value="3" icon={Bookmark} index={3} />
          </div>

          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="history">Donation History</TabsTrigger>
              <TabsTrigger value="impact">Impact Feed</TabsTrigger>
              <TabsTrigger value="saved">Saved Campaigns</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((d, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{d.campaign}</TableCell>
                        <TableCell>${d.amount}</TableCell>
                        <TableCell className="text-muted-foreground">{d.date}</TableCell>
                        <TableCell>
                          <Badge variant={d.status === "Completed" ? "default" : "secondary"} className={d.status === "Completed" ? "bg-emerald/10 text-emerald border-0" : ""}>
                            {d.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4">
              {impactFeed.map((u, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover-lift">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <u.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{u.campaign} · {u.date}</p>
                    <p className="font-medium text-sm mt-0.5">{u.text}</p>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="saved">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.slice(0, 3).map((c, i) => (
                  <CampaignCard key={c.id} campaign={c} index={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
