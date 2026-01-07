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
      <MainHeader />
    <main className="">
      {children}
    </main>
    <MainFooter />
    </>
  )
}