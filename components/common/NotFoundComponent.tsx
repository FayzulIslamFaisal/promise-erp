import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface NotFoundComponentProps {
  message: string
  onActionClick?: () => void
  actionLabel?: string
}

export default function NotFoundComponent({
  message,
  onActionClick,
  actionLabel = "Go Back",
}: NotFoundComponentProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center p-6 border border-gray-200 shadow-sm">
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <AlertTriangle className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Not Found</h2>
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
