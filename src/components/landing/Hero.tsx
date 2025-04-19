import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShowcaseIdeaButton } from "@/components/shared/ShowcaseIdeaButton";
import { Navbar } from "../Navbar";

export function Hero() {
  return (
    <>
    
    <section className="relative overflow-hidden">
    <Navbar></Navbar>
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-launchpad-blue/10 to-launchpad-blue-dark/10 z-0"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-launchpad-blue-dark">
              Connect, Pitch, <span className="text-launchpad-blue">Launch</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg">
              LaunchPad connects innovative founders with expert mentors to refine ideas and accelerate startup success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ShowcaseIdeaButton />
              <Link to="/about">
                <Button variant="outline" className="text-lg px-6 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                alt="Startup team collaborating" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Testimonial */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-launchpad-blue flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <p className="text-sm text-gray-700 mb-1">
                    "LaunchPad helped us refine our pitch and connect with the perfect mentor."
                  </p>
                  <p className="text-xs font-medium text-launchpad-blue">
                    Jane Smith, CEO of TechStart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
    
  );
}
