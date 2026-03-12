import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns } from "@/data/campaigns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const categories = ["All", "Water", "Education", "Emergency", "Environment", "Healthcare", "Social"];

export default function CampaignMarketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.org.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mb-10">
            <h1 className="text-3xl md:text-4xl font-bold">Explore Campaigns</h1>
            <p className="mt-2 text-muted-foreground">Discover verified campaigns creating real-world impact.</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className={category === cat ? "gradient-primary text-primary-foreground border-0" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c, i) => (
                <CampaignCard key={c.id} campaign={c} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No campaigns found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
