import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, Grid, List, BookOpen, Star, Clock } from "lucide-react";
import QBankCard from "@/components/QBankCard";
import QBankListItem from "@/components/QBankListItem";
import { Link } from "react-router-dom";

// Mock data for the question banks
const mockQbanks = [
  {
    id: 1,
    title: "Advanced Organic Chemistry",
    topic: "Chemistry",
    questions: 120,
    difficulty: "Advanced",
    rating: 4.8,
    lastAccessed: "2 days ago",
  },
  {
    id: 2,
    title: "General Physics I",
    topic: "Physics",
    questions: 85,
    difficulty: "Intermediate",
    rating: 4.5,
    lastAccessed: "Yesterday",
  },
  {
    id: 3,
    title: "Calculus and Linear Algebra",
    topic: "Mathematics",
    questions: 150,
    difficulty: "Advanced",
    rating: 4.9,
    lastAccessed: "3 hours ago",
  },
  {
    id: 4,
    title: "Introduction to Biology",
    topic: "Biology",
    questions: 95,
    difficulty: "Beginner",
    rating: 4.2,
    lastAccessed: "1 week ago",
  },
  {
    id: 5,
    title: "Computer Science Fundamentals",
    topic: "Computer Science",
    questions: 110,
    difficulty: "Intermediate",
    rating: 4.7,
    lastAccessed: "3 days ago",
  },
];

const MyQbanks = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQbanks = mockQbanks.filter(qbank => 
    qbank.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    qbank.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white">My Question Banks</h1>
            <Button asChild className="bg-qred hover:bg-qred-light transition-colors">
              <Link to="/create-qbank">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create QBank
              </Link>
            </Button>
          </div>
          <p className="text-silver">
            Access and manage your personal collection of question banks.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-silver" />
              <Input 
                placeholder="Search your QBanks..." 
                className="pl-10 bg-black/40 border-silver/20 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className={`border-silver/20 ${viewMode === 'grid' ? 'bg-silver/20 text-white' : 'text-silver'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`border-silver/20 ${viewMode === 'list' ? 'bg-silver/20 text-white' : 'text-silver'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-black/40 border border-silver/20 text-silver">
              <TabsTrigger value="all" className="data-[state=active]:bg-silver/20 data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="created" className="data-[state=active]:bg-silver/20 data-[state=active]:text-white">
                Created by Me
              </TabsTrigger>
              <TabsTrigger value="shared" className="data-[state=active]:bg-silver/20 data-[state=active]:text-white">
                Shared with Me
              </TabsTrigger>
              <TabsTrigger value="favorite" className="data-[state=active]:bg-silver/20 data-[state=active]:text-white">
                Favorites
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              {filteredQbanks.length > 0 ? (
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col space-y-3'}`}>
                  {filteredQbanks.map(qbank => (
                    viewMode === 'grid' ? (
                      <QBankCard key={qbank.id} qbank={qbank} />
                    ) : (
                      <QBankListItem key={qbank.id} qbank={qbank} />
                    )
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <BookOpen className="h-16 w-16 text-silver/40 mb-4" />
                  <h3 className="text-xl font-semibold text-white">No Question Banks Found</h3>
                  <p className="text-silver mt-2 max-w-md">
                    {searchQuery ? `No results found for "${searchQuery}". Try a different search term.` : "You haven't created or saved any question banks yet."}
                  </p>
                  {!searchQuery && (
                    <Button asChild className="mt-6 bg-qred hover:bg-qred-light transition-colors">
                      <Link to="/create-qbank">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Your First QBank
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Other tab contents would follow the same pattern, but for brevity we'll just implement placeholders */}
            {['created', 'shared', 'favorite'].map(tab => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  {tab === 'created' && <PlusCircle className="h-16 w-16 text-silver/40 mb-4" />}
                  {tab === 'shared' && <BookOpen className="h-16 w-16 text-silver/40 mb-4" />}
                  {tab === 'favorite' && <Star className="h-16 w-16 text-silver/40 mb-4" />}
                  <h3 className="text-xl font-semibold text-white">
                    {tab === 'created' && "No Created QBanks"}
                    {tab === 'shared' && "No Shared QBanks"}
                    {tab === 'favorite' && "No Favorite QBanks"}
                  </h3>
                  <p className="text-silver mt-2 max-w-md">
                    {tab === 'created' && "You haven't created any question banks yet."}
                    {tab === 'shared' && "No question banks have been shared with you."}
                    {tab === 'favorite' && "You haven't marked any question banks as favorite."}
                  </p>
                  {tab === 'created' && (
                    <Button asChild className="mt-6 bg-qred hover:bg-qred-light transition-colors">
                      <Link to="/create-qbank">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create QBank
                      </Link>
                    </Button>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyQbanks;
