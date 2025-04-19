
import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("founder");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for demonstration purposes
    setTimeout(() => {
      console.log("Signup attempt", { name, email, password, role, agreeTerms });
      
      // Set auth state
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role);
      
      toast({
        title: "Account created successfully",
        description: "Welcome to LaunchPad!",
      });
      
      // Redirect based on role
      if (role === "founder") {
        navigate("/founder-dashboard");
      } else {
        navigate("/mentor-dashboard");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    
    // Simulate Google signup
    setTimeout(() => {
      // Set auth state - default to selected role
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role);
      
      toast({
        title: "Google sign up successful",
        description: "Welcome to LaunchPad!",
      });
      
      // Redirect based on role
      if (role === "founder") {
        navigate("/founder-dashboard");
      } else {
        navigate("/mentor-dashboard");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join LaunchPad to connect with mentors and founders"
      authType="signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 8 characters, including a number and a special character.
          </p>
        </div>

        <div className="space-y-2">
          <Label>I am a</Label>
          <RadioGroup value={role} onValueChange={setRole} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="founder" id="founder" />
              <Label htmlFor="founder" className="cursor-pointer">Startup Founder</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentor" id="mentor" />
              <Label htmlFor="mentor" className="cursor-pointer">Mentor</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            required
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-launchpad-blue hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-launchpad-blue hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-launchpad-blue hover:bg-launchpad-blue-dark"
          disabled={isLoading || !agreeTerms}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Create Account <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 flex items-center justify-center"
          onClick={handleGoogleSignup}
          disabled={isLoading}
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-launchpad-blue hover:underline font-medium">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
