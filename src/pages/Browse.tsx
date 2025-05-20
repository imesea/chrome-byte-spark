
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QBankCard from "@/components/QBankCard";
import FilterSidebar from "@/components/FilterSidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockQBanks = [
  { 
    id: 1, 
    title: "USMLE Step 1 Comprehensive", 
    topic: "Medical", 
    questions: 1500, 
    difficulty: "Advanced", 
    rating: 4.9 
  },
  { 
    id: 2, 
    title: "CompTIA A+ Certification", 
    topic: "IT", 
    questions: 800, 
    difficulty: "Intermediate", 
    rating: 4.7 
  },
  { 
    id: 3, 
    title: "AP Calculus Review", 
    topic: "Mathematics", 
    questions: 650, 
    difficulty: "Advanced", 
    rating: 4.8 
  },
  { 
    id: 4, 
    title: "IELTS Academic Preparation", 
    topic: "Language", 
    questions: 420, 
    difficulty: "Intermediate", 
    rating: 4.6 
  },
  { 
    id: 5, 
    title: "AWS Solutions Architect", 
    topic: "Cloud Computing", 
    questions: 550, 
    difficulty: "Advanced", 
    rating: 4.9 
  },
  { 
    id: 6, 
    title: "CPA Exam Review", 
    topic: "Accounting", 
    questions: 900, 
    difficulty: "Advanced", 
    rating: 4.8 
  },
];

const Browse = () => {
  const [filterVisible, setFilterVisible] = useState(true);

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Browse Question Banks</h1>
        <Button className="bg-qred hover:bg-qred-light">
          Create QBank
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 relative">
        <div className="flex-1">
          <Tabs defaultValue="recommended">
            <div className="mb-6">
              <TabsList className="bg-black/40 border border-silver/20">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="recommended" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockQBanks.map((qbank) => (
                  <QBankCard key={qbank.id} qbank={qbank} />
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="border-silver/20 text-silver">
                  Load More
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockQBanks.slice().reverse().map((qbank) => (
                  <QBankCard key={qbank.id} qbank={qbank} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockQBanks.slice(0, 3).map((qbank) => (
                  <QBankCard key={qbank.id} qbank={qbank} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className={`fixed right-0 top-[4rem] bottom-0 z-30 transition-all duration-300 ${filterVisible ? 'md:w-80 px-4' : 'md:w-12'}`}>
          <div className="hidden md:flex justify-start mb-4 pt-4">
            <Button
              variant="outline"
              className="border-silver/20 text-silver h-8 w-8 p-0"
              onClick={toggleFilter}
            >
              {filterVisible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <div className={filterVisible ? 'block' : 'hidden md:block md:invisible'}>
            <FilterSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
