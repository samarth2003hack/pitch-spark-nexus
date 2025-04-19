
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StartupForm } from "@/components/startup/StartupForm";
import { StartupProfile } from "@/components/startup/StartupProfile";
import { StartupData } from "@/types/startup";

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

  return (
    <DashboardLayout userRole="founder">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {startupData.isCreated ? `${startupData.name}` : "List Your Startup"}
        </h1>

        {startupData.isCreated ? (
          <StartupProfile 
            startupData={startupData}
            logoPreview={logoPreview}
            onEdit={() => setStartupData({...startupData, isCreated: false})}
          />
        ) : (
          <StartupForm 
            startupData={startupData}
            setStartupData={setStartupData}
            logoPreview={logoPreview}
            handleLogoChange={handleLogoChange}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default YourStartup;
