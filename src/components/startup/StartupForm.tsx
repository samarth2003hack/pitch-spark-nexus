
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { businessDomains } from "@/lib/constants";
import { StartupData } from "@/types/startup";

interface StartupFormProps {
  startupData: StartupData;
  setStartupData: (data: StartupData) => void;
  logoPreview: string | null;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StartupForm = ({ startupData, setStartupData, logoPreview, handleLogoChange }: StartupFormProps) => {
  const handleSave = () => {
    if (!startupData.name || !startupData.domain || !startupData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setStartupData({ ...startupData, isCreated: true });
    toast({
      title: "Startup profile created",
      description: "Your startup has been successfully listed on LaunchPad.",
    });
  };

  return (
    <Card className="animate-fade-in shadow-sm">
      <CardHeader>
        <CardTitle>Startup Information</CardTitle>
        <CardDescription>
          Tell us about your startup to list it on LaunchPad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Startup Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                value={startupData.name} 
                onChange={(e) => setStartupData({...startupData, name: e.target.value})}
                placeholder="e.g., EcoTech Solutions"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Business Domain <span className="text-red-500">*</span></Label>
              <Select 
                value={startupData.domain}
                onValueChange={(value) => setStartupData({...startupData, domain: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a domain" />
                </SelectTrigger>
                <SelectContent>
                  {businessDomains.map((domain) => (
                    <SelectItem key={domain.value} value={domain.value}>
                      {domain.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Startup Description <span className="text-red-500">*</span></Label>
            <Textarea 
              id="description" 
              value={startupData.description} 
              onChange={(e) => setStartupData({...startupData, description: e.target.value})}
              placeholder="Describe what your startup does, your mission, and vision..."
              rows={5}
              required
            />
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input 
                id="website" 
                value={startupData.website} 
                onChange={(e) => setStartupData({...startupData, website: e.target.value})}
                placeholder="e.g., https://www.example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="founded">Founded Year</Label>
              <Input 
                id="founded" 
                value={startupData.founded} 
                onChange={(e) => setStartupData({...startupData, founded: e.target.value})}
                placeholder="e.g., 2023"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={startupData.location} 
                onChange={(e) => setStartupData({...startupData, location: e.target.value})}
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input 
                id="teamSize" 
                value={startupData.teamSize} 
                onChange={(e) => setStartupData({...startupData, teamSize: e.target.value})}
                placeholder="e.g., 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="funding">Funding</Label>
              <Input 
                id="funding" 
                value={startupData.funding} 
                onChange={(e) => setStartupData({...startupData, funding: e.target.value})}
                placeholder="e.g., Pre-seed $250K"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage">Company Stage</Label>
              <Select 
                value={startupData.stage}
                onValueChange={(value) => setStartupData({...startupData, stage: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="early">Early Traction</SelectItem>
                  <SelectItem value="growth">Growth Stage</SelectItem>
                  <SelectItem value="scaling">Scaling</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-4">
                {logoPreview && (
                  <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                    <img src={logoPreview} alt="Logo preview" className="object-contain max-h-full" />
                  </div>
                )}
                <Label
                  htmlFor="logo-upload"
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-4 flex-grow hover:border-launchpad-blue transition-colors"
                >
                  <Upload className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload logo</span>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="bg-launchpad-blue">
              List Your Startup
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
