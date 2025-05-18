
import React from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Bell, 
  User,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AppNavbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <nav className="border-b border-silver/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-qred rounded-sm flex items-center justify-center">
                <span className="font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-semibold text-white">QBank</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 px-8">
            <div className="relative w-full max-w-md">
              <Input 
                type="search"
                placeholder="Search for topics, exams, or question banks..."
                className="bg-black/40 border-silver/20 text-silver rounded-md pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver w-4 h-4" />
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-silver">
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/profile">
              <Button variant="outline" size="icon" className="rounded-full border-silver/20">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile Search Toggle */}
          <div className="flex md:hidden items-center">
            <Button variant="ghost" size="icon" className="text-silver mr-2" onClick={() => setShowSearch(!showSearch)}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-silver" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden p-2 border-t border-silver/10">
            <div className="relative">
              <Input 
                type="search"
                placeholder="Search..."
                className="bg-black/40 border-silver/20 text-silver rounded-md pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver w-4 h-4" />
            </div>
          </div>
        )}
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-silver/10 py-2">
            <div className="flex flex-col space-y-1">
              <Link to="/dashboard" className="px-3 py-2 text-silver hover:bg-silver/10 rounded-md">
                Dashboard
              </Link>
              <Link to="/browse" className="px-3 py-2 text-silver hover:bg-silver/10 rounded-md">
                Browse
              </Link>
              <Link to="/profile" className="px-3 py-2 text-silver hover:bg-silver/10 rounded-md">
                Profile
              </Link>
              <Link to="/settings" className="px-3 py-2 text-silver hover:bg-silver/10 rounded-md">
                Settings
              </Link>
              <div className="pt-2 border-t border-silver/10 mt-1">
                <Button variant="ghost" className="w-full justify-start text-silver">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavbar;
