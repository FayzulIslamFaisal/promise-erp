import MainFooter from "@/components/common/MainFooter"
import MainHeader from "@/components/common/MainHeader"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Suspense fallback={<div className="h-20 bg-background border-b animate-pulse" />}>
      <MainHeader />
    </Suspense>
    <main className="">
      {children}
    </main>
    <MainFooter />
    </>
  )
}