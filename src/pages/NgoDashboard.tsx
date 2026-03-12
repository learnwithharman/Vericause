import { Navbar } from "@/components/Navbar";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { BarChart3, Users, FileText, PlusCircle, Upload, Eye } from "lucide-react";

const ngoCampaigns = [
  { title: "Clean Water for Rural Communities", raised: 45200, goal: 60000, donors: 312, status: "Active" },
  { title: "Sanitation Improvement Project", raised: 8300, goal: 25000, donors: 45, status: "Draft" },
];

export default function NgoDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">NGO Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage campaigns and post impact updates.</p>
            </div>
            <Button className="gradient-primary text-primary-foreground border-0 hover:opacity-90">
              <PlusCircle className="w-4 h-4 mr-2" /> New Campaign
            </Button>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <StatsCard label="Total Raised" value="$53,500" change="+18% this month" icon={BarChart3} index={0} />
            <StatsCard label="Total Donors" value="357" icon={Users} index={1} />
            <StatsCard label="Impact Updates" value="12" icon={FileText} index={2} />
          </div>

          <Tabs defaultValue="campaigns" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="create">Create Campaign</TabsTrigger>
              <TabsTrigger value="updates">Post Update</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns">
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Donors</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ngoCampaigns.map((c, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{c.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Progress value={Math.round((c.raised / c.goal) * 100)} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground">{Math.round((c.raised / c.goal) * 100)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{c.donors}</TableCell>
                        <TableCell>
                          <Badge variant={c.status === "Active" ? "default" : "secondary"} className={c.status === "Active" ? "bg-emerald/10 text-emerald border-0" : ""}>
                            {c.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="create">
              <div className="max-w-2xl rounded-xl bg-card border border-border p-6 space-y-5">
                <h3 className="font-semibold text-lg">Create New Campaign</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Campaign Title</label>
                    <Input placeholder="e.g., Clean Water for Village X" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Description</label>
                    <Textarea placeholder="Describe the campaign goals and impact..." rows={4} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Fundraising Goal ($)</label>
                      <Input type="number" placeholder="50000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Category</label>
                      <Input placeholder="e.g., Water, Education" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Campaign Images</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    </div>
                  </div>
                  <Button className="gradient-primary text-primary-foreground border-0 hover:opacity-90">Create Campaign</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="updates">
              <div className="max-w-2xl rounded-xl bg-card border border-border p-6 space-y-5">
                <h3 className="font-semibold text-lg">Post Impact Update</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Update Title</label>
                    <Input placeholder="e.g., Phase 1 Complete!" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Description</label>
                    <Textarea placeholder="Share what was accomplished..." rows={4} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Attach Files</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Photos, expense reports, field updates</p>
                    </div>
                  </div>
                  <Button className="gradient-primary text-primary-foreground border-0 hover:opacity-90">Publish Update</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
