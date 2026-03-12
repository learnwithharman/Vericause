import { motion } from "framer-motion";

export function SectionHeading({ 
  badge, 
  title, 
  subtitle,
  align = "center" 
}: { 
  badge?: string; 
  title: string; 
  subtitle?: string;
  align?: "left" | "center" | "right"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl mb-16 ${align === "left" ? "text-left" : align === "right" ? "text-right ml-auto" : "text-center mx-auto"}`}
    >
      {badge && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase bg-primary/5 text-primary border border-primary/10 mb-6"
        >
          {badge}
        </motion.span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tighter text-foreground mb-6 leading-[1.05]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance font-medium max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
