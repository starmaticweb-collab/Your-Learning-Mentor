import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoader() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Title skeleton */}
      <Skeleton className="mx-auto mb-6 h-10 w-2/3 max-w-md" />
      {/* Subtitle skeleton */}
      <Skeleton className="mx-auto mb-10 h-5 w-1/2 max-w-sm" />
      {/* Content block skeletons */}
      <div className="mx-auto max-w-3xl space-y-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-4/6" />
        <div className="pt-4" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  );
}
