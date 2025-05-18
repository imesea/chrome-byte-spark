
import React from "react";

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 relative bg-black/30">
      <div className="absolute inset-0 tech-grid opacity-10" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitCard
                number="01"
                title="50% Time Reduction"
                description="Cut assessment creation time in half with AI-powered question generation and templates."
              />
              <BenefitCard
                number="02"
                title="98.5% Accuracy"
                description="Our proprietary algorithms ensure near-perfect precision in assessment scoring."
              />
              <BenefitCard
                number="03"
                title="30% Performance Boost"
                description="Users report significant improvements in student outcomes through targeted assessments."
              />
              <BenefitCard
                number="04"
                title="24/7 Availability"
                description="Cloud-based platform ensures your question bank is accessible whenever you need it."
              />
            </div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2">
            <div className="lg:ml-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Measurable Advantages</h2>
              <p className="text-silver-light text-lg mb-8">
                QBank delivers quantifiable benefits that transform how educational institutions approach assessment.
              </p>
              
              <div className="tech-frame rounded-lg overflow-hidden">
                <div className="bg-gradient-to-br from-black/60 to-black/80 p-6 border border-silver/20">
                  <blockquote className="text-lg italic text-silver-light mb-4">
                    "QBank has revolutionized our assessment strategy. The time saved and insights gained have been invaluable to our institution."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-silver/30 mr-3"></div>
                    <div>
                      <p className="font-medium">Dr. Sarah Chen</p>
                      <p className="text-sm text-silver">Director of Education, Tech University</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="tech-frame border border-silver/20 rounded-lg overflow-hidden hover:border-qred/30 transition-colors bg-black/40">
    <div className="p-5">
      <span className="text-qred font-mono text-sm">{number}</span>
      <h3 className="text-xl font-semibold my-2">{title}</h3>
      <p className="text-silver-light">{description}</p>
    </div>
  </div>
);

export default Benefits;
