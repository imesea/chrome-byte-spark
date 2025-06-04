
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
  X,
  CheckCircle,
  XCircle,
  Lightbulb,
  Target,
  TrendingUp
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

  return (
    <div className="h-screen bg-gradient-to-b from-[#111111] to-[#1a1a1a] text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-silver/10 bg-black/40 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-semibold text-white">USMLE Step 1 - Tutor Mode</h1>
            <div className="flex items-center space-x-2 text-silver">
              <BookOpen className="h-4 w-4" />
              <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
            </div>
            <div className="flex items-center space-x-2 text-silver">
              <span className="text-sm">Answered: {answeredCount}/{mockQuestions.length}</span>
            </div>
            <div className="flex items-center space-x-2 text-silver">
              <span className="text-sm">Submitted: {submittedCount}/{mockQuestions.length}</span>
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

      <div className="flex flex-1 overflow-hidden">
        {/* Question Navigation Sidebar */}
        <div className="w-20 border-r border-silver/10 bg-black/40 p-3 overflow-y-auto flex-shrink-0">
          <div className="space-y-2">
            {mockQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-14 h-14 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 relative ${
                  index === currentQuestion 
                    ? "bg-qred text-white shadow-lg" 
                    : submittedQuestions.has(index)
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : selectedAnswers[index] !== undefined
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
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
              <span>Submitted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-yellow-600"></div>
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
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            {/* Question Panel - Left Half */}
            <div className="flex-1 p-6 overflow-y-auto">
              <Card className="shadow-xl h-full">
                <CardContent className="p-8 bg-white text-black h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-2xl font-bold text-black">Question {currentQuestion + 1}</h2>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Tutor Mode
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
                  
                  <div className="prose prose-lg max-w-none text-black mb-8 flex-1">
                    <p className="leading-relaxed text-lg">
                      {currentQuestionData.text}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {currentQuestionData.options.map((option, index) => {
                      let buttonClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200";
                      
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
                          buttonClass += " border-qred bg-qred/5 text-black shadow-md";
                        } else {
                          buttonClass += " border-gray-200 hover:border-gray-300 bg-white text-black hover:shadow-md";
                        }
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => !isCurrentQuestionSubmitted && handleAnswerSelect(index)}
                          disabled={isCurrentQuestionSubmitted}
                          className={buttonClass}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                              isCurrentQuestionSubmitted 
                                ? index === currentQuestionData.correctAnswer
                                  ? "border-green-500 bg-green-500 text-white"
                                  : index === selectedAnswer && index !== currentQuestionData.correctAnswer
                                  ? "border-red-500 bg-red-500 text-white"
                                  : "border-gray-300 text-gray-600"
                                : selectedAnswer === index
                                ? "border-qred bg-qred text-white"
                                : "border-gray-300 text-gray-600"
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="flex-1 text-lg leading-relaxed">{option}</span>
                            {isCurrentQuestionSubmitted && index === currentQuestionData.correctAnswer && (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            )}
                            {isCurrentQuestionSubmitted && index === selectedAnswer && index !== currentQuestionData.correctAnswer && (
                              <XCircle className="h-6 w-6 text-red-500" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {!isCurrentQuestionSubmitted && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        onClick={handleSubmitQuestion}
                        disabled={selectedAnswer === undefined}
                        className="bg-qred hover:bg-qred/90 text-white px-8 py-3"
                        size="lg"
                      >
                        Submit Answer
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Explanation Panel - Right Half */}
            {isCurrentQuestionSubmitted && (
              <div className="flex-1 p-6 overflow-y-auto border-l border-silver/10">
                <div className="space-y-6">
                  {/* Result Banner */}
                  <Card className={`${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        {isCorrect ? (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                          <XCircle className="h-8 w-8 text-red-600" />
                        )}
                        <div>
                          <h3 className={`text-xl font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                          </h3>
                          <p className={`${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            You selected: {currentQuestionData.options[selectedAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-600">
                              Correct answer: {currentQuestionData.options[currentQuestionData.correctAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation */}
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <h4 className="text-lg font-semibold text-black">Explanation</h4>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {currentQuestionData.explanation.correct}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Why Other Options Are Wrong */}
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Target className="h-5 w-5 text-red-500" />
                        <h4 className="text-lg font-semibold text-black">Why Other Options Are Incorrect</h4>
                      </div>
                      <div className="space-y-3">
                        {Object.entries(currentQuestionData.explanation.why_others_wrong).map(([index, explanation]) => (
                          <div key={index} className="border-l-4 border-red-200 pl-4">
                            <p className="font-medium text-gray-800">
                              {String.fromCharCode(65 + parseInt(index))}. {currentQuestionData.options[parseInt(index)]}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">{explanation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Learning Point */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        <h4 className="text-lg font-semibold text-blue-800">Key Learning Point</h4>
                      </div>
                      <p className="text-blue-700 leading-relaxed">
                        {currentQuestionData.explanation.key_learning}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel */}
          <div className="border-t border-silver/10 bg-black/40 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              {/* Navigation Controls */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="border-silver/20 text-silver hover:bg-silver/10 disabled:opacity-50"
                  size="lg"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === mockQuestions.length - 1}
                  className="bg-qred hover:bg-qred/90 text-white disabled:opacity-50"
                  size="lg"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-silver text-sm">
                <span>Questions Completed: {submittedCount}/{mockQuestions.length}</span>
                <span>Accuracy: {submittedCount > 0 ? Math.round((submittedCount / mockQuestions.length) * 100) : 0}%</span>
                <span>Time per Question: {submittedCount > 0 ? Math.round((7200 - timeRemaining) / submittedCount) : 0}s avg</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="border-silver/20 text-silver hover:bg-silver/10"
                  size="sm"
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Mark & Next
                </Button>
                
                {currentQuestion === mockQuestions.length - 1 ? (
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
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
