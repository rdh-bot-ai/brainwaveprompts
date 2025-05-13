
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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TemplatesSidebar: React.FC<TemplatesSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <Sidebar variant="inset" className="w-[260px] border-r">
      <SidebarContent>
        <SidebarGroup>
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  selectedCategory === "all" && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                )}
              >
                All Templates
              </SidebarMenuButton>
            </SidebarMenuItem>
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
