import { Github, Twitter, Linkedin, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-50 border-t border-border/40 selection:bg-primary/10">
      <div className="container mx-auto px-6 max-w-7xl pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">
          {/* Brand Engine */}
          <div className="md:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3 font-display font-bold text-2xl tracking-tighter group outline-none">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-500 italic">
                V
              </div>
              <span>Vericause</span>
            </Link>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm">
              The professional-grade registry for philanthropic capital. We provide the infrastructure for radical transparency and verifiable impact.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Github, href: "#", label: "GitHub" },
              ].map((s, i) => (
                <a 
                  key={i} 
                  href={s.href} 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-border/40 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all duration-300 outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { 
                title: "Registry", 
                links: [
                  { label: "Active Nodes", href: "/campaigns" },
                  { label: "Verification", href: "#" },
                  { label: "Impact Ledger", href: "#" },
                  { label: "Partner Portal", href: "#" }
                ] 
              },
              { 
                title: "System", 
                links: [
                  { label: "Documentation", href: "#" },
                  { label: "API Protocol", href: "#" },
                  { label: "Security", href: "#" },
                  { label: "Governance", href: "#" }
                ] 
              },
              { 
                title: "Organization", 
                links: [
                  { label: "Vision", href: "#" },
                  { label: "Network", href: "#" },
                  { label: "Contact", href: "#" },
                  { label: "Careers", href: "#" }
                ] 
              },
              { 
                title: "Legal", 
                links: [
                  { label: "Privacy", href: "#" },
                  { label: "Terms", href: "#" },
                  { label: "Compliance", href: "#" },
                  { label: "Cookies", href: "#" }
                ] 
              },
            ].map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-[10px] font-bold text-foreground uppercase tracking-[0.2em]">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a 
                        href={link.href} 
                        className="text-sm font-medium text-slate-500 hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Console / Status Layer */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              © {currentYear} VERICAUSE PROTOCOL. ALL RIGHTS RESERVED.
            </p>
            <div className="hidden md:block w-px h-4 bg-border/40" />
            <div className="flex items-center gap-2 group cursor-default">
              <Globe className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-foreground transition-colors">Global Node: Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border/40">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Operational: 100%</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[9px] font-bold uppercase tracking-widest">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
