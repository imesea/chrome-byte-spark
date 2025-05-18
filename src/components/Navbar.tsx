
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NavbarProps {
  onAuthClick?: () => void;
}

const Navbar = ({ onAuthClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
          <Button 
            variant="ghost" 
            className="text-silver hover:text-white"
            onClick={onAuthClick}
          >
            Login
          </Button>
          <Button 
            className="bg-qred hover:bg-qred-light text-white border-none"
            onClick={onAuthClick}
          >
            Get Started
          </Button>
          
          <button 
            className="md:hidden text-silver hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-silver/10 py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <MobileNavLink href="#features" onClick={() => setMobileMenuOpen(false)}>Features</MobileNavLink>
            <MobileNavLink href="#benefits" onClick={() => setMobileMenuOpen(false)}>Benefits</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Users</MobileNavLink>
            <MobileNavLink href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
            <div className="pt-2 border-t border-silver/10 mt-2 flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                className="justify-center text-silver hover:text-white w-full"
                onClick={() => {
                  onAuthClick?.();
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </Button>
              <Button 
                className="justify-center bg-qred hover:bg-qred-light text-white w-full"
                onClick={() => {
                  onAuthClick?.();
                  setMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
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

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <a 
    href={href} 
    className="text-silver hover:text-white py-2 block text-center text-lg"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
