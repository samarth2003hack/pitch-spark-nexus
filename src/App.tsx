import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./components/auth/Login";
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

// Protected route handler
const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole();
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/${role}-dashboard`} replace />;
  }

  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
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

              {/* Founder protected routes */}
              <Route element={<ProtectedRoute allowedRoles={["founder"]} />}>
                <Route path="/founder-dashboard" element={<FounderDashboard />} />
                <Route path="/founder-dashboard/create-pitch" element={<CreatePitch />} />
                <Route path="/your-startup" element={<YourStartup />} />
                <Route path="/new-pitch" element={<NewPitch />} />
                <Route path="/founder-profile" element={<FounderProfile />} />
              </Route>

              {/* Mentor protected routes */}
              <Route element={<ProtectedRoute allowedRoles={["mentor"]} />}>
                <Route path="/mentor-dashboard" element={<MentorDashboard />} />
                <Route path="/mentor-profile" element={<MentorProfile />} />
              </Route>

              {/* Auth-only redirect route */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/dashboard"
                  element={
                    getUserRole() === "founder"
                      ? <Navigate to="/founder-dashboard" replace />
                      : <Navigate to="/mentor-dashboard" replace />
                  }
                />
              </Route>

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
