import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen pt-20 pb-16 flex items-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Main content */}
      <div className="container px-4 md:px-6 relative z-10 animate-fade-in">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center rounded-full border border-silver/20 bg-black/50 px-3 py-1 text-sm text-silver">
              <span className="inline-block h-2 w-2 rounded-full bg-qred mr-2 animate-pulse-subtle"></span>
              <span>New version 2.5 released</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              <span className="text-gradient">Free study tools</span>
              <br />
              <span className="text-white">for students</span>
            </h1>
            
            <p className="text-silver-light text-lg md:text-xl max-w-lg">
              Access our AI-powered question bank platform to improve your grades and prepare for exams - completely free for all students.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-qred hover:bg-qred-light text-white px-8 py-6 text-lg"
                onClick={onGetStarted}
              >
                Get started now
              </Button>
              <Button variant="outline" className="border-silver/30 text-silver hover:text-white hover:border-silver px-8 py-6 text-lg">
                Watch demo
              </Button>
              <Link to="/exam">
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 px-8 py-6 text-lg"
                >
                  Start Exam Practice
                </Button>
              </Link>
            </div>
            
            <div className="pt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-silver/80" />
                ))}
              </div>
              <p className="text-sm text-silver">
                <span className="font-semibold text-white">500+</span> students already using QBank
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative">
            {/* Keep existing mock interface elements */}
            <div className="tech-frame rounded-lg border border-silver/20 overflow-hidden shadow-2xl relative h-[500px] w-full animate-float bg-black/40 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-12 bg-black/60 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-qred"></div>
                  <div className="w-3 h-3 rounded-full bg-silver/50"></div>
                  <div className="w-3 h-3 rounded-full bg-silver/50"></div>
                </div>
              </div>
              
              {/* Mock interface elements */}
              <div className="p-6 pt-16 grid grid-cols-12 gap-4 h-full">
                <div className="col-span-4 flex flex-col gap-3">
                  <div className="h-10 bg-silver/10 rounded-md"></div>
                  <div className="h-10 bg-silver/10 rounded-md"></div>
                  <div className="h-10 bg-qred/20 border border-qred/40 rounded-md"></div>
                  <div className="h-10 bg-silver/10 rounded-md"></div>
                  <div className="h-10 bg-silver/10 rounded-md"></div>
                  <div className="flex-1"></div>
                  <div className="h-24 bg-silver/5 rounded-md"></div>
                </div>
                
                <div className="col-span-8 flex flex-col gap-4">
                  <div className="h-12 bg-silver/10 rounded-md"></div>
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="bg-silver/5 rounded-md p-3">
                      <div className="h-4 w-24 bg-silver/20 rounded-sm mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-silver/20 rounded-sm w-full"></div>
                        <div className="h-3 bg-silver/20 rounded-sm w-5/6"></div>
                        <div className="h-3 bg-silver/20 rounded-sm w-4/6"></div>
                      </div>
                    </div>
                    <div className="bg-silver/5 rounded-md p-3">
                      <div className="h-4 w-20 bg-silver/20 rounded-sm mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-silver/20 rounded-sm w-full"></div>
                        <div className="h-3 bg-silver/20 rounded-sm w-5/6"></div>
                        <div className="h-3 bg-silver/20 rounded-sm w-4/6"></div>
                      </div>
                    </div>
                    <div className="bg-silver/5 rounded-md p-3">
                      <div className="h-4 w-28 bg-silver/20 rounded-sm mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-silver/20 rounded-sm w-full"></div>
                        <div className="h-3 bg-silver/20 rounded-sm w-4/6"></div>
                      </div>
                    </div>
                    <div className="bg-qred/10 border border-qred/30 rounded-md p-3">
                      <div className="h-4 w-20 bg-qred/30 rounded-sm mb-3"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-qred/30 rounded-sm w-full"></div>
                        <div className="h-3 bg-qred/30 rounded-sm w-3/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-40 h-40 bg-qred/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-silver/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
