import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { campaigns } from "@/data/campaigns";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Clock, Heart, Star, AlertTriangle, Camera, FileText, MapPin } from "lucide-react";

const impactUpdates = [
  { date: "Feb 28, 2026", title: "Water pump installed in village A", type: "photo", icon: Camera, desc: "Successfully installed the first water pump serving 200+ families." },
  { date: "Feb 15, 2026", title: "Expense report – Phase 1", type: "report", icon: FileText, desc: "Detailed breakdown of $15,000 spent on materials and labor." },
  { date: "Jan 30, 2026", title: "Field team deployed", type: "update", icon: MapPin, desc: "Our team of 12 engineers arrived at the project site." },
];

const fundAllocation = [
  { label: "Materials", pct: 40, color: "bg-primary" },
  { label: "Labor", pct: 25, color: "bg-emerald" },
  { label: "Transport", pct: 15, color: "bg-sky" },
  { label: "Admin", pct: 10, color: "bg-muted-foreground/40" },
  { label: "Reserve", pct: 10, color: "bg-indigo-light" },
];

export default function CampaignDetail() {
  const { id } = useParams();
  const campaign = campaigns.find(c => c.id === id) || campaigns[0];
  const pct = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                <div className="rounded-xl overflow-hidden h-64 md:h-80">
                  <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                </div>
                <div className="mt-6 flex items-start gap-3 flex-wrap">
                  <Badge variant="secondary">{campaign.category}</Badge>
                  {campaign.verified && <span className="trust-badge"><ShieldCheck className="w-3 h-3" /> Verified NGO</span>}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mt-4">{campaign.title}</h1>
                <p className="text-muted-foreground mt-1">by {campaign.org}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  This campaign aims to bring sustainable clean water access to rural communities. Every contribution directly funds infrastructure, engineering, and community training to ensure long-term impact and self-sufficiency.
                </p>
              </motion.div>

              {/* Tabs */}
              <Tabs defaultValue="updates" className="mt-8">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="updates">Impact Updates</TabsTrigger>
                  <TabsTrigger value="funds">Fund Usage</TabsTrigger>
                  <TabsTrigger value="trust">Trust Signals</TabsTrigger>
                </TabsList>

                <TabsContent value="updates" className="mt-6 space-y-4">
                  {impactUpdates.map((u, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 p-4 rounded-xl bg-card border border-border hover-lift"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <u.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{u.date}</p>
                        <p className="font-semibold text-sm mt-0.5">{u.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{u.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="funds" className="mt-6">
                  <div className="p-6 rounded-xl bg-card border border-border space-y-4">
                    <h3 className="font-semibold">Fund Allocation</h3>
                    <div className="flex h-4 rounded-full overflow-hidden">
                      {fundAllocation.map((f, i) => (
                        <div key={i} className={`${f.color} h-full`} style={{ width: `${f.pct}%` }} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {fundAllocation.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-sm ${f.color}`} />
                          <span className="text-muted-foreground">{f.label} ({f.pct}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trust" className="mt-6 space-y-4">
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold">4.8 / 5.0 Trust Rating</span>
                      <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Based on donor feedback, fund usage transparency, and impact delivery.</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                    <AlertTriangle className="w-4 h-4 mr-1.5" /> Report Concern
                  </Button>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right – Donation Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 rounded-xl bg-card border border-border p-6 space-y-5 shadow-lg"
              >
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-lg">${campaign.raised.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={pct} className="h-2.5" />
                  <p className="text-xs text-muted-foreground mt-1">{pct}% funded</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-lg font-bold">{campaign.donors}</p>
                    <p className="text-xs text-muted-foreground">Donors</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-lg font-bold">{campaign.daysLeft}</p>
                    <p className="text-xs text-muted-foreground">Days Left</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Select Amount</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[25, 50, 100, 250, 500, 1000].map(a => (
                      <Button key={a} variant="outline" size="sm" className="text-sm">${a}</Button>
                    ))}
                  </div>
                </div>
                <Button size="lg" className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90">
                  <Heart className="w-4 h-4 mr-2" /> Donate Now
                </Button>
                <p className="text-xs text-muted-foreground text-center">Secure payment · Tax deductible</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
