import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="border border-white/10 rounded-xl p-6 bg-white/5 flex flex-col">
      <div className="sr-only">
        <span>Loading products...</span>
      </div>
      <Skeleton className="aspect-square rounded-lg mb-4" />

      <Skeleton className="h-5 w-20 mb-3" />

      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-4" />

      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4 flex-1" />

      <Skeleton className="h-5 w-24 mb-3" />

      <Skeleton className="h-8 w-32" />
    </div>
  );
}
