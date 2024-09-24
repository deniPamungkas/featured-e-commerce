import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[225px] w-full max-w-sm rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full max-w-sm" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>
      <br />
      <Skeleton className="m-auto h-[30px] w-full" />
    </div>
  );
};
