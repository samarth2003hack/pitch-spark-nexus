
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VideoUpload } from "@/components/pitch/VideoUpload";
import { PhotoUpload, type PhotoPreview } from "@/components/pitch/PhotoUpload";
import { PitchForm } from "@/components/pitch/PitchForm";

const NewPitch = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);

  const handleVideoChange = (file: File | null) => {
    setVideoFile(file);
    setVideoPreview(file ? URL.createObjectURL(file) : null);
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
                <VideoUpload
                  videoFile={videoFile}
                  videoPreview={videoPreview}
                  onVideoChange={handleVideoChange}
                />
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
                <PhotoUpload
                  photos={photos}
                  onPhotosChange={setPhotos}
                />
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
                <PitchForm
                  pitchData={pitchData}
                  onPitchDataChange={setPitchData}
                />
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
