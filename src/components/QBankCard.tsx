
import React from "react";
import { Star, Plus } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface QBankCardProps {
  qbank: {
    id: number;
    title: string;
    topic: string;
    questions: number;
    difficulty: string;
    rating: number;
  };
}

const QBankCard = ({ qbank }: QBankCardProps) => {
  return (
    <Card className="tech-frame bg-black/40 border border-silver/20 hover:border-qred/30 transition-colors overflow-hidden hover-glow relative">
      <div className="absolute -top-1 -right-1 z-10">
        <button 
          className="bg-qred hover:bg-qred-light text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform hover:scale-110"
          aria-label="Subscribe to this QBank"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-white line-clamp-2">{qbank.title}</h3>
            <p className="text-silver text-sm">{qbank.topic}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="w-full h-2 bg-silver/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-qred" 
            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
          ></div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 text-sm">
        <div className="text-silver">
          {qbank.questions} questions
        </div>
        <div className="flex items-center text-silver-light">
          <Star className="h-4 w-4 fill-qred text-qred mr-1" />
          {qbank.rating}
        </div>
      </CardFooter>
    </Card>
  );
};

export default QBankCard;
