import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <img src="/logo.svg" alt="VeriCause Logo" className="w-7 h-7" />
              <span className="gradient-text">VeriCause</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transparent giving. Real impact. Building trust in every donation.
            </p>
          </div>
          {[
            { title: "Platform", links: ["Campaigns", "How it Works", "For NGOs", "Pricing"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Compliance"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 VeriCause. All rights reserved.</p>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn"].map(s => (
              <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
