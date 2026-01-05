"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavCollapsibleItem({
    item,
}: {
    item: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }
}) {
    const pathname = usePathname()

    // Calculate active state
    const hasActiveChild = item.items?.some(
        (subItem) => pathname === subItem.url || pathname?.startsWith(subItem.url + "/")
    )
    const isSelfActive = pathname === item.url || (item.url !== "#" && pathname?.startsWith(item.url + "/"))

    // Determine if this group should be active (expanded) or highlighted
    const isActive = hasActiveChild || isSelfActive || item.isActive

    // State to manage open/close
    const [isOpen, setIsOpen] = React.useState(isActive)

    // Update open state when path changes and this item becomes active
    React.useEffect(() => {
        if (isActive) {
            setIsOpen(true)
        }
    }, [isActive])

    return (
        <Collapsible
            key={item.title}
            asChild
            open={isOpen}
            onOpenChange={setIsOpen}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} isActive={isActive} className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary font-medium hover:bg-primary/5 hover:text-primary">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                            const isSubItemActive = pathname === subItem.url || pathname?.startsWith(subItem.url + "/")
                            return (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild isActive={isSubItemActive} className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary font-medium hover:bg-primary/5 hover:text-primary">
                                        <Link href={subItem.url}>
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            )
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}
