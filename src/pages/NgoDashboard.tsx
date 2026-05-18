import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaigns as campaignsApi, auth } from "@/lib/api";
import { toast } from "sonner";
import { PartnerHeader } from "@/components/ngo/PartnerHeader";
import { OperationalMetrics } from "@/components/ngo/OperationalMetrics";
import { ActiveMatrixTable } from "@/components/ngo/ActiveMatrixTable";
import { DeploymentProtocolForm } from "@/components/ngo/DeploymentProtocolForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function NgoDashboard() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [campaignImage, setCampaignImage] = useState<File | null>(null);
  const [verificationDoc, setVerificationDoc] = useState<File | null>(null);
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    goalAmount: 0,
    category: ""
  });

  const { data: campaigns = [], isLoading: campaignsLoading } = useQuery({
    queryKey: ['ngo-campaigns'],
    queryFn: () => campaignsApi.list({ status: "ALL" }),
    enabled: auth.isLoggedIn(),
  });

  const createCampaignMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      if (campaignImage) formData.append('image', campaignImage);
      if (verificationDoc) formData.append('verificationDoc', verificationDoc);
      return campaignsApi.create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngo-campaigns'] });
      toast.success("Campaign node successfully registered");
      setActiveTab("campaigns");
      setNewCampaign({ title: "", description: "", goalAmount: 0, category: "" });
      setCampaignImage(null);
      setVerificationDoc(null);
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.toggleStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngo-campaigns'] });
      toast.success("Operational state toggled");
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ngo-campaigns'] });
      toast.success("Campaign entry purged");
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const totalInflow = campaigns.reduce((acc, c) => acc + c.raisedAmount, 0);
  const totalDonors = campaigns.reduce((acc, c) => acc + (c._count?.donations ?? 0), 0);
  const totalUpdates = campaigns.length; // Simplified for demo
  
  const isLoading = campaignsLoading;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />

      <main className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <PartnerHeader setActiveTab={setActiveTab} setNewCampaign={setNewCampaign} />

          {isLoading ? (
            <div className="space-y-12">
              <div className="grid sm:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
              </div>
              <Skeleton className="h-[400px] rounded-2xl" />
            </div>
          ) : (
            <>
              <OperationalMetrics 
                totalInflow={totalInflow} 
                totalDonors={totalDonors} 
                totalUpdates={totalUpdates} 
              />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
                <div className="flex items-center justify-between border-b border-border/40 pb-1">
                  <TabsList className="bg-transparent h-auto p-0 gap-8">
                    <TabsTrigger value="campaigns" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Active Matrix</TabsTrigger>
                    <TabsTrigger value="create" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Deployment Protocol</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="campaigns" className="mt-0 outline-none">
                  <ActiveMatrixTable 
                    campaigns={campaigns} 
                    toggleStatusMutation={toggleStatusMutation} 
                    deleteMutation={deleteMutation} 
                  />
                </TabsContent>

                <TabsContent value="create" className="mt-0 outline-none">
                  <DeploymentProtocolForm 
                    newCampaign={newCampaign}
                    setNewCampaign={setNewCampaign}
                    campaignImage={campaignImage}
                    setCampaignImage={setCampaignImage}
                    verificationDoc={verificationDoc}
                    setVerificationDoc={setVerificationDoc}
                    createCampaignMutation={createCampaignMutation}
                  />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
