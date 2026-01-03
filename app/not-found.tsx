import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">

      {/* Image */}
      <div className="animate-in fade-in zoom-in duration-700">
        <Image
          src="/images/Under-construction.png"
          alt="Page Under Construction"
          width={320}
          height={320}
          priority
        />
      </div>

      {/* Text */}
      <h2 className="text-3xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
        Page Under Construction 🚧
      </h2>

      <p className="max-w-md text-muted-foreground animate-in fade-in slide-in-from-bottom-6 duration-700">
        The page you are trying to access is currently under development.
        Please check back later.
      </p>

      {/* Action */}
      <Link href="/">
        <Button className="mt-2 animate-in fade-in slide-in-from-bottom-8 duration-700">
          Go to Home
        </Button>
      </Link>

    </div>
  )
}

export default NotFound
