import { useState } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { toast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";

// 🔽 Firebase auth
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config"; // 🔁 update path as per your project

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Optional: store auth state locally if "remember me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // Determine role and redirect accordingly
      let role = "founder"; // default
      if (email.includes("mentor")) role = "mentor";

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role);

      toast({
        title: "Login successful",
        description: `Welcome back, ${role}!`,
      });

      navigate(role === "mentor" ? "/mentor-dashboard" : "/founder-dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email || "";

      let role = "founder"; // Default for demo
      if (email.includes("mentor")) role = "mentor";

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", role);

      toast({
        title: "Google login successful",
        description: "Welcome to LaunchPad!",
      });

      navigate(role === "mentor" ? "/mentor-dashboard" : "/founder-dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Google login failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <AuthLayout
        title="Welcome back"
        subtitle="Enter your credentials to access your account"
        authType="login"
      >
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
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
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-launchpad-blue hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-launchpad-blue hover:bg-launchpad-blue-dark"
            disabled={isLoading}
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
                Logging in...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Login <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            )}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 flex items-center justify-center"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-launchpad-blue hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Login;
