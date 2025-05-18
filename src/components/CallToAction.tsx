
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="tech-frame border border-qred/30 rounded-lg overflow-hidden max-w-4xl mx-auto">
          <div className="bg-black/60 p-8 md:p-12 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your assessment strategy?</h2>
              <p className="text-silver-light text-lg max-w-2xl mx-auto">
                Join hundreds of leading educational institutions already using QBank to optimize their question management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-black/50 rounded-lg border border-silver/10">
                <div className="text-3xl font-bold text-qred mb-1">14-day</div>
                <p className="text-silver">Free trial</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-black/50 rounded-lg border border-silver/10">
                <div className="text-3xl font-bold text-qred mb-1">5,000+</div>
                <p className="text-silver">Questions analyzed</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-black/50 rounded-lg border border-silver/10">
                <div className="text-3xl font-bold text-qred mb-1">99.9%</div>
                <p className="text-silver">Uptime guarantee</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-qred hover:bg-qred-light text-white px-8 py-6 text-lg w-full sm:w-auto">
                Start free trial
              </Button>
              <Button variant="ghost" className="text-silver hover:text-white px-6 py-6 text-lg w-full sm:w-auto">
                Schedule demo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
