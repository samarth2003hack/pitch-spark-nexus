
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for startups - in a real app, this would come from your backend
const mockStartups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    domain: "CleanTech",
    description: "Sustainable energy solutions for a greener future",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80"
  },
  {
    id: 2,
    name: "HealthAI",
    domain: "HealthTech",
    description: "AI-powered healthcare diagnostics",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80"
  }
];

export default function StartupsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Startups</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStartups.map((startup) => (
          <Card key={startup.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img
                  src={startup.logo}
                  alt={startup.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <CardTitle className="text-xl">{startup.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{startup.domain}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{startup.description}</p>
              <div className="flex justify-between items-center">
                <Link to={`/startups/${startup.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <Link to={`/support-us/${startup.id}`}>
                  <Button variant="default" className="bg-launchpad-blue">Support Us</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
