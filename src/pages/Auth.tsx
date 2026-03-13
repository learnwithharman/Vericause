import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { auth } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Globe, ArrowRight, Shield, User } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONOR",
    organizationName: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await auth.login(formData.email, formData.password);
        auth.saveSession(res.accessToken, res.user);
      } else {
        const res = await auth.register(formData);
        auth.saveSession(res.accessToken, res.user);
      }
      
      const user = auth.currentUser();
      if (user?.role === "ADMIN") navigate("/admin");
      else if (user?.role === "NGO") navigate("/ngo-dashboard");
      else navigate("/donor-dashboard");
    } catch (err: unknown) {
      const e = err as Error;
      alert(e.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="elite-card p-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                <Globe className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
                {isLogin ? "Welcome Back" : "Impact Registration"}
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                {isLogin ? "Access your VeriCause capital dashboard" : "Join the radical transparency movement"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-border/40"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Protocol</label>
                <Input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="name@nexus.com" 
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-border/40"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Security Key</label>
                <Input 
                  required
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-border/40"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Entity Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: "DONOR"})}
                      className={`h-11 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${formData.role === "DONOR" ? "bg-primary text-white" : "bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-400 border border-border/40"}`}
                    >
                      <User className="w-4 h-4" /> DONOR
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, role: "NGO"})}
                      className={`h-11 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${formData.role === "NGO" ? "bg-primary text-white" : "bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-400 border border-border/40"}`}
                    >
                      <Shield className="w-4 h-4" /> NGO
                    </button>
                  </div>
                </div>
              )}

              {!isLogin && formData.role === "NGO" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6 pt-2"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Organization Name</label>
                    <Input 
                      required
                      value={formData.organizationName}
                      onChange={e => setFormData({...formData, organizationName: e.target.value})}
                      placeholder="Global Relief Org" 
                      className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border-border/40"
                    />
                  </div>
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-indigo-100 mt-4 group"
              >
                {loading ? "Processing..." : (isLogin ? "Enter Dashboard" : "Create Account")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="mt-8 text-center pt-8 border-t border-border/40">
              <p className="text-slate-400 text-[13px] font-medium">
                {isLogin ? "New to the registry?" : "Already verified?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-bold ml-2 hover:underline"
                >
                  {isLogin ? "Initialize Account" : "Return to Log-in"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
