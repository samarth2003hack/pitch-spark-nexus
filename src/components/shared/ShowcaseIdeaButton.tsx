
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ShowcaseIdeaButton() {
  // Check if user is authenticated using the same mock auth approach as the Navbar
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole") || "";
  
  // Determine the target URL based on authentication state
  const targetUrl = isAuthenticated 
    ? (userRole === "founder" ? "/founder-dashboard/create-pitch" : "/pitches") 
    : "/login";

  return (
    <Link to={targetUrl} className="animate-fade-in">
      <Button 
        size="lg" 
        className="bg-launchpad-blue hover:bg-launchpad-blue-dark transition-all duration-300 shadow-lg hover:shadow-xl group"
      >
        <span>Showcase Your Idea</span>
        <Rocket 
          className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" 
          aria-hidden="true" 
        />
      </Button>
    </Link>
  );
}
