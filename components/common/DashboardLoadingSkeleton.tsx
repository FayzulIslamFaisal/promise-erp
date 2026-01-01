import { Spinner } from "@/components/ui/spinner";

const DashboardLoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/10">
      <div className="text-secondary">
        <Spinner className="size-8" />
      </div>
    </div>
  );
};

export default DashboardLoadingSkeleton;
