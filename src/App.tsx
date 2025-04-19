import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FounderDashboard from "./pages/FounderDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import PitchDetails from "./pages/PitchDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import PitchesPage from "./pages/PitchesPage";
import CreatePitch from "./pages/CreatePitch";
import YourStartup from "./pages/YourStartup";
import NewPitch from "./pages/NewPitch";
import FounderProfile from "./pages/FounderProfile";
import MentorProfile from "./pages/MentorProfile";
import SupportUs from "./pages/SupportUs";
import StartupsPage from "./pages/StartupsPage";
import StartupDetails from "./pages/StartupDetails";

const queryClient = new QueryClient();

// Mock auth check - would be replaced by real auth logic
const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";
const getUserRole = () => localStorage.getItem("userRole") || "";

// Protected route components
const FounderRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (getUserRole() !== "founder") {
    return <Navigate to="/mentor-dashboard" replace />;
  }
  
  return <>{children}</>;
};

const MentorRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (getUserRole() !== "mentor") {
    return <Navigate to="/founder-dashboard" replace />;
  }
  
  return <>{children}</>;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pitches" element={<PitchesPage />} />
              <Route path="/pitch/:id" element={<PitchDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/support-us" element={<SupportUs />} />
              <Route path="/support-us/:id" element={<SupportUs />} />
              <Route path="/startups" element={<StartupsPage />} />
              <Route path="/startups/:id" element={<StartupDetails />} />
              
              {/* Founder routes */}
              <Route 
                path="/founder-dashboard" 
                element={
                  <FounderRoute>
                    <FounderDashboard />
                  </FounderRoute>
                } 
              />
              <Route 
                path="/founder-dashboard/create-pitch" 
                element={
                  <FounderRoute>
                    <CreatePitch />
                  </FounderRoute>
                } 
              />
              <Route 
                path="/your-startup" 
                element={
                  <FounderRoute>
                    <YourStartup />
                  </FounderRoute>
                } 
              />
              <Route 
                path="/new-pitch" 
                element={
                  <FounderRoute>
                    <NewPitch />
                  </FounderRoute>
                } 
              />
              <Route 
                path="/founder-profile" 
                element={
                  <FounderRoute>
                    <FounderProfile />
                  </FounderRoute>
                } 
              />
              
              {/* Mentor routes */}
              <Route 
                path="/mentor-dashboard" 
                element={
                  <MentorRoute>
                    <MentorDashboard />
                  </MentorRoute>
                } 
              />
              <Route 
                path="/mentor-profile" 
                element={
                  <MentorRoute>
                    <MentorProfile />
                  </MentorRoute>
                } 
              />
              
              {/* Auth redirects */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    {getUserRole() === "founder" ? (
                      <Navigate to="/founder-dashboard" replace />
                    ) : (
                      <Navigate to="/mentor-dashboard" replace />
                    )}
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
