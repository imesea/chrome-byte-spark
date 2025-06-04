
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Clock, 
  BookOpen,
  Calculator,
  FileText,
  Maximize,
  Pause,
  SkipForward
} from "lucide-react";

const mockQuestions = [
  {
    id: 1,
    text: "A 56-year-old man presents to the clinic with a 2-week history of multiple, non-healing, red-purple skin lesions on his right forearm and left shoulder. He reports that the lesions started as small bumps but have since grown in size and become painful. He denies any recent trauma, fever, or weight loss, but notes intermittent night sweats. He works as a gardener and enjoys hiking and outdoor activities. He lives alone and has no pets. His medical history is significant for mild hypertension, managed with lisinopril. He does not smoke, drinks alcohol occasionally, and has no history of illicit drug use. He has not traveled recently and is up to date with vaccinations.",
    options: [
      "Kaposi's sarcoma",
      "Cutaneous lymphoma", 
      "Sporotrichosis",
      "Bacillary angiomatosis"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "A 34-year-old woman presents with a 3-month history of progressive fatigue, muscle weakness, and weight loss. She reports difficulty climbing stairs and rising from a seated position. Physical examination reveals proximal muscle weakness in both upper and lower extremities. Laboratory studies show elevated creatine kinase (CK) levels. What is the most appropriate next step in diagnosis?",
    options: [
      "Electromyography (EMG)",
      "Muscle biopsy",
      "MRI of affected muscles",
      "Anti-Jo-1 antibody testing"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    text: "A 28-year-old pregnant woman at 32 weeks gestation presents with sudden onset of severe abdominal pain, vaginal bleeding, and uterine tenderness. Her blood pressure is 160/100 mmHg. Fetal heart rate monitoring shows bradycardia. What is the most likely diagnosis?",
    options: [
      "Placenta previa",
      "Placental abruption",
      "Uterine rupture",
      "Preeclampsia with HELLP syndrome"
    ],
    correctAnswer: 1
  }
];

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111111] to-[#1a1a1a] text-white">
      {/* Header */}
      <div className="border-b border-silver/10 bg-black/40 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-white">USMLE Step 1 Practice</h1>
            <div className="flex items-center space-x-2 text-silver">
              <BookOpen className="h-4 w-4" />
              <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-silver">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-silver/20 text-silver">
                <Maximize className="h-4 w-4 mr-2" />
                Full Screen
              </Button>
              <Button variant="outline" size="sm" className="border-silver/20 text-silver">
                <Calculator className="h-4 w-4 mr-2" />
                Calculator
              </Button>
              <Button variant="outline" size="sm" className="border-silver/20 text-silver">
                <FileText className="h-4 w-4 mr-2" />
                Lab Values
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Question Navigation Sidebar */}
        <div className="w-16 border-r border-silver/10 bg-black/40 p-2">
          <div className="space-y-2">
            {mockQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-12 h-12 rounded flex items-center justify-center text-sm font-medium transition-colors relative ${
                  index === currentQuestion 
                    ? "bg-qred text-white" 
                    : selectedAnswers[index] !== undefined
                    ? "bg-green-600 text-white"
                    : "bg-silver/20 text-silver hover:bg-silver/30"
                }`}
              >
                {index + 1}
                {flaggedQuestions.has(index) && (
                  <Flag className="h-3 w-3 absolute -top-1 -right-1 text-yellow-400 fill-yellow-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Question Card */}
            <Card className="mb-6">
              <CardContent className="p-8 bg-white text-black">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold text-black">Question {currentQuestion + 1}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFlag}
                    className={`${
                      flaggedQuestions.has(currentQuestion)
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Flag
                  </Button>
                </div>
                
                <div className="prose prose-lg max-w-none text-black">
                  <p className="leading-relaxed">
                    {mockQuestions[currentQuestion].text}
                  </p>
                </div>

                <div className="mt-8 space-y-3">
                  {mockQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-qred bg-qred/10 text-black"
                          : "border-gray-200 hover:border-gray-300 bg-white text-black"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-qred bg-qred text-white"
                            : "border-gray-300 text-gray-600"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="border-silver/20 text-silver"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-3">
                <Button variant="outline" className="border-silver/20 text-silver">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <Button variant="outline" className="border-silver/20 text-silver">
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip
                </Button>
              </div>

              <Button
                onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === mockQuestions.length - 1}
                className="bg-qred hover:bg-qred-light"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Submit Button for Last Question */}
            {currentQuestion === mockQuestions.length - 1 && (
              <div className="mt-6 text-center">
                <Button className="bg-green-600 hover:bg-green-700 px-8">
                  Submit Exam
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
