
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login successful!",
      description: "Redirecting to your dashboard..."
    });
    // In a real app, this would handle authentication and redirect to the dashboard
    window.location.href = "/dashboard";
  };
  
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account created!",
      description: "Welcome to QBank! Redirecting to your dashboard..."
    });
    // In a real app, this would create an account and redirect to onboarding or dashboard
    window.location.href = "/dashboard";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthClick={() => setShowAuth(true)} />
      <main className="flex-1">
        <Hero onGetStarted={() => setShowAuth(true)} />
        <Features />
        <Benefits />
        <CallToAction onStartTrial={() => setShowAuth(true)} />
      </main>
      <Footer />
      
      {/* Authentication Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md tech-frame bg-black/90 border-silver/30">
            <div className="absolute top-4 right-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-silver hover:text-white"
                onClick={() => setShowAuth(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <div className="h-8 w-8 bg-qred rounded-sm flex items-center justify-center">
                  <span className="font-bold text-lg">Q</span>
                </div>
                <span className="text-xl font-semibold text-white ml-2">QBank</span>
              </div>
              <CardTitle className="text-center text-white">Welcome to QBank</CardTitle>
              <CardDescription className="text-center text-silver">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login">
                <TabsList className="grid grid-cols-2 mb-4 bg-black/40 border border-silver/20">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-silver">Email</Label>
                      <Input 
                        id="email" 
                        placeholder="Enter your email" 
                        type="email" 
                        required 
                        className="bg-black/40 border-silver/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-silver">Password</Label>
                        <Link to="#" className="text-xs text-qred hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        placeholder="••••••••" 
                        type="password" 
                        required 
                        className="bg-black/40 border-silver/20 text-white"
                      />
                    </div>
                    <Button className="w-full bg-qred hover:bg-qred-light" type="submit">
                      Log In
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-silver">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          required 
                          className="bg-black/40 border-silver/20 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-silver">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Parker" 
                          required 
                          className="bg-black/40 border-silver/20 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail" className="text-silver">Email</Label>
                      <Input 
                        id="signupEmail" 
                        placeholder="john@example.com" 
                        type="email" 
                        required 
                        className="bg-black/40 border-silver/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword" className="text-silver">Password</Label>
                      <Input 
                        id="signupPassword" 
                        placeholder="••••••••" 
                        type="password" 
                        required 
                        className="bg-black/40 border-silver/20 text-white"
                      />
                    </div>
                    <Button className="w-full bg-qred hover:bg-qred-light" type="submit">
                      Create Account
                    </Button>
                    <p className="text-xs text-center text-silver">
                      By signing up, you agree to our{" "}
                      <Link to="#" className="text-qred hover:underline">Terms</Link>{" "}
                      and{" "}
                      <Link to="#" className="text-qred hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
