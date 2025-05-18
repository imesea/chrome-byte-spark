
import React, { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const categories = [
  { id: "topic", label: "Topic", options: ["Mathematics", "Science", "Language", "IT", "Medical", "Business", "Engineering"] },
  { id: "exam", label: "Exam Type", options: ["SAT", "ACT", "GRE", "GMAT", "MCAT", "USMLE", "CompTIA", "AWS"] },
  { id: "level", label: "Education Level", options: ["Primary", "Secondary", "Undergraduate", "Postgraduate", "Professional"] },
  { id: "difficulty", label: "Difficulty", options: ["Beginner", "Intermediate", "Advanced", "Expert"] },
];

const FilterSidebar = () => {
  const [mobileVisible, setMobileVisible] = useState(false);
  const [expanded, setExpanded] = useState<{[key: string]: boolean}>({
    topic: true,
    exam: true,
    level: false,
    difficulty: false
  });
  
  const toggleCategory = (id: string) => {
    setExpanded({...expanded, [id]: !expanded[id]});
  };
  
  return (
    <div>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full border-silver/20 text-silver flex justify-between"
          onClick={() => setMobileVisible(!mobileVisible)}
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </div>
          {mobileVisible ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Filter content */}
      <div 
        className={cn(
          "tech-frame bg-black/40 border border-silver/20 rounded-lg overflow-hidden",
          mobileVisible ? "block" : "hidden md:block"
        )}
      >
        <div className="p-4">
          <h2 className="text-white font-semibold text-lg mb-4">Filters</h2>
          
          {categories.map((category, index) => (
            <div key={category.id} className="mb-4">
              <button 
                className="flex items-center justify-between w-full text-white font-medium mb-2"
                onClick={() => toggleCategory(category.id)}
              >
                {category.label}
                {expanded[category.id] ? 
                  <ChevronUp className="h-4 w-4 text-silver" /> : 
                  <ChevronDown className="h-4 w-4 text-silver" />
                }
              </button>
              
              {expanded[category.id] && (
                <div className="space-y-2 ml-1">
                  {category.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox id={`${category.id}-${option}`} />
                      <label 
                        htmlFor={`${category.id}-${option}`}
                        className="text-silver text-sm cursor-pointer"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {index < categories.length - 1 && (
                <Separator className="my-4 bg-silver/10" />
              )}
            </div>
          ))}
          
          <div className="mt-6 flex space-x-2">
            <Button variant="outline" className="flex-1 border-silver/20 text-silver">
              Reset
            </Button>
            <Button className="flex-1 bg-qred hover:bg-qred-light">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
