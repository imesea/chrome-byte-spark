
import React, { useState, useEffect } from "react";
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
  SkipForward,
  X
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
  },
  {
    id: 4,
    text: "A 45-year-old male presents with chest pain that started 2 hours ago. The pain is substernal, crushing in nature, and radiates to his left arm. He appears diaphoretic and nauseous. His past medical history includes diabetes mellitus type 2 and hyperlipidemia. Vital signs: BP 140/90, HR 102, RR 18, O2 sat 97% on room air. ECG shows ST-segment elevation in leads II, III, and aVF. What is the most likely diagnosis?",
    options: [
      "Anterior STEMI",
      "Inferior STEMI",
      "Unstable angina",
      "Aortic dissection"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "A 67-year-old woman with a history of atrial fibrillation presents with sudden onset of severe abdominal pain, nausea, and vomiting. Physical examination reveals a distended abdomen with minimal bowel sounds. CT scan shows dilated small bowel loops with a transition point in the mid-small bowel. What is the most likely cause of her symptoms?",
    options: [
      "Adhesive small bowel obstruction",
      "Mesenteric ischemia",
      "Incarcerated hernia",
      "Inflammatory bowel disease"
    ],
    correctAnswer: 1
  }
];

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused, timeRemaining]);

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
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="h-screen bg-gradient-to-b from-[#111111] to-[#1a1a1a] text-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-silver/10 bg-black/40 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-semibold text-white">USMLE Step 1 Practice Exam</h1>
            <div className="flex items-center space-x-2 text-silver">
              <BookOpen className="h-4 w-4" />
              <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
            </div>
            <div className="flex items-center space-x-2 text-silver">
              <span className="text-sm">Answered: {answeredCount}/{mockQuestions.length}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-silver">
              <Clock className="h-4 w-4" />
              <span className={`font-mono text-lg ${timeRemaining < 600 ? 'text-qred' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-silver/20 text-silver hover:bg-silver/10"
                onClick={() => setIsPaused(!isPaused)}
              >
                <Pause className="h-4 w-4 mr-2" />
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button variant="outline" size="sm" className="border-silver/20 text-silver hover:bg-silver/10">
                <Calculator className="h-4 w-4 mr-2" />
                Calculator
              </Button>
              <Button variant="outline" size="sm" className="border-silver/20 text-silver hover:bg-silver/10">
                <FileText className="h-4 w-4 mr-2" />
                Lab Values
              </Button>
              <Button variant="outline" size="sm" className="border-silver/20 text-silver hover:bg-silver/10">
                <Maximize className="h-4 w-4 mr-2" />
                Full Screen
              </Button>
              <Button variant="outline" size="sm" className="border-qred text-qred hover:bg-qred/10">
                <X className="h-4 w-4 mr-2" />
                End Exam
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-4">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-sm text-silver min-w-fit">{Math.round(progress)}% complete</span>
        </div>
      </div>

      <div className="flex h-full">
        {/* Question Navigation Sidebar */}
        <div className="w-20 border-r border-silver/10 bg-black/40 p-3 overflow-y-auto">
          <div className="space-y-2">
            {mockQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-14 h-14 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 relative ${
                  index === currentQuestion 
                    ? "bg-qred text-white shadow-lg" 
                    : selectedAnswers[index] !== undefined
                    ? "bg-green-600 text-white hover:bg-green-700"
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
          
          {/* Legend */}
          <div className="mt-6 space-y-2 text-xs text-silver">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-green-600"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-qred"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-silver/20"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Question Card */}
            <Card className="mb-8 shadow-xl">
              <CardContent className="p-10 bg-white text-black">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-black">Question {currentQuestion + 1}</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {mockQuestions.length} questions total
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFlag}
                    className={`${
                      flaggedQuestions.has(currentQuestion)
                        ? "bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                  </Button>
                </div>
                
                <div className="prose prose-lg max-w-none text-black mb-8">
                  <p className="leading-relaxed text-lg">
                    {mockQuestions[currentQuestion].text}
                  </p>
                </div>

                <div className="space-y-4">
                  {mockQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-qred bg-qred/5 text-black shadow-md"
                          : "border-gray-200 hover:border-gray-300 bg-white text-black hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-qred bg-qred text-white"
                            : "border-gray-300 text-gray-600"
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1 text-lg leading-relaxed">{option}</span>
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
                className="border-silver/20 text-silver hover:bg-silver/10 disabled:opacity-50"
                size="lg"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Previous Question
              </Button>

              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  className="border-silver/20 text-silver hover:bg-silver/10"
                  size="lg"
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Mark & Next
                </Button>
              </div>

              {currentQuestion === mockQuestions.length - 1 ? (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  Submit Exam
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
                  className="bg-qred hover:bg-qred/90 text-white"
                  size="lg"
                >
                  Next Question
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
