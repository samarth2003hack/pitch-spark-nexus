
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, BookOpen, Users, DollarSign, Link, PenTool } from "lucide-react";
import { businessDomains } from "@/lib/constants";
import { StartupData } from "@/types/startup";

interface StartupProfileProps {
  startupData: StartupData;
  logoPreview: string | null;
  onEdit: () => void;
}

export const StartupProfile = ({ startupData, logoPreview, onEdit }: StartupProfileProps) => {
  return (
    <div className="space-y-6">
      <Card className="animate-fade-in shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{startupData.name}</CardTitle>
            <CardDescription>Startup Profile</CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={onEdit}
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
  );
};
