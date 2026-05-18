import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

interface CapitalVelocityChartProps {
  data: any[];
}

export function CapitalVelocityChart({ data }: CapitalVelocityChartProps) {
  return (
    <div className="elite-card h-full p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="panel-header mb-0">
          <p className="panel-subtitle">7-Day Transactional Volume</p>
          <h3 className="panel-title">Capital Velocity</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest">
          <Activity className="w-3 h-3" /> Live Logic
        </div>
      </div>

      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.08}/>
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
              dy={8}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 8px 16px rgba(0,0,0,0.04)', fontWeight: 700, fontSize: '12px' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#velocityGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
