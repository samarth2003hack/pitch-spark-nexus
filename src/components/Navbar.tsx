
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="font-bold text-xl text-launchpad-blue-dark">LaunchPad</span>
            </Link>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-800 hover:text-launchpad-blue transition-colors">Home</Link>
            <Link to="/pitches" className="font-medium text-gray-800 hover:text-launchpad-blue transition-colors">Pitches</Link>
            <Link to="/about" className="font-medium text-gray-800 hover:text-launchpad-blue transition-colors">About</Link>
            <Link to="/login">
              <Button variant="outline" className="mr-2">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-launchpad-blue hover:bg-launchpad-blue-dark">Sign Up</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-launchpad-blue"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 pt-2 pb-3 space-y-1">
            <Link 
              to="/"
              className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/pitches"
              className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light"
              onClick={() => setIsOpen(false)}
            >
              Pitches
            </Link>
            <Link 
              to="/about"
              className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-launchpad-blue hover:bg-launchpad-blue-dark">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
