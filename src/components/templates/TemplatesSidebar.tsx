
import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { TemplateCategory } from "@/types/template-types";

interface TemplatesSidebarProps {
  categories: TemplateCategory[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const TemplatesSidebar: React.FC<TemplatesSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Sidebar variant="inset" className="w-[260px] border-r">
      <SidebarContent>
        <SidebarGroup className="pt-2">
          <SidebarGroupLabel className="px-3 py-2 text-base">Categories</SidebarGroupLabel>
          <SidebarMenu className="px-1">
            <SidebarMenuItem className="mb-1">
              <SidebarMenuButton
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-3 py-2.5 rounded-md transition-colors",
                  selectedCategory === "all" && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                )}
              >
                All Templates
              </SidebarMenuButton>
            </SidebarMenuItem>
            {categories.map((category) => (
              <SidebarMenuItem key={category.id} className="mb-1">
                <SidebarMenuButton
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-3 py-2.5 rounded-md transition-colors",
                    selectedCategory === category.id && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  )}
                >
                  {category.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default TemplatesSidebar;
