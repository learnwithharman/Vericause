import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns } from "@/data/campaigns";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Eye, BarChart3, Heart, Zap, Target, Users, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: Heart, title: "Donate", desc: "Choose a verified campaign and contribute any amount securely." },
  { icon: Eye, title: "Track Funds", desc: "Follow every dollar through transparent, real-time fund tracking." },
  { icon: Target, title: "See Real Impact", desc: "Receive proof-of-impact updates with photos and reports." },
];

const trustFeatures = [
  { icon: ShieldCheck, title: "Verified NGOs", desc: "Every organization goes through rigorous verification." },
  { icon: Eye, title: "Tamper-Proof Tracking", desc: "All fund movements are recorded and publicly auditable." },
  { icon: BarChart3, title: "Impact Reports", desc: "Regular updates with photos, receipts, and field data." },
  { icon: Zap, title: "Donor Dashboard", desc: "Track all your donations and impact in one place." },
];

const testimonials = [
  { name: "Sarah Chen", role: "Monthly Donor", text: "For the first time, I can actually see where my money goes. VeriCause changed how I think about giving.", avatar: "SC" },
  { name: "James Okafor", role: "NGO Director", text: "The transparency tools helped us gain 3x more donors in just six months. Incredible platform.", avatar: "JO" },
  { name: "Maria Lopez", role: "Impact Investor", text: "The proof-of-impact reports are detailed and trustworthy. This is the future of philanthropy.", avatar: "ML" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-emerald/5 blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
                Trusted by 10,000+ donors worldwide
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Transparent Giving.{" "}
              <span className="gradient-text">Real Impact.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Donate to verified campaigns and transparently track how every dollar creates real-world change through proof-of-impact reports.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button asChild size="lg" className="gradient-primary text-primary-foreground border-0 hover:opacity-90 px-8 text-base">
                <Link to="/campaigns">Explore Campaigns <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 text-base">
                <Link to="/ngo-dashboard">Start a Campaign</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              {[
                { val: "$12M+", label: "Donated" },
                { val: "500+", label: "Campaigns" },
                { val: "98%", label: "Trust Score" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-foreground">{s.val}</p>
                  <p className="text-xs">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="The Problem"
            title="Trust in Donations is Broken"
            subtitle="67% of potential donors don't give because they don't trust where their money goes. Only 1 in 3 charities provide clear impact reports."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { val: "67%", label: "of donors lack trust in charities" },
              { val: "$400B", label: "lost to donation inefficiency" },
              { val: "1 in 3", label: "charities report impact clearly" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-xl bg-card border border-border"
              >
                <p className="text-4xl font-extrabold gradient-text">{s.val}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="How It Works" title="Three Steps to Transparent Impact" />
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center p-8 rounded-xl bg-card border border-border hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="absolute top-4 right-4 text-xs font-bold text-muted-foreground/40">0{i + 1}</span>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Featured" title="Campaigns Making a Difference" subtitle="Support verified organizations creating real-world impact." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.slice(0, 3).map((c, i) => (
              <CampaignCard key={c.id} campaign={c} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/campaigns">View All Campaigns <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Trust & Transparency" title="Built for Complete Transparency" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-card border border-border hover-lift text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-5 h-5 text-emerald" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading badge="Testimonials" title="Loved by Donors & NGOs" />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-card border border-border hover-lift"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-2xl gradient-primary p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Ready to Make a Difference?</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
                Join thousands of donors who trust VeriCause for transparent, impactful giving.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="bg-card text-foreground hover:bg-card/90 px-8">
                  <Link to="/campaigns">Start Donating</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8">
                  <Link to="/ngo-dashboard">Register as NGO</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
