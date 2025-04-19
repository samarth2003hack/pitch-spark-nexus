
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const FounderProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah@ecotech.com",
    bio: "Serial entrepreneur with a passion for sustainable technology solutions. Previously founded GreenTech (acquired in 2022).",
    location: "San Francisco, CA",
    website: "www.sarahjohnson.com",
    linkedin: "linkedin.com/in/sarahjohnson",
    twitter: "twitter.com/sarahjohnson"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <DashboardLayout userRole="founder">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 animate-fade-in shadow-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{profileData.name}</CardTitle>
            <p className="text-gray-500 mt-1">{profileData.location}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium min-w-[100px]">Email:</span>
                <span className="text-gray-800">{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium min-w-[100px]">Website:</span>
                <a href={`https://${profileData.website}`} className="text-launchpad-blue hover:underline">
                  {profileData.website}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium min-w-[100px]">LinkedIn:</span>
                <a href={`https://${profileData.linkedin}`} className="text-launchpad-blue hover:underline">
                  {profileData.linkedin}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium min-w-[100px]">Twitter:</span>
                <a href={`https://${profileData.twitter}`} className="text-launchpad-blue hover:underline">
                  {profileData.twitter}
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Profile" : "About Me"}</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={profileData.name} 
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={profileData.email} 
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profileData.bio} 
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={5}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={profileData.location} 
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={profileData.website} 
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    value={profileData.linkedin} 
                    onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input 
                    id="twitter" 
                    value={profileData.twitter} 
                    onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-launchpad-blue">Save</Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 whitespace-pre-wrap">{profileData.bio}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FounderProfile;
