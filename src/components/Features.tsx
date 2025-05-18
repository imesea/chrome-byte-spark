
import React from "react";
import { Database, ChartBar, Shield, Cpu } from "lucide-react";

const features = [
  {
    title: "Intelligent Question Generation",
    description: "AI-powered system creates high-quality questions across different difficulty levels and formats.",
    icon: Cpu
  },
  {
    title: "Advanced Analytics",
    description: "Get detailed insights into performance metrics and identify knowledge gaps with precision.",
    icon: ChartBar
  },
  {
    title: "Secure Item Bank",
    description: "Military-grade encryption ensures your questions and assessments remain confidential.",
    icon: Shield
  },
  {
    title: "Seamless Integration",
    description: "Connect with your existing LMS platforms with our comprehensive API and plugin system.",
    icon: Database
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cutting-Edge Technology</h2>
          <p className="text-silver-light text-lg">
            QBank combines sophisticated algorithms with intuitive design to revolutionize assessment creation and management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="tech-frame bg-black/40 rounded-lg p-6 border border-silver/20 hover:border-qred/30 transition-colors hover-glow"
            >
              <div className="h-12 w-12 bg-silver/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-qred" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-silver-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
