"use client"
import { ChevronRight, type LucideIcon } from "lucide-react"
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
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Student Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const { title, url, icon: Icon, children } = item
          
          if (children && children.length > 0) {
            return (
              <Collapsible key={title} asChild defaultOpen={item.isActive}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {Icon && <Icon />}
                      <span>{title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {children.map((child) => (
                        <SidebarMenuSubItem key={child.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={child.url} className="flex items-center gap-2">
                              {child.icon && <child.icon className="w-4 h-4" />}
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }

          return (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild>
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


