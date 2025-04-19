
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Users, Star, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connecting Visionary Founders with Expert Mentors
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              LaunchPad helps early-stage startups refine their ideas and grow through expert mentorship and valuable feedback.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe every great idea deserves the chance to succeed. Our platform connects ambitious founders with experienced mentors who provide invaluable guidance, helping transform innovative ideas into successful ventures.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How We Help</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-launchpad-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Expert Mentorship</h3>
                <p className="text-gray-600">
                  Connect with experienced mentors who provide valuable insights and guidance for your startup journey.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-launchpad-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Pitch Refinement</h3>
                <p className="text-gray-600">
                  Get detailed feedback on your pitch deck and business model from industry experts.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-launchpad-blue rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Continuous Support</h3>
                <p className="text-gray-600">
                  Receive ongoing feedback and support as you develop and refine your startup idea.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1594751543129-6701ad444259?auto=format&fit=crop&q=80&w=150&h=150" 
                  alt="Sarah Chen"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Sarah Chen</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150" 
                  alt="Michael Rodriguez"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Michael Rodriguez</h3>
                <p className="text-gray-600">Head of Mentorship</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150" 
                  alt="Emily Thompson"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">Emily Thompson</h3>
                <p className="text-gray-600">Community Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join LaunchPad today and take your startup idea to the next level with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-launchpad-blue hover:bg-launchpad-blue-dark text-lg px-8 py-6">
                  Join as Founder
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="text-lg px-8 py-6">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
