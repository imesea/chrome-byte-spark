
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, BookOpen, Clock, Award, Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="tech-frame bg-black/40 border-silver/20">
          <CardHeader className="text-center relative">
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="text-silver">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-qred to-qred-dark flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">JP</span>
            </div>
            <CardTitle className="text-white">John Parker</CardTitle>
            <p className="text-silver">Medical Student</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="text-silver mr-3 h-5 w-5" />
                <div>
                  <p className="text-xs text-silver">Username</p>
                  <p className="text-white">jparker224</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="text-silver mr-3 h-5 w-5" />
                <div>
                  <p className="text-xs text-silver">Email</p>
                  <p className="text-white">john.parker@example.com</p>
                </div>
              </div>
              <Separator className="bg-silver/10" />
              <div className="space-y-3">
                <h3 className="font-medium text-white">Primary Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-silver/10 text-silver-light py-1 px-2 rounded-full">Medical</span>
                  <span className="text-xs bg-silver/10 text-silver-light py-1 px-2 rounded-full">USMLE</span>
                  <span className="text-xs bg-silver/10 text-silver-light py-1 px-2 rounded-full">Anatomy</span>
                  <span className="text-xs bg-silver/10 text-silver-light py-1 px-2 rounded-full">Pathology</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Activity & Performance */}
        <Card className="tech-frame bg-black/40 border-silver/20 lg:col-span-2">
          <Tabs defaultValue="activity">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Profile Details</CardTitle>
                <TabsList className="bg-black/40 border border-silver/20">
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="activity" className="space-y-4 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="tech-frame bg-black/20 rounded-lg p-4 border border-silver/10">
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-5 w-5 text-qred mr-2" />
                      <h3 className="font-medium text-white">QBanks</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">24</p>
                    <p className="text-sm text-silver">Total Created/Saved</p>
                  </div>
                  <div className="tech-frame bg-black/20 rounded-lg p-4 border border-silver/10">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-qred mr-2" />
                      <h3 className="font-medium text-white">Study Time</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">128</p>
                    <p className="text-sm text-silver">Hours Total</p>
                  </div>
                  <div className="tech-frame bg-black/20 rounded-lg p-4 border border-silver/10">
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-qred mr-2" />
                      <h3 className="font-medium text-white">Streak</h3>
                    </div>
                    <p className="text-3xl font-bold text-white">16</p>
                    <p className="text-sm text-silver">Days Straight</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center p-3 bg-silver/5 rounded-md border border-silver/10">
                        <div className="h-8 w-8 rounded-md bg-black/40 flex items-center justify-center mr-3">
                          <BookOpen className="h-4 w-4 text-qred" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">
                            {i % 2 === 0 ? "Completed test session" : "Created a new QBank"}
                          </p>
                          <p className="text-xs text-silver">
                            {i % 2 === 0 ? "USMLE Step 1: Cardiovascular System" : "Pharmacology Core Concepts"}
                          </p>
                        </div>
                        <p className="text-xs text-silver">{i + 1}d ago</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Subject Performance</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-silver">Anatomy</span>
                        <span className="text-silver-light">87%</span>
                      </div>
                      <Progress value={87} className="h-2 bg-silver/10" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-silver">Pathology</span>
                        <span className="text-silver-light">72%</span>
                      </div>
                      <Progress value={72} className="h-2 bg-silver/10" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-silver">Pharmacology</span>
                        <span className="text-silver-light">65%</span>
                      </div>
                      <Progress value={65} className="h-2 bg-silver/10" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-silver">Microbiology</span>
                        <span className="text-silver-light">81%</span>
                      </div>
                      <Progress value={81} className="h-2 bg-silver/10" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="tech-frame bg-black/20 border border-silver/10 rounded-lg p-4 text-center">
                      <div className="mx-auto h-14 w-14 rounded-full bg-silver/5 flex items-center justify-center mb-2">
                        <Award className={`h-6 w-6 ${i < 5 ? "text-qred" : "text-silver/30"}`} />
                      </div>
                      <h4 className="text-sm font-medium text-white mb-1">Achievement {i + 1}</h4>
                      <p className="text-xs text-silver">
                        {i < 5 ? "Unlocked" : "Locked"}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
