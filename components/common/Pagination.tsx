'use client'

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginationType } from "@/types/pagination"
import { usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
  pagination: PaginationType
}

export default function Pagination({ pagination }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const { current_page, last_page } = pagination

  const renderPaginationItems = () => {
    const pageNumbers = []
    const displayedPages = 2
    
    // Previous button
    pageNumbers.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href={createPageURL(current_page - 1)}
          aria-disabled={current_page === 1}
          className={current_page === 1 ? "pointer-events-none opacity-50" : ""}
        />
      </PaginationItem>
    )

    // First page
    pageNumbers.push(
      <PaginationItem key={1}>
        <PaginationLink href={createPageURL(1)} isActive={current_page === 1}>1</PaginationLink>
      </PaginationItem>
    )

    // Ellipsis after first page
    if (current_page > displayedPages + 1) {
      pageNumbers.push(<PaginationEllipsis key="start-ellipsis" />)
    }

    // Middle pages
    const startPage = Math.max(2, current_page - displayedPages)
    const endPage = Math.min(last_page - 1, current_page + displayedPages)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink href={createPageURL(i)} isActive={current_page === i}>{i}</PaginationLink>
        </PaginationItem>
      )
    }

    // Ellipsis before last page
    if (current_page < last_page - displayedPages - 1) {
      pageNumbers.push(<PaginationEllipsis key="end-ellipsis" />)
    }

    // Last page
    if (last_page > 1) {
      pageNumbers.push(
        <PaginationItem key={last_page}>
          <PaginationLink href={createPageURL(last_page)} isActive={current_page === last_page}>
            {last_page}
          </PaginationLink>
        </PaginationItem>
      )
    }

    // Next button
    pageNumbers.push(
      <PaginationItem key="next">
        <PaginationNext
          href={createPageURL(current_page + 1)}
          aria-disabled={current_page === last_page}
          className={
            current_page === last_page ? "pointer-events-none opacity-50" : ""
          }
        />
      </PaginationItem>
    )

    return pageNumbers
  }

  return (
    <ShadcnPagination>
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </ShadcnPagination>
  )
}
