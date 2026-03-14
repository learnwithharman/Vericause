import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CampaignMarketplace from "./pages/CampaignMarketplace";
import CampaignDetail from "./pages/CampaignDetail";
import DonorDashboard from "./pages/DonorDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handleDonationEvent = (e: any) => {
      const { amount, title, name } = e.detail;
      toast.custom((id) => (
        <motion.div 
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          className="bg-white dark:bg-slate-900 border border-primary/20 p-5 rounded-2xl shadow-2xl shadow-primary/10 flex items-center gap-5 min-w-[340px]"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Heart className="w-6 h-6 fill-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Protocol Event</span>
              <button onClick={() => toast.dismiss(id)} className="text-slate-400 hover:text-foreground">×</button>
            </div>
            <p className="text-[13px] font-bold text-foreground leading-tight">
              <span className="text-primary font-black">{name}</span> initialized <span className="text-primary font-black">${amount}</span> for <span className="font-black italic">"{title}"</span>
            </p>
          </div>
        </motion.div>
      ), { duration: 5000, position: 'bottom-right' });
    };

    window.addEventListener('vc-donation', handleDonationEvent);
    return () => window.removeEventListener('vc-donation', handleDonationEvent);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner expand={true} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/campaigns" element={<CampaignMarketplace />} />
            <Route path="/campaign/:id" element={<CampaignDetail />} />
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route path="/ngo-dashboard" element={<NgoDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
