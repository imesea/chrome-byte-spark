
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Plus, Save, Upload, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const topics = ["Biology", "Chemistry", "Physics", "Mathematics", "Computer Science", "Literature", "History"];
const examTypes = ["Quiz", "Midterm", "Final", "Standardized Test", "Certification", "Self-Assessment"];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const CreateQBank = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  
  const steps = [
    { id: 0, title: "Basic Information" },
    { id: 1, title: "Questions" },
    { id: 2, title: "Settings" },
    { id: 3, title: "Review & Share" }
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleCancel = () => {
    // Simply navigate back to my-qbanks
    navigate("/my-qbanks");
  };

  const handleSaveDraft = () => {
    // Mock saving draft
    navigate("/my-qbanks");
  };

  const handleFinish = () => {
    // Mock publishing the qbank
    navigate("/my-qbanks");
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-silver hover:text-white"
              onClick={() => navigate("/my-qbanks")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Create Question Bank</h1>
          </div>
          <p className="text-silver ml-9">
            Build your custom question collection in a few simple steps.
          </p>
        </div>

        <div className="tech-frame bg-black/40 border border-silver/20 rounded-lg p-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between w-full">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  {/* Step circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        index <= activeStep
                          ? "border-qred bg-qred/20 text-white"
                          : "border-silver/30 text-silver"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className={`text-xs mt-2 ${
                      index <= activeStep ? "text-white" : "text-silver"
                    }`}>{step.title}</span>
                  </div>
                  
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      index < activeStep ? "bg-qred" : "bg-silver/30"
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mt-6">
            {activeStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Question Bank Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter a descriptive title..." 
                      className="mt-1 bg-black/40 border-silver/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="What is this question bank about?" 
                      className="mt-1 bg-black/40 border-silver/20 text-white min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="topic" className="text-white">Topic</Label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-black/40 border-silver/20 text-white">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-silver/20 text-white">
                          {topics.map(topic => (
                            <SelectItem key={topic} value={topic} className="hover:bg-silver/10">
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="examType" className="text-white">Exam Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-black/40 border-silver/20 text-white">
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-silver/20 text-white">
                          {examTypes.map(type => (
                            <SelectItem key={type} value={type} className="hover:bg-silver/10">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="difficulty" className="text-white">Difficulty Level</Label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-black/40 border-silver/20 text-white">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-silver/20 text-white">
                          {difficultyLevels.map(level => (
                            <SelectItem key={level} value={level} className="hover:bg-silver/10">
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="coverImage" className="text-white">Cover Image (Optional)</Label>
                      <div className="mt-1 flex items-center gap-3">
                        <Button variant="outline" className="bg-black/40 border-silver/20 text-silver hover:text-white">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                        <span className="text-xs text-silver">No file selected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="tech-frame bg-black/60 border border-silver/20 rounded-lg p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Questions</h3>
                    <Button className="bg-qred hover:bg-qred-light">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Empty state */}
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                      <div className="h-16 w-16 rounded-full bg-silver/10 flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-silver" />
                      </div>
                      <h4 className="text-lg font-medium text-white">No Questions Added Yet</h4>
                      <p className="text-silver mt-2 max-w-md">
                        Start adding questions to your question bank. You need at least one question to proceed.
                      </p>
                      <Button className="mt-6 bg-qred hover:bg-qred-light">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Question
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* This is where the question editor would go, but we're not implementing it */}
                <div className="tech-frame bg-black/60 border border-silver/20 rounded-lg p-5 opacity-50 pointer-events-none">
                  <p className="text-center text-silver py-8">
                    Question editor would appear here (not implemented per requirements)
                  </p>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <Card className="tech-frame bg-black/40 border border-silver/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Access Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Public QBank</div>
                          <div className="text-sm text-silver">Make this QBank visible to everyone</div>
                        </div>
                        <Switch id="public" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Allow Copying</div>
                          <div className="text-sm text-silver">Others can duplicate this QBank to their collections</div>
                        </div>
                        <Switch id="allow-copying" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Show Answers Immediately</div>
                          <div className="text-sm text-silver">Display correct answers right after answering</div>
                        </div>
                        <Switch id="show-answers" />
                      </div>
                      
                      <div>
                        <Label htmlFor="category-tags" className="text-white">Category Tags</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <div className="bg-silver/10 text-silver rounded-full px-3 py-1 text-sm flex items-center">
                            Biology
                            <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 hover:text-white">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full h-7 bg-transparent border-silver/20 text-silver hover:text-white">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Tag
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="tech-frame bg-black/40 border border-silver/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Study Options</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Randomize Questions</div>
                          <div className="text-sm text-silver">Show questions in random order each time</div>
                        </div>
                        <Switch id="randomize" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Time Limit</div>
                          <div className="text-sm text-silver">Set a time limit for answering questions</div>
                        </div>
                        <Switch id="time-limit" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">Track Progress</div>
                          <div className="text-sm text-silver">Save user's progress when studying</div>
                        </div>
                        <Switch id="track-progress" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <Card className="tech-frame bg-black/40 border border-silver/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">QBank Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <div className="text-sm text-silver">Title</div>
                          <div className="text-white font-medium">Advanced Organic Chemistry</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-silver">Topic</div>
                          <div className="text-white font-medium">Chemistry</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-silver">Exam Type</div>
                          <div className="text-white font-medium">Final</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-silver">Difficulty</div>
                          <div className="text-white font-medium">Advanced</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-silver">Questions</div>
                          <div className="text-white font-medium">0 questions</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-silver">Visibility</div>
                          <div className="text-white font-medium">Private</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-silver">Description</div>
                        <div className="text-white mt-1">
                          This question bank covers advanced topics in organic chemistry including reaction mechanisms,
                          stereochemistry, and spectroscopic analysis methods.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="tech-frame bg-black/40 border border-silver/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Share Options</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="share-link" className="text-white">Share Link</Label>
                        <div className="mt-1 flex">
                          <Input 
                            id="share-link" 
                            value="https://qbank.example.com/share/abc123" 
                            readOnly
                            className="bg-black/40 border-silver/20 text-white rounded-r-none"
                          />
                          <Button className="rounded-l-none bg-silver hover:bg-silver-dark">
                            Copy
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-white mb-2 block">Share with specific people</Label>
                        <div className="flex">
                          <Input 
                            placeholder="Enter email addresses..." 
                            className="bg-black/40 border-silver/20 text-white rounded-r-none"
                          />
                          <Button className="rounded-l-none bg-qred hover:bg-qred-light">
                            Invite
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div>
              <Button
                variant="outline"
                className="border-silver/20 text-silver hover:text-white mr-2"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              
              {activeStep !== 0 && (
                <Button
                  variant="outline"
                  className="border-silver/20 text-white"
                  onClick={handleBack}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
            
            <div>
              <Button
                variant="outline"
                className="border-silver/20 text-silver hover:text-white mr-2"
                onClick={handleSaveDraft}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              {activeStep < steps.length - 1 ? (
                <Button className="bg-qred hover:bg-qred-light" onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-qred hover:bg-qred-light" onClick={handleFinish}>
                  Publish QBank
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQBank;
