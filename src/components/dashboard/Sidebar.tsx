import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Search,
  UserPlus,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  className?: string;
  activePath?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Campaigns",
    icon: MessageSquare,
    href: "/dashboard/campaigns",
  },
  {
    title: "Prospects",
    icon: Users,
    href: "/dashboard/prospects",
  },
  {
    title: "Follower Scraper",
    icon: Search,
    href: "/dashboard/scraper",
  },
  {
    title: "Connection Requests",
    icon: UserPlus,
    href: "/dashboard/connections",
  },
  {
    title: "Job Applications",
    icon: Briefcase,
    href: "/dashboard/jobs",
  },
  {
    title: "Templates",
    icon: MessageSquare,
    href: "/dashboard/templates",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
];

const secondaryItems = [
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings/linkedin",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

const Sidebar = ({ className = "", activePath = "/" }: SidebarProps) => {
  return (
    <div
      className={cn(
        "w-[280px] bg-background border-r h-screen flex flex-col",
        className,
      )}
    >
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant={activePath === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activePath === item.href && "bg-secondary",
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
          <Separator />
          <div className="space-y-2">
            {secondaryItems.map((item) => (
              <Button
                key={item.href}
                variant={activePath === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  activePath === item.href && "bg-secondary",
                )}
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
