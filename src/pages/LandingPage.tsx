import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { campaigns as staticCampaigns } from "@/data/campaigns";
import { useQuery } from "@tanstack/react-query";
import { campaigns as campaignsApi } from "@/lib/api";
import { Hero } from "@/components/landing/Hero";
import { StatsTelemetry } from "@/components/landing/StatsTelemetry";
import { ImpactVerticals } from "@/components/landing/ImpactVerticals";
import { LiveRegistries } from "@/components/landing/LiveRegistries";
import { GovernanceQuote } from "@/components/landing/GovernanceQuote";
import { GlobalCTA } from "@/components/landing/GlobalCTA";

export default function LandingPage() {
  const { data: apiCampaigns = [] } = useQuery({
    queryKey: ['landing-campaigns'],
    queryFn: () => campaignsApi.list({ status: 'APPROVED' }),
    staleTime: 60_000,
  });

  const displayCampaigns = apiCampaigns.length > 0 ? apiCampaigns.slice(0, 5) : staticCampaigns.slice(0, 5);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary overflow-x-hidden font-sans">
      <Navbar />

      <main>
        <Hero />
        <StatsTelemetry />
        <ImpactVerticals />
        <LiveRegistries displayCampaigns={displayCampaigns} />
        <GovernanceQuote />
        <GlobalCTA />
      </main>

      <Footer />
    </div>
  );
}
