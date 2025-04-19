
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { PenTool, Upload, Link, Building, BookOpen, Users, DollarSign } from "lucide-react";

const businessDomains = [
  { value: "ai", label: "Artificial Intelligence" },
  { value: "cloud", label: "Cloud Computing" },
  { value: "web-dev", label: "Web Development" },
  { value: "app-dev", label: "App Development" },
  { value: "animation", label: "Animation & Graphics" },
  { value: "agriculture", label: "Agriculture Tech" },
  { value: "edtech", label: "Education Technology" },
  { value: "fintech", label: "Financial Technology" },
  { value: "healthtech", label: "Health Technology" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "blockchain", label: "Blockchain" },
  { value: "iot", label: "Internet of Things" },
  { value: "cyber-security", label: "Cyber Security" },
  { value: "robotics", label: "Robotics & Automation" },
  { value: "clean-tech", label: "Clean Energy & Sustainability" },
];

interface StartupData {
  name: string;
  domain: string;
  description: string;
  website: string;
  founded: string;
  location: string;
  teamSize: string;
  funding: string;
  stage: string;
  logo: File | null;
  isCreated: boolean;
}

const YourStartup = () => {
  const [startupData, setStartupData] = useState<StartupData>({
    name: "",
    domain: "",
    description: "",
    website: "",
    founded: "",
    location: "",
    teamSize: "",
    funding: "",
    stage: "",
    logo: null,
    isCreated: false
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStartupData({ ...startupData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

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
    <DashboardLayout userRole="founder">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {startupData.isCreated ? `${startupData.name}` : "List Your Startup"}
        </h1>

        {startupData.isCreated ? (
          <div className="space-y-6">
            <Card className="animate-fade-in shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{startupData.name}</CardTitle>
                  <CardDescription>Startup Profile</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setStartupData({...startupData, isCreated: false})}
                  className="flex items-center"
                >
                  <PenTool className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="mb-4">
                      {logoPreview ? (
                        <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                          <img src={logoPreview} alt="Startup Logo" className="object-contain max-h-full" />
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 font-medium">Domain:</span>
                        <span className="ml-2 text-gray-800">
                          {businessDomains.find(domain => domain.value === startupData.domain)?.label || startupData.domain}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Location:</span>
                        <span className="ml-2 text-gray-800">{startupData.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Founded:</span>
                        <span className="ml-2 text-gray-800">{startupData.founded}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 font-medium">Website:</span>
                        <a href={startupData.website} className="ml-2 text-launchpad-blue hover:underline">{startupData.website}</a>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <div>
                      <h3 className="font-medium mb-2 flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-launchpad-blue" />
                        About
                      </h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{startupData.description}</p>
                    </div>
                    <div className="pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <Users className="mr-2 h-4 w-4 text-launchpad-blue" />
                          Team Size
                        </h3>
                        <p className="text-gray-700">{startupData.teamSize} members</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-launchpad-blue" />
                          Funding
                        </h3>
                        <p className="text-gray-700">{startupData.funding}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2 flex items-center">
                          <Link className="mr-2 h-4 w-4 text-launchpad-blue" />
                          Stage
                        </h3>
                        <p className="text-gray-700">{startupData.stage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in shadow-sm">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-launchpad-blue/5 p-4 rounded-lg border border-launchpad-blue/10 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Create Your First Pitch</h3>
                      <p className="text-sm text-gray-600">Upload your pitch and get feedback from mentors</p>
                    </div>
                    <Button className="bg-launchpad-blue" asChild>
                      <a href="/founder-dashboard/create-pitch">New Pitch</a>
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Find Mentors in Your Domain</h3>
                      <p className="text-sm text-gray-600">Connect with experts in {businessDomains.find(domain => domain.value === startupData.domain)?.label}</p>
                    </div>
                    <Button variant="outline" asChild>
                      <a href="/founder-dashboard/mentors">Browse Mentors</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
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
        )}
      </div>
    </DashboardLayout>
  );
};

export default YourStartup;
