
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Upload, Video, X, Image, FilePlus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface PhotoPreview {
  url: string;
  file: File;
}

const NewPitch = () => {
  const navigate = useNavigate();
  const [pitchData, setPitchData] = useState({
    title: "",
    domain: "",
    summary: "",
    problem: "",
    solution: "",
    marketSize: "",
    competitiveAdvantage: "",
    businessModel: "",
    fundingNeeds: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (photos.length >= 3) {
        toast({
          title: "Maximum photos reached",
          description: "You can only upload up to 3 photos.",
          variant: "destructive"
        });
        return;
      }
      
      setPhotos([...photos, {
        url: URL.createObjectURL(file),
        file: file
      }]);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    URL.revokeObjectURL(newPhotos[index].url);
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pitchData.title || !pitchData.domain || !pitchData.summary) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!videoFile) {
      toast({
        title: "Video required",
        description: "Please upload a pitch video.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate upload process
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            setIsUploading(false);
            toast({
              title: "Pitch uploaded successfully",
              description: "Your pitch is now live on LaunchPad.",
            });
            navigate("/founder-dashboard");
          }, 500);
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <DashboardLayout userRole="founder">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">New Pitch</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card className="animate-fade-in shadow-sm">
              <CardHeader>
                <CardTitle>Pitch Video</CardTitle>
                <CardDescription>
                  Upload a 2-3 minute video explaining your startup pitch
                </CardDescription>
              </CardHeader>
              <CardContent>
                {videoPreview ? (
                  <div className="space-y-4">
                    <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <video 
                        src={videoPreview} 
                        controls 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">{videoFile?.name}</span>
                        <span className="text-xs text-gray-400 block">
                          {videoFile && (videoFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => {
                          URL.revokeObjectURL(videoPreview);
                          setVideoPreview(null);
                          setVideoFile(null);
                        }}
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Label
                    htmlFor="video-upload"
                    className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-10 hover:border-launchpad-blue transition-colors"
                  >
                    <Video className="h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-center">
                      <p className="font-medium text-gray-700 mb-1">Upload your pitch video</p>
                      <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
                      <p className="text-xs text-gray-400 mt-2">MP4, MOV, or WebM up to 100MB</p>
                    </div>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoChange}
                    />
                  </Label>
                )}
              </CardContent>
            </Card>

            <Card className="animate-fade-in shadow-sm">
              <CardHeader>
                <CardTitle>Pitch Photos</CardTitle>
                <CardDescription>
                  Upload up to 3 photos showcasing your product, team, or solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img src={photo.url} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    {photos.length < 3 && (
                      <Label
                        htmlFor="photo-upload"
                        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-video hover:border-launchpad-blue transition-colors"
                      >
                        <Image className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add photo</span>
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </Label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {photos.length}/3 photos uploaded • JPG, PNG, or WebP up to 5MB each
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in shadow-sm">
              <CardHeader>
                <CardTitle>Pitch Details</CardTitle>
                <CardDescription>
                  Provide information about your pitch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Pitch Title <span className="text-red-500">*</span></Label>
                      <Input 
                        id="title" 
                        value={pitchData.title} 
                        onChange={(e) => setPitchData({...pitchData, title: e.target.value})}
                        placeholder="e.g., EcoTech - Sustainable Energy Solution"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="domain">Business Domain <span className="text-red-500">*</span></Label>
                      <Select 
                        value={pitchData.domain}
                        onValueChange={(value) => setPitchData({...pitchData, domain: value})}
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
                    <Label htmlFor="summary">Executive Summary <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id="summary" 
                      value={pitchData.summary} 
                      onChange={(e) => setPitchData({...pitchData, summary: e.target.value})}
                      placeholder="Provide a brief summary of your startup and pitch (1-2 paragraphs)"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="problem">Problem</Label>
                      <Textarea 
                        id="problem" 
                        value={pitchData.problem} 
                        onChange={(e) => setPitchData({...pitchData, problem: e.target.value})}
                        placeholder="What problem are you solving?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="solution">Solution</Label>
                      <Textarea 
                        id="solution" 
                        value={pitchData.solution} 
                        onChange={(e) => setPitchData({...pitchData, solution: e.target.value})}
                        placeholder="How does your product/service solve this problem?"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marketSize">Market Size</Label>
                      <Textarea 
                        id="marketSize" 
                        value={pitchData.marketSize} 
                        onChange={(e) => setPitchData({...pitchData, marketSize: e.target.value})}
                        placeholder="What is the size of your target market?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
                      <Textarea 
                        id="competitiveAdvantage" 
                        value={pitchData.competitiveAdvantage} 
                        onChange={(e) => setPitchData({...pitchData, competitiveAdvantage: e.target.value})}
                        placeholder="What sets you apart from competitors?"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessModel">Business Model</Label>
                      <Textarea 
                        id="businessModel" 
                        value={pitchData.businessModel} 
                        onChange={(e) => setPitchData({...pitchData, businessModel: e.target.value})}
                        placeholder="How will you generate revenue?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fundingNeeds">Funding Needs</Label>
                      <Textarea 
                        id="fundingNeeds" 
                        value={pitchData.fundingNeeds} 
                        onChange={(e) => setPitchData({...pitchData, fundingNeeds: e.target.value})}
                        placeholder="How much funding are you seeking and how will you use it?"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-launchpad-blue"
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading pitch ({uploadProgress}%)
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FilePlus className="mr-2 h-5 w-5" />
                    Submit Pitch
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewPitch;
