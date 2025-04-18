
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="rounded-2xl overflow-hidden relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-launchpad-blue to-launchpad-blue-dark"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5"></div>
          </div>
          
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Take Your Startup to the Next Level?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Join LaunchPad today and connect with mentors who can help refine your pitch, 
              improve your business model, and guide your startup journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-white text-launchpad-blue hover:bg-white/90 text-lg px-6 py-6">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-6 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <p className="mt-8 text-white/70 text-sm">
              No credit card required. Start with our free plan today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
