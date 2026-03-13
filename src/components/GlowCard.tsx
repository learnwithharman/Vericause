import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g., "132, 0, 255"
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  glowColor = "79, 70, 229", // Default primary blue
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-[2rem] overflow-hidden bg-background border border-border/40 transition-all duration-500",
        "before:absolute before:inset-0 before:z-0 before:bg-gradient-to-br before:from-white/[0.03] before:to-transparent",
        className
      )}
      style={{
        "--glow-x": `${mousePos.x}%`,
        "--glow-y": `${mousePos.y}%`,
        "--glow-intensity": isHovered ? "1" : "0.4",
        "--glow-color": glowColor,
      } as React.CSSProperties}
    >
      {/* Edge Shine Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          padding: '1px',
          background: `radial-gradient(400px circle at var(--glow-x) var(--glow-y), rgba(var(--glow-color), var(--glow-intensity)) 0%, transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      {/* Inner Content */}
      <div className="relative z-0 h-full">
        {children}
      </div>
    </div>
  );
};
