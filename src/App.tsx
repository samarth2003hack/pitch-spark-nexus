
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pitches" element={
            <MainLayout>
              <PitchesPage />
            </MainLayout>
          } />
          <Route path="/founder-dashboard" element={<FounderDashboard />} />
          <Route path="/founder-dashboard/create-pitch" element={<CreatePitch />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/pitch/:id" element={
            <MainLayout>
              <PitchDetails />
            </MainLayout>
          } />
          <Route path="/about" element={
            <MainLayout>
              <About />
            </MainLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
