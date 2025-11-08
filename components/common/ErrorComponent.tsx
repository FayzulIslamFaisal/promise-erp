import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorComponentProps {
  message: string
  onRetry?: () => void
}

export default function ErrorComponent({ message, onRetry }: ErrorComponentProps) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md text-center p-6 border border-red-200 shadow-sm bg-red-50">
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-red-700">Error</h2>
            <p className="text-red-600">{message}</p>
            {onRetry && (
              <Button variant="destructive" onClick={onRetry} className="mt-4">
                Try Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
