import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Image from "next/image"

interface NotFoundComponentProps {
  title?: string
  message: string
  image?: string
  onActionClick?: () => void
  actionLabel?: string
}

export default function NotFoundComponent({
  title,
  message = "The requested resource was not found.",
  image = "/images/not_found.svg",
  onActionClick = undefined,
  actionLabel = "Go Back",
}: NotFoundComponentProps) {

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="w-full max-w-md text-center p-6 border shadow-sm">
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div>
              <Image src={image} alt="Not Found" width={100} height={100} />
            </div>
            {title && <h2 className="text-lg font-semibold text-gray-700">{title}</h2>}
            <p className="text-gray-500">{message}</p>
            {onActionClick && (
              <Button variant="outline" onClick={onActionClick} className="mt-4">
                {actionLabel}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
