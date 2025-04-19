import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Mock auth state - Replace with actual auth logic when implemented
const useMockAuth = () => {
  return {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    userRole: localStorage.getItem("userRole") || "",
    user: {
      name:
        localStorage.getItem("userRole") === "founder"
          ? "Sarah Johnson"
          : "Michael Chen",
      avatar:
        localStorage.getItem("userRole") === "founder"
          ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      initials: localStorage.getItem("userRole") === "founder" ? "SJ" : "MC"
    },
    login: (role: string) => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role);
      window.location.href =
        role === "founder" ? "/founder-dashboard" : "/mentor-dashboard";
    },
    logout: () => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      window.location.href = "/";
    }
  };
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useMockAuth();
  const location = useLocation();


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
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="font-medium text-gray-800 hover:text-launchpad-blue transition-colors">Home</Link>
            <Link to="/startups" className="font-medium text-gray-800 hover:text-launchpad-blue transition-colors">Startups</Link>
            <Link to="/pitches" className="font-medium text-gray-800 hover:text-launchpad-blue transition-colors">Pitches</Link>
            <Link to="/about" className="font-medium text-gray-800 hover:text-launchpad-blue transition-colors">About</Link>

            {auth.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                      <AvatarFallback>{auth.user.initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{auth.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={auth.userRole === "founder" ? "/founder-dashboard" : "/mentor-dashboard"}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={auth.userRole === "founder" ? "/founder-profile" : "/mentor-profile"}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {auth.userRole === "founder" && (
                    <DropdownMenuItem asChild>
                      <Link to="/your-startup">Your Startup</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={auth.logout} className="text-red-500 focus:text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-launchpad-blue hover:bg-launchpad-blue-dark">Sign Up</Button>
                </Link>
              </>
            )}
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

      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 pt-2 pb-3 space-y-1">
            <Link to="/" className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/startups" className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light" onClick={() => setIsOpen(false)}>
              Startups
            </Link>
            <Link to="/pitches" className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light" onClick={() => setIsOpen(false)}>
              Pitches
            </Link>
            <Link to="/about" className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light" onClick={() => setIsOpen(false)}>
              About
            </Link>

            {auth.isAuthenticated ? (
              <div className="pt-2 border-t mt-2">
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback>{auth.user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{auth.user.name}</span>
                </div>

                <Link to={auth.userRole === "founder" ? "/founder-dashboard" : "/mentor-dashboard"} className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <Link to={auth.userRole === "founder" ? "/founder-profile" : "/mentor-profile"} className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
                {auth.userRole === "founder" && (
                  <Link to="/your-startup" className="block py-2 px-3 rounded-md hover:bg-launchpad-gray-light" onClick={() => setIsOpen(false)}>
                    Your Startup
                  </Link>
                )}
                <button
                  onClick={() => {
                    auth.logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block py-2 px-3 rounded-md text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-launchpad-blue hover:bg-launchpad-blue-dark">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
