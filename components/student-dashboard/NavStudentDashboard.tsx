"use client"
import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const NavStudentDashboard = ({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    children?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) => {
  const pathname = usePathname() || ''

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Student Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const { title, url, icon: Icon, children } = item
          const isActive = pathname === url || pathname?.startsWith(url + "/")
          const hasActiveChild = children?.some(child => pathname === child.url || pathname?.startsWith(child.url + "/"))
          
          if (children && children.length > 0) {
            return (
              <Collapsible key={title} asChild defaultOpen={isActive || hasActiveChild}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={isActive || hasActiveChild}>
                      {Icon && <Icon />}
                      <span>{title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {children.map((child) => {
                        const isChildActive = pathname === child.url || pathname?.startsWith(child.url + "/")
                        return (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton asChild isActive={isChildActive}>
                              <Link href={child.url} className="flex items-center gap-2">
                                {child.icon && <child.icon className="w-4 h-4" />}
                                <span>{child.title}</span>
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

          return (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={url} className="flex items-center gap-2">
                  {Icon && <Icon />}
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavStudentDashboard


