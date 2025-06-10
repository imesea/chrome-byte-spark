
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
  X,
  CheckCircle,
  XCircle,
  Lightbulb,
  Target,
  TrendingUp,
  ClipboardSignature,
  Layers
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
    correctAnswer: 2,
    explanation: {
      correct: "Sporotrichosis is the correct answer. This fungal infection typically affects gardeners and outdoor workers who have contact with soil, plants, or organic matter. The characteristic presentation includes painless nodular lesions that progress proximally along lymphatic channels (sporotrichoid pattern). The patient's occupation as a gardener and the described lesion pattern are classic for sporotrichosis.",
      why_others_wrong: {
        0: "Kaposi's sarcoma typically occurs in immunocompromised patients and presents as purple-red plaques or nodules, but the patient has no risk factors for immunocompromise.",
        1: "Cutaneous lymphoma usually presents as patches, plaques, or tumors that may be pruritic, but the occupational exposure and lesion pattern don't fit.",
        3: "Bacillary angiomatosis occurs primarily in immunocompromised patients (especially HIV) and is caused by Bartonella species, which doesn't match this presentation."
      },
      key_learning: "Always consider occupational exposures when evaluating skin lesions. Sporotrichosis should be suspected in patients with soil/plant exposure who develop nodular lesions with lymphangitic spread."
    }
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
    correctAnswer: 0,
    explanation: {
      correct: "Electromyography (EMG) is the most appropriate next step. EMG can help differentiate between myopathic and neurogenic causes of weakness and guide further testing. In inflammatory myopathies, EMG typically shows myopathic changes including short-duration, low-amplitude motor unit potentials with early recruitment.",
      why_others_wrong: {
        1: "Muscle biopsy is invasive and should be reserved for cases where EMG and other tests are inconclusive or when specific histological diagnosis is needed.",
        2: "MRI can be helpful but is typically used after EMG to identify the best site for potential biopsy or to assess disease extent.",
        3: "Anti-Jo-1 antibody testing is specific for antisynthetase syndrome but should be part of a broader autoimmune workup after confirming myopathy."
      },
      key_learning: "The diagnostic approach to muscle weakness should follow a systematic pattern: clinical assessment → EMG → specific antibody testing → imaging → biopsy if needed."
    }
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
    correctAnswer: 1,
    explanation: {
      correct: "Placental abruption is the most likely diagnosis. The classic triad includes abdominal pain, vaginal bleeding, and uterine tenderness. The sudden onset, fetal bradycardia, and hypertension all support this diagnosis. Abruption can be associated with hypertensive disorders of pregnancy.",
      why_others_wrong: {
        0: "Placenta previa typically presents with painless vaginal bleeding and no uterine tenderness.",
        2: "Uterine rupture is less common and usually occurs during labor, especially in patients with prior cesarean sections.",
        3: "HELLP syndrome can cause abdominal pain but wouldn't typically present with vaginal bleeding and fetal bradycardia in this acute manner."
      },
      key_learning: "Remember the classic triad of placental abruption: pain, bleeding, and uterine tenderness. Fetal compromise (bradycardia) indicates severity and need for immediate delivery."
    }
  }
];

const Exam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<number>>(new Set());
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

  const handleSubmitQuestion = () => {
    if (selectedAnswers[currentQuestion] !== undefined) {
      setSubmittedQuestions(prev => new Set([...prev, currentQuestion]));
    }
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
  const submittedCount = submittedQuestions.size;
  const isCurrentQuestionSubmitted = submittedQuestions.has(currentQuestion);
  const currentQuestionData = mockQuestions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === currentQuestionData.correctAnswer;

  const getQuestionStatus = (index: number) => {
    if (submittedQuestions.has(index)) {
      const answer = selectedAnswers[index];
      return answer === mockQuestions[index].correctAnswer ? 'correct' : 'incorrect';
    }
    if (selectedAnswers[index] !== undefined) return 'answered';
    return 'unanswered';
  };

  return (
    <div className="h-screen bg-gradient-to-b from-[#111111] to-[#1a1a1a] text-white overflow-hidden flex flex-col">
      {/* Streamlined Header */}
      <div className="border-b border-silver/10 bg-black/40 px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-base font-semibold text-white">USMLE Step 1</h1>
            <div className="flex items-center space-x-3 text-silver text-xs">
              <div className="flex items-center space-x-1">
                <BookOpen className="h-3 w-3" />
                <span>{currentQuestion + 1}/{mockQuestions.length}</span>
              </div>
              <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs">Tutor</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Moved Navigation Controls */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="border-silver/20 text-silver hover:bg-silver/10 disabled:opacity-50 h-6 px-2 text-xs"
            >
              <ChevronLeft className="h-3 w-3 mr-1" />
              {/* Previous */}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === mockQuestions.length - 1}
              className="border-silver/20 text-silver hover:bg-silver/10 disabled:opacity-50 h-6 px-2 text-xs"
            >
              {/* Next */}
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>

            <div className="flex items-center space-x-1 text-silver text-xs">
              <Clock className="h-3 w-3" />
              <span className={`font-mono ${timeRemaining < 600 ? 'text-qred' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-silver/20 text-silver hover:bg-silver/10 h-6 px-2 text-xs"
                onClick={() => setIsPaused(!isPaused)}
              >
                <Pause className="h-2.5 w-2.5" />
              </Button>
              <Button variant="outline" size="sm" className="border-silver/20 text-silver hover:bg-silver/10 h-6 px-2 text-xs">
                <Calculator className="h-2.5 w-2.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-silver/20 text-silver hover:bg-silver/10 h-6 px-2 text-xs"
                aria-label="Lab Values"
              >
                <FileText className="h-2.5 w-2.5" />
              </Button>
              <Button variant="outline" size="sm" className="border-silver/20 text-silver hover:bg-silver/10 h-6 px-2 text-xs">
                <Maximize className="h-2.5 w-2.5" />
              </Button>
              <Button variant="outline" size="sm" className="border-qred text-qred hover:bg-qred/10 h-6 px-2 text-xs">
                <X className="h-2.5 w-2.5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-1.5 flex items-center space-x-2">
          <Progress value={progress} className="h-1 flex-1" />
          <span className="text-xs text-silver min-w-fit">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question Navigation Sidebar */}
        <div className="w-14 border-r border-silver/10 bg-black/40 p-1.5 overflow-y-auto flex-shrink-0">
          <div className="space-y-1">
            {mockQuestions.map((_, index) => {
              const status = getQuestionStatus(index);
              let buttonClass = "w-10 h-10 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 relative ";
              
              if (index === currentQuestion) {
                buttonClass += "bg-blue-500 text-white shadow-lg ring-1 ring-blue-500/50";
              } else {
                switch (status) {
                  case 'correct':
                    buttonClass += "bg-green-600 text-white hover:bg-green-700";
                    break;
                  case 'incorrect':
                    buttonClass += "bg-red-600 text-white hover:bg-red-700";
                    break;
                  case 'answered':
                    buttonClass += "bg-blue-400 text-white hover:bg-blue-500";
                    break;
                  default:
                    buttonClass += "bg-silver/20 text-silver hover:bg-silver/30";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={buttonClass}
                >
                  {index + 1}
                  {flaggedQuestions.has(index) && (
                    <Flag className="h-2 w-2 absolute -top-0.5 -right-0.5 text-yellow-400 fill-yellow-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            {/* Question Panel - Left Half */}
            <div className="flex-1 p-3 overflow-y-auto">
              <Card className="shadow-xl h-full">
                <CardContent className="p-4 bg-white text-black h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-bold text-black">Question {currentQuestion + 1}</h2>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleFlag}
                      className={`${
                        flaggedQuestions.has(currentQuestion)
                          ? "bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      } h-7 px-2 text-xs`}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                    </Button>
                  </div>
                  
                  {/* Question Text Container */}
                  <div className="mb-4 flex-1 overflow-y-auto">
                    <div className="max-w-2xl">
                      <p className="text-black leading-relaxed text-sm">
                        {currentQuestionData.text}
                      </p>
                    </div>
                  </div>

                  {/* Answer Options Container */}
                  <div className="max-w-2xl">
                    <div className="space-y-2">
                      {currentQuestionData.options.map((option, index) => {
                        let buttonClass = "w-full text-left p-2.5 rounded-xl border transition-all duration-200 text-sm break-words";
                        
                        if (isCurrentQuestionSubmitted) {
                          if (index === currentQuestionData.correctAnswer) {
                            buttonClass += " border-green-500 bg-green-50 text-black";
                          } else if (index === selectedAnswer && index !== currentQuestionData.correctAnswer) {
                            buttonClass += " border-red-500 bg-red-50 text-black";
                          } else {
                            buttonClass += " border-gray-200 bg-gray-50 text-gray-600";
                          }
                        } else {
                          if (selectedAnswer === index) {
                            buttonClass += " border-blue-500 bg-blue-50 text-black shadow-sm";
                          } else {
                            buttonClass += " border-gray-200 hover:border-gray-300 bg-white text-black hover:shadow-sm";
                          }
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => !isCurrentQuestionSubmitted && handleAnswerSelect(index)}
                            disabled={isCurrentQuestionSubmitted}
                            className={buttonClass}
                          >
                            <div className="flex items-start space-x-2.5">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                isCurrentQuestionSubmitted 
                                  ? index === currentQuestionData.correctAnswer
                                    ? "border-green-500 bg-green-500 text-white"
                                    : index === selectedAnswer && index !== currentQuestionData.correctAnswer
                                    ? "border-red-500 bg-red-500 text-white"
                                    : "border-gray-300 text-gray-600"
                                  : selectedAnswer === index
                                  ? "border-blue-500 bg-blue-500 text-white"
                                  : "border-gray-300 text-gray-600"
                              }`}>
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span className="flex-1 leading-relaxed text-left">{option}</span>
                              {isCurrentQuestionSubmitted && index === currentQuestionData.correctAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              )}
                              {isCurrentQuestionSubmitted && index === selectedAnswer && index !== currentQuestionData.correctAnswer && (
                                <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {!isCurrentQuestionSubmitted && (
                      <div className="mt-4 flex justify-start">
                        <Button
                          onClick={handleSubmitQuestion}
                          disabled={selectedAnswer === undefined}
                          className="bg-qred hover:bg-qred/90 text-white px-5 py-2 text-sm"
                        >
                          Submit Answer
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Explanation Panel - Right Half */}
            {isCurrentQuestionSubmitted && (
              <div className="flex-1 p-3 overflow-y-auto border-l border-silver/10">
                <div className="space-y-3">
                  {/* Result Banner */}
                  <Card className={`${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <div>
                          <h3 className={`text-base font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                          </h3>
                          <p className={`text-xs ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            You selected: {currentQuestionData.options[selectedAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-xs text-green-600">
                              Correct answer: {currentQuestionData.options[currentQuestionData.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation */}
                  <Card className="bg-white">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-1.5 mb-2">
                        <Lightbulb className="h-3.5 w-3.5 text-yellow-500" />
                        <h4 className="font-semibold text-black text-sm">Explanation</h4>
                      </div>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        {currentQuestionData.explanation.correct}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Why Other Options Are Wrong */}
                  <Card className="bg-white">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-1.5 mb-2">
                        <Target className="h-3.5 w-3.5 text-red-500" />
                        <h4 className="font-semibold text-black text-sm">Why Other Options Are Incorrect</h4>
                      </div>
                      <div className="space-y-1.5">
                        {Object.entries(currentQuestionData.explanation.why_others_wrong).map(([index, explanation]) => (
                          <div key={index} className="border-l-2 border-red-200 pl-2">
                            <p className="font-medium text-gray-800 text-xs">
                              {String.fromCharCode(65 + parseInt(index))}. {currentQuestionData.options[parseInt(index)]}
                            </p>
                            <p className="text-gray-600 text-xs mt-0.5">{explanation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Learning Point */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-1.5 mb-2">
                        <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                        <h4 className="font-semibold text-blue-800 text-sm">Key Learning Point</h4>
                      </div>
                      <p className="text-blue-700 text-xs leading-relaxed">
                        {currentQuestionData.explanation.key_learning}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Streamlined Bottom Panel */}
          <div className="border-t border-silver/10 bg-black/40 p-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              {/* New Notebook and Flashcards Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="border-silver/20 text-silver hover:bg-silver/10 disabled:opacity-50 h-7 px-3 text-xs"
                >
                  <ClipboardSignature className="h-3 w-3 mr-1" />
                  Notebook
                </Button>
                <Button
                  variant="outline"
                  className="border-silver/20 text-silver hover:bg-silver/10 disabled:opacity-50 h-7 px-3 text-xs"
                >
                  <Layers className="h-3 w-3 mr-1" />
                  Flashcards
                </Button>
              </div>

              {/* Compact Stats */}
              <div className="flex items-center space-x-3 text-silver text-xs">
                <span>Completed: {submittedCount}/{mockQuestions.length}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* This div is kept to ensure Finish Session button remains if needed and layout doesn't break */}
                {currentQuestion === mockQuestions.length - 1 ? (
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white h-7 px-3 text-xs"
                  >
                    Finish Session
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
