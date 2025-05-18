
import React from "react";
import { Star, MoreVertical, Clock } from "lucide-react";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface QBankListItemProps {
  qbank: {
    id: number;
    title: string;
    topic: string;
    questions: number;
    difficulty: string;
    rating: number;
    lastAccessed?: string;
  };
}

const QBankListItem = ({ qbank }: QBankListItemProps) => {
  return (
    <Card className="tech-frame bg-black/40 border border-silver/20 hover:border-qred/30 transition-colors overflow-hidden hover-glow">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div>
              <h3 className="font-semibold text-white truncate max-w-[200px] sm:max-w-none">{qbank.title}</h3>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-silver">{qbank.topic}</span>
                <span className="mx-2 text-silver/30">•</span>
                <span className="text-silver">{qbank.questions} questions</span>
                {qbank.lastAccessed && (
                  <>
                    <span className="mx-2 text-silver/30">•</span>
                    <span className="flex items-center text-silver">
                      <Clock className="h-3 w-3 mr-1" />
                      {qbank.lastAccessed}
                    </span>
                  </>
                )}
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={`
                border-silver/20 hidden sm:flex
                ${qbank.difficulty === 'Advanced' ? 'text-qred' : 'text-silver-light'}
              `}
            >
              {qbank.difficulty}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center text-silver-light">
              <Star className="h-4 w-4 fill-qred text-qred mr-1" />
              {qbank.rating}
            </div>
            <Button variant="ghost" size="icon" className="text-silver hover:text-white hover:bg-silver/10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-silver hover:text-white hover:bg-silver/10">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/90 border-silver/20 text-white">
                  <DropdownMenuItem className="hover:bg-silver/10">Open</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-silver/10">Edit</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-silver/10">Share</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-silver/10 text-qred">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QBankListItem;
