
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-launchpad-blue-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
                <span className="text-launchpad-blue-dark font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl">LaunchPad</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Connecting innovative founders with experienced mentors to refine ideas and launch successful startups.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pitches" className="text-gray-300 hover:text-white transition-colors">
                  Browse Pitches
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Founders */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">For Founders</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/submit-pitch" className="text-gray-300 hover:text-white transition-colors">
                  Submit a Pitch
                </Link>
              </li>
              <li>
                <Link to="/founder-resources" className="text-gray-300 hover:text-white transition-colors">
                  Founder Resources
                </Link>
              </li>
              <li>
                <Link to="/faq-founders" className="text-gray-300 hover:text-white transition-colors">
                  FAQ for Founders
                </Link>
              </li>
            </ul>
          </div>

          {/* For Mentors */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">For Mentors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/become-mentor" className="text-gray-300 hover:text-white transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link to="/mentor-resources" className="text-gray-300 hover:text-white transition-colors">
                  Mentor Resources
                </Link>
              </li>
              <li>
                <Link to="/faq-mentors" className="text-gray-300 hover:text-white transition-colors">
                  FAQ for Mentors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} LaunchPad. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-400">
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
