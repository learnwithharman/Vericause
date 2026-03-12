import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { DollarSign, Activity, AlertTriangle, ShieldCheck, Check, X } from "lucide-react";

const ngos = [
  { name: "WaterAid Foundation", status: "Verified", docs: 5, date: "Jan 15, 2026" },
  { name: "Bright Future NGO", status: "Pending", docs: 3, date: "Mar 1, 2026" },
  { name: "Green Earth Initiative", status: "Under Review", docs: 4, date: "Feb 20, 2026" },
];

const campaignQueue = [
  { title: "Solar Panels for Schools", ngo: "SunPower Aid", date: "Mar 3, 2026", status: "Pending" },
  { title: "Mental Health Awareness", ngo: "MindCare Foundation", date: "Mar 2, 2026", status: "Pending" },
];

const reports = [
  { campaign: "Reforestation in the Amazon", reporter: "Anonymous", reason: "Unclear fund usage", date: "Mar 4, 2026" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Platform moderation and oversight.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard label="Total Donations" value="$2.4M" change="+22% this quarter" icon={DollarSign} index={0} />
            <StatsCard label="Active Campaigns" value="142" icon={Activity} index={1} />
            <StatsCard label="Verified NGOs" value="89" icon={ShieldCheck} index={2} />
            <StatsCard label="Flagged Reports" value="3" icon={AlertTriangle} index={3} />
          </div>

          <Tabs defaultValue="ngos" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="ngos">NGO Verification</TabsTrigger>
              <TabsTrigger value="campaigns">Campaign Queue</TabsTrigger>
              <TabsTrigger value="reports">Fraud Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="ngos">
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NGO Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ngos.map((n, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{n.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              n.status === "Verified" ? "bg-emerald/10 text-emerald border-0" :
                              n.status === "Pending" ? "bg-amber-500/10 text-amber-600 border-0" :
                              ""
                            }
                          >
                            {n.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{n.docs} files</TableCell>
                        <TableCell className="text-muted-foreground">{n.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="text-emerald hover:bg-emerald/10"><Check className="w-4 h-4" /></Button>
                            <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10"><X className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="campaigns">
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>NGO</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignQueue.map((c, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{c.title}</TableCell>
                        <TableCell className="text-muted-foreground">{c.ngo}</TableCell>
                        <TableCell className="text-muted-foreground">{c.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" className="gradient-primary text-primary-foreground border-0 hover:opacity-90">Approve</Button>
                            <Button size="sm" variant="outline">Reject</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{r.campaign}</TableCell>
                        <TableCell className="text-muted-foreground">{r.reporter}</TableCell>
                        <TableCell className="text-muted-foreground">{r.reason}</TableCell>
                        <TableCell className="text-muted-foreground">{r.date}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Investigate</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
