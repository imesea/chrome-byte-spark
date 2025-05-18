
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
      
      <Card className="tech-frame bg-black/40 border-silver/20">
        <Tabs defaultValue="account">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-white">User Settings</CardTitle>
              <TabsList className="bg-black/40 border border-silver/20">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription className="text-silver">
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="account" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-silver">Full Name</Label>
                    <Input id="name" defaultValue="John Parker" className="bg-black/40 border-silver/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-silver">Username</Label>
                    <Input id="username" defaultValue="jparker224" className="bg-black/40 border-silver/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-silver">Email</Label>
                    <Input id="email" defaultValue="john.parker@example.com" className="bg-black/40 border-silver/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-silver">Role/Occupation</Label>
                    <Input id="role" defaultValue="Medical Student" className="bg-black/40 border-silver/20 text-white" />
                  </div>
                </div>
                
                <Separator className="my-6 bg-silver/10" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Focus Areas</h3>
                  <p className="text-silver text-sm">Select your primary areas of study to receive tailored recommendations</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-silver/5 rounded-md border border-silver/10">
                      <span className="text-white">Medical</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-silver/5 rounded-md border border-silver/10">
                      <span className="text-white">USMLE</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-silver/5 rounded-md border border-silver/10">
                      <span className="text-white">Anatomy</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-silver/5 rounded-md border border-silver/10">
                      <span className="text-white">Pathology</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button className="bg-qred hover:bg-qred-light">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Application Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Dark Mode</p>
                      <p className="text-sm text-silver">Enable dark theme across the application</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator className="bg-silver/10" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Compact View</p>
                      <p className="text-sm text-silver">Reduce padding and spacing in the interface</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator className="bg-silver/10" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Show Progress Indicators</p>
                      <p className="text-sm text-silver">Display progress bars for completed items</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator className="bg-silver/10" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Advanced Analytics</p>
                      <p className="text-sm text-silver">Show detailed performance metrics</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button className="bg-qred hover:bg-qred-light">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Email Notifications</p>
                      <p className="text-sm text-silver">Receive updates and reminders via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator className="bg-silver/10" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Study Reminders</p>
                      <p className="text-sm text-silver">Get reminded about scheduled study sessions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator className="bg-silver/10" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">New Content Alerts</p>
                      <p className="text-sm text-silver">Be notified when new QBanks are available</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator className="bg-silver/10" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">System Announcements</p>
                      <p className="text-sm text-silver">Important updates about QBank platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button className="bg-qred hover:bg-qred-light">
                    Update Notifications
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Security Settings</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-silver">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-black/40 border-silver/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-silver">New Password</Label>
                    <Input id="new-password" type="password" className="bg-black/40 border-silver/20 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-silver">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="bg-black/40 border-silver/20 text-white" />
                  </div>
                </div>
                
                <Separator className="my-6 bg-silver/10" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                  <p className="text-silver text-sm">Add an extra layer of security to your account</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Enable 2FA</p>
                      <p className="text-sm text-silver">Use an authenticator app or receive SMS codes</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button className="bg-qred hover:bg-qred-light">
                    Update Security Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;
