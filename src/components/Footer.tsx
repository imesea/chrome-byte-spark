
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-silver/10 bg-black">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-qred rounded-sm flex items-center justify-center">
                <span className="font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-semibold text-white">QBank</span>
            </div>
            <p className="text-silver-light mb-4 max-w-xs">
              Next-generation question bank platform for modern educational assessment.
            </p>
            <div className="flex space-x-4">
              <SocialIcon />
              <SocialIcon />
              <SocialIcon />
              <SocialIcon />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <FooterLink>Features</FooterLink>
              <FooterLink>Pricing</FooterLink>
              <FooterLink>Integrations</FooterLink>
              <FooterLink>Changelog</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <FooterLink>Documentation</FooterLink>
              <FooterLink>API Reference</FooterLink>
              <FooterLink>Knowledge Base</FooterLink>
              <FooterLink>Community</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink>About Us</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Contact</FooterLink>
              <FooterLink>Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-silver/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-silver text-sm mb-4 md:mb-0">&copy; {currentYear} QBank. All rights reserved.</p>
          <div className="flex space-x-6">
            <span className="text-silver text-sm hover:text-white cursor-pointer">Terms</span>
            <span className="text-silver text-sm hover:text-white cursor-pointer">Privacy</span>
            <span className="text-silver text-sm hover:text-white cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <li>
    <a href="#" className="text-silver hover:text-white transition-colors">
      {children}
    </a>
  </li>
);

const SocialIcon = () => (
  <a href="#" className="w-8 h-8 rounded-full border border-silver/20 flex items-center justify-center hover:border-qred/50 transition-colors">
    <span className="sr-only">Social Media</span>
  </a>
);

export default Footer;
