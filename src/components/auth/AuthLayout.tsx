
import { ReactNode } from "react";
import { Link } from "react-router-dom";


interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  authType: "login" | "signup";
}

export function AuthLayout({ children, title, subtitle, authType }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Auth form */}
      <div className="w-full md:w-1/2 flex flex-col p-4 sm:p-10 xl:p-20 justify-center">
        <div className="mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-xl text-launchpad-blue-dark">LaunchPad</span>
          </Link>
        </div>
        
        <div className="max-w-md w-full mx-auto">
          <div className="text-center sm:text-left mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          
          {children}
          
          <div className="mt-8 text-center sm:text-left">
            {authType === "login" ? (
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-launchpad-blue font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-launchpad-blue font-medium hover:underline">
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-launchpad-blue">
        <div className="h-full flex flex-col items-center justify-center p-10 text-white">
          <div className="max-w-md text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {authType === "login"
                ? "Welcome back to LaunchPad"
                : "Join the LaunchPad community"}
            </h2>
            <p className="text-white/80 text-lg">
              {authType === "login"
                ? "Connect with mentors and continue refining your startup journey."
                : "Get feedback on your startup ideas from experienced mentors."}
            </p>
          </div>
          
          <div className="w-full max-w-lg">
            <img
              src={
                authType === "login"
                  ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  : "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800"
              }
              alt={authType === "login" ? "Login illustration" : "Signup illustration"}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
