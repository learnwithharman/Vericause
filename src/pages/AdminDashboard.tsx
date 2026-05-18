import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { admin as adminApi, campaigns as campaignsApi } from "@/lib/api";
import { toast } from "sonner";
import { ExecutiveHeader } from "@/components/admin/ExecutiveHeader";
import { IntelligenceStats } from "@/components/admin/IntelligenceStats";
import { CapitalVelocityChart } from "@/components/admin/CapitalVelocityChart";
import { AuditTrailLogs } from "@/components/admin/AuditTrailLogs";
import { NgoVerificationTable } from "@/components/admin/NgoVerificationTable";
import { CampaignModerationQueue } from "@/components/admin/CampaignModerationQueue";
import { Skeleton } from "@/components/ui/skeleton";

const donationTrendData = [
  { name: "Mon", value: 4200 },
  { name: "Tue", value: 3800 },
  { name: "Wed", value: 5100 },
  { name: "Thu", value: 4600 },
  { name: "Fri", value: 6200 },
  { name: "Sat", value: 5800 },
  { name: "Sun", value: 7100 },
];

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminApi.getStats(),
  });

  const { data: ngos = [], isLoading: ngosLoading } = useQuery({
    queryKey: ['admin-ngos'],
    queryFn: () => adminApi.listNgos(),
  });

  const { data: campaigns = [], isLoading: campaignsLoading } = useQuery({
    queryKey: ['admin-campaigns'],
    queryFn: () => adminApi.listCampaigns(),
  });

  const verifyMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'VERIFIED' | 'REJECTED' }) => adminApi.verifyNgo(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ngos'] });
      toast.success("Entity status updated in registry");
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'APPROVED' | 'REJECTED' }) => adminApi.approveCampaign(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      toast.success("Campaign entry logic settled");
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.toggleStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      toast.success("Operational state toggled");
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      toast.success("Campaign purged from registry");
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const isLoading = statsLoading || ngosLoading || campaignsLoading;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <Navbar />

      <main className="pt-32 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <ExecutiveHeader />

          {isLoading ? (
            <div className="space-y-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
              </div>
              <div className="grid lg:grid-cols-12 gap-6">
                <Skeleton className="lg:col-span-8 h-[400px] rounded-2xl" />
                <Skeleton className="lg:col-span-4 h-[400px] rounded-2xl" />
              </div>
            </div>
          ) : (
            <>
              <IntelligenceStats stats={stats} />

              <div className="grid lg:grid-cols-12 gap-6 mb-12">
                <div className="lg:col-span-8">
                  <CapitalVelocityChart data={donationTrendData} />
                </div>
                <div className="lg:col-span-4">
                  <AuditTrailLogs />
                </div>
              </div>

              <Tabs defaultValue="ngos" className="space-y-12">
                <div className="flex items-center justify-between border-b border-border/40 pb-1">
                  <TabsList className="bg-transparent h-auto p-0 gap-8">
                    <TabsTrigger value="ngos" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Entity Registry</TabsTrigger>
                    <TabsTrigger value="campaigns" className="p-0 pb-4 rounded-none h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 transition-all outline-none">Moderation Queue</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="ngos" className="mt-0 outline-none">
                  <NgoVerificationTable ngos={ngos} verifyMutation={verifyMutation} />
                </TabsContent>

                <TabsContent value="campaigns" className="mt-0 outline-none">
                  <CampaignModerationQueue 
                    campaigns={campaigns} 
                    approveMutation={approveMutation} 
                    toggleStatusMutation={toggleStatusMutation} 
                    deleteMutation={deleteMutation} 
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
