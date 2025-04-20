
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

// Mock data - in a real app, this would come from your backend
const mockStartupDetails = {
  id: 1,
  name: "EcoTech Solutions",
  domain: "CleanTech",
  description: "Sustainable energy solutions for a greener future",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80",
  pitches: [
    {
      id: 1,
      title: "Series A Funding Round",
      date: "2024-03-15",
      description: "Seeking investment for scaling operations"
    },
    {
      id: 2,
      title: "Seed Round",
      date: "2023-12-01",
      description: "Initial funding for prototype development"
    }
  ]
};

export default function StartupDetails() {
  const { id } = useParams();

  return (


    <>
    <Navbar></Navbar>
  
      
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <img
                src={mockStartupDetails.logo}
                alt={mockStartupDetails.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-2xl">{mockStartupDetails.name}</CardTitle>
                <p className="text-muted-foreground">{mockStartupDetails.domain}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{mockStartupDetails.description}</p>
            <Link to={`/support-us/${id}`}>
              <Button className="bg-launchpad-blue">Support This Startup</Button>
            </Link>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Pitches</h2>
        <div className="space-y-4">
          {mockStartupDetails.pitches.map((pitch) => (
            <Card key={pitch.id}>
              <CardHeader>
                <CardTitle>{pitch.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{pitch.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{pitch.description}</p>
                <Link to={`/pitch/${pitch.id}`} className="mt-4 inline-block">
                  <Button variant="outline">View Pitch</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>


    </>
   
  );
}
