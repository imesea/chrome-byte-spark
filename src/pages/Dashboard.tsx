
import React from "react";
import { 
  BookOpen, 
  Clock,
  BarChart3,
  Trophy,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QBankCard from "@/components/QBankCard";

const recentQBanks = [
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
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
        <Button className="bg-qred hover:bg-qred-light">
          Quick Start
        </Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStat 
          icon={BookOpen} 
          title="Study Sessions" 
          value="23" 
          trend="+5 this week" 
          trendUp={true} 
        />
        <DashboardStat 
          icon={Clock} 
          title="Total Hours" 
          value="47.5" 
          trend="+3.2 hrs this week" 
          trendUp={true} 
        />
        <DashboardStat 
          icon={BarChart3} 
          title="Avg. Score" 
          value="78%" 
          trend="+2% improvement" 
          trendUp={true} 
        />
        <DashboardStat 
          icon={Trophy} 
          title="Completed QBanks" 
          value="5" 
          trend="2 in progress" 
          trendUp={false} 
        />
      </div>
      
      {/* Recent Activity & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 tech-frame bg-black/40 border-silver/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-silver">Your recent study sessions and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-silver/5 rounded-md border border-silver/10">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-black/40 flex items-center justify-center mr-3">
                      <BookOpen className="h-5 w-5 text-qred" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Study Session {i + 1}</h4>
                      <p className="text-sm text-silver">
                        {i % 2 === 0 ? "USMLE Practice Questions" : "CompTIA Security+ Review"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-silver-light">{Math.floor(Math.random() * 50 + 50)}% score</p>
                    <p className="text-sm text-silver">{i + 1} hour{i > 0 ? "s" : ""} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="tech-frame bg-black/40 border-silver/20">
          <CardHeader>
            <CardTitle className="text-white">Study Goals</CardTitle>
            <CardDescription className="text-silver">Track your weekly targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-silver">Questions Answered</span>
                  <span className="text-silver-light">245/300</span>
                </div>
                <Progress value={82} className="h-2 bg-silver/10" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-silver">Study Time</span>
                  <span className="text-silver-light">8/10 hrs</span>
                </div>
                <Progress value={80} className="h-2 bg-silver/10" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-silver">QBanks Completed</span>
                  <span className="text-silver-light">1/2</span>
                </div>
                <Progress value={50} className="h-2 bg-silver/10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Continue Studying */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Continue Studying</h2>
          <Button variant="link" className="text-qred">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentQBanks.map((qbank) => (
            <QBankCard key={qbank.id} qbank={qbank} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface DashboardStatProps {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

const DashboardStat = ({ icon: Icon, title, value, trend, trendUp }: DashboardStatProps) => (
  <div className="tech-frame bg-black/40 rounded-lg border border-silver/20 p-4 flex flex-col">
    <div className="flex justify-between items-start">
      <h3 className="text-silver font-medium">{title}</h3>
      <div className="h-8 w-8 rounded-md bg-silver/5 flex items-center justify-center">
        <Icon className="h-4 w-4 text-silver-light" />
      </div>
    </div>
    <div className="mt-2">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className={`text-xs mt-1 ${trendUp ? "text-qred" : "text-silver"}`}>
        {trend}
      </p>
    </div>
  </div>
);

export default Dashboard;
