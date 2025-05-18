
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-black/80 backdrop-blur-md border-b border-silver/10" 
          : "py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-qred rounded-sm flex items-center justify-center">
            <span className="font-bold text-lg">Q</span>
          </div>
          <span className="text-xl font-semibold text-white">QBank</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#benefits">Benefits</NavLink>
          <NavLink href="#testimonials">Users</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-silver hover:text-white">
            Login
          </Button>
          <Button className="bg-qred hover:bg-qred-light text-white border-none">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-silver hover:text-white transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-qred after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
  >
    {children}
  </a>
);

export default Navbar;
