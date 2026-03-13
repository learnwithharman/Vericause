import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
  return (
    <div className="elite-card p-8 space-y-6">
      <div className="flex items-start justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-32 h-9" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 py-6 px-8 border-b border-border/40">
      <div className="flex items-center gap-4 flex-1">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-2" />
        </div>
      </div>
      {Array.from({ length: columns - 1 }).map((_, i) => (
        <Skeleton key={i} className="w-20 h-4" />
      ))}
    </div>
  );
}

export function CampaignCardSkeleton() {
  return (
    <div className="elite-card p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Skeleton className="w-16 h-4 rounded-full" />
            <Skeleton className="w-16 h-4 rounded-full" />
          </div>
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>
        <Skeleton className="w-12 h-12 rounded-2xl" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-full h-2 rounded-full" />
      </div>
      <div className="flex justify-between pt-4">
        <Skeleton className="w-24 h-8 rounded-lg" />
        <Skeleton className="w-24 h-8 rounded-lg" />
      </div>
    </div>
  );
}
