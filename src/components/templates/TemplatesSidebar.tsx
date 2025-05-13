
import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
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
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
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
