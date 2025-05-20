
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search,
  User,
  Settings,
  BookOpen,
  Trophy,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, name: "Dashboard", path: "/dashboard" },
  { icon: Search, name: "Browse", path: "/browse" },
  { icon: BookOpen, name: "My QBanks", path: "/my-qbanks" },
  { icon: Trophy, name: "Progress", path: "/progress" },
  { icon: User, name: "Profile", path: "/profile" },
  { icon: Settings, name: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  return (
    <div 
      className={cn(
        "tech-frame border-r border-silver/10 bg-black/40 h-[calc(100vh-4rem)] sticky top-16 flex flex-col transition-all duration-300",
        collapsed ? "w-14" : "w-56"
      )}
    >
      <div className="flex-1 py-4">
        <div className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center text-silver hover:text-white hover:bg-silver/10 rounded-md px-3 py-2 transition-colors group",
                location.pathname === item.path && "bg-silver/10 text-white"
              )}
            >
              <item.icon className="h-5 w-5 mr-2 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="p-2 border-t border-silver/10">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center text-silver hover:text-white rounded-md p-2 hover:bg-silver/10"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
