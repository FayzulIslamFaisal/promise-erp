import { Spinner } from "@/components/ui/spinner";

const SectionLoadingSkeleton = () => {
  return (
    <div className="flex items-center justify-center h-full bg-black/10 py-12">
      <div className="text-secondary">
        <Spinner className="size-8" />
      </div>
    </div>
  )
}

export default SectionLoadingSkeleton
