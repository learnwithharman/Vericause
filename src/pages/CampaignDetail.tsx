import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaigns as campaignsApi, donations as donationsApi } from "@/lib/api";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { DonationTerminal } from "@/components/campaign/DonationTerminal";
import { ImpactTabs } from "@/components/campaign/ImpactTabs";
import { Skeleton } from "@/components/ui/skeleton";

const fundAllocationData = [
  { name: "Field Logistics", value: 45, color: "hsl(var(--primary))" },
  { name: "Direct Resources", value: 35, color: "hsl(var(--primary) / 0.6)" },
  { name: "Verification", value: 15, color: "hsl(var(--primary) / 0.3)" },
  { name: "Admin Layer", value: 5, color: "hsl(var(--primary) / 0.1)" },
];

const impactUpdates = [
  {
    date: "May 12, 2026",
    title: "Regional Node Activation",
    type: "Infrastructure",
    desc: "The primary logistics hub in the northern sector has achieved full operational capacity. Local verification nodes are now syncing data in real-time.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=300&h=300&fit=crop"
  },
  {
    date: "April 28, 2026",
    title: "Capital Settlement Complete",
    type: "Financial",
    desc: "The initial $50,000 deployment has been verified and settled across 12 delivery endpoints with 0% leakage reported.",
  },
  {
    date: "April 15, 2026",
    title: "Project Initialization",
    type: "Strategic",
    desc: "Registry entry approved. Operational parameters defined and regional stakeholders verified through the VC protocol.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=300&fit=crop"
  }
];

export default function CampaignDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [donateAmount, setDonateAmount] = useState(50);
  const [demoMode, setDemoMode] = useState(false);

  const { data: campaign, isLoading } = useQuery({
    queryKey: ['campaign', id],
    queryFn: () => campaignsApi.get(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    // Check if we are in a demo environment (e.g., no backend)
    const checkBackend = async () => {
      try {
        await campaignsApi.list({ limit: 1 });
      } catch (e) {
        setDemoMode(true);
      }
    };
    checkBackend();
  }, []);

  const donateMutation = useMutation({
    mutationFn: (amount: number) => donationsApi.donate(campaign!.id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaign', id] });
      toast.success("Capital successfully deployed to registry");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#06b6d4']
      });
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const handleDonate = () => {
    if (demoMode) {
      toast.success("DEMO MODE: Strategic capital simulated");
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.7 }
      });
      return;
    }
    donateMutation.mutate(donateAmount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-40 pb-32">
          <div className="container mx-auto px-6 max-w-7xl">
            <Skeleton className="h-20 w-3/4 mb-8" />
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 space-y-12">
                <Skeleton className="h-[400px] w-full rounded-3xl" />
                <Skeleton className="h-[200px] w-full rounded-3xl" />
              </div>
              <div className="lg:col-span-4">
                <Skeleton className="h-[600px] w-full rounded-3xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!campaign) return null;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <CampaignHero campaign={campaign} />

          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <ImpactTabs 
                campaign={campaign} 
                fundAllocationData={fundAllocationData} 
                impactUpdates={impactUpdates} 
              />
            </div>

            <div className="lg:col-span-4">
              <DonationTerminal 
                campaign={campaign}
                donateAmount={donateAmount}
                setDonateAmount={setDonateAmount}
                handleDonate={handleDonate}
                donating={donateMutation.isPending}
                demoMode={demoMode}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
