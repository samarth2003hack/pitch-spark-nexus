
import { useState } from "react";
import { Check, Edit3, MessageSquare, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Step item component
const Step = ({
  number,
  title,
  description,
  icon: Icon,
  isActive = false,
  onClick,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  isActive?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-start p-4 rounded-lg transition-all duration-300 text-left ${
        isActive
          ? "bg-white shadow-md border-l-4 border-launchpad-blue"
          : "hover:bg-white/50"
      }`}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${
          isActive
            ? "bg-launchpad-blue text-white"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1 flex items-center">
          {title}
          {isActive && <Check className="ml-2 text-launchpad-blue w-5 h-5" />}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </button>
  );
};

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "Create Your Pitch",
      description:
        "Use our structured template to create a compelling pitch for your startup idea.",
      icon: Edit3,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
    },
    {
      number: 2,
      title: "Get Matched with Mentors",
      description:
        "Our platform connects you with experienced mentors in your industry.",
      icon: MessageSquare,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800",
    },
    {
      number: 3,
      title: "Receive Expert Feedback",
      description:
        "Collect detailed feedback on your business model, presentation, and strategy.",
      icon: MessageSquare,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    },
    {
      number: 4,
      title: "Track Your Progress",
      description:
        "Monitor engagement with your pitch and track improvements through analytics.",
      icon: BarChart,
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple four-step process helps founders refine their ideas and
            connect with mentors who can guide them to success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {steps.map((step) => (
              <Step
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isActive={activeStep === step.number}
                onClick={() => setActiveStep(step.number)}
              />
            ))}

            <div className="pt-6">
              <Link to="/signup">
                <Button className="bg-launchpad-blue hover:bg-launchpad-blue-dark">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl animate-fade-in-left">
            <img
              src={steps.find((step) => step.number === activeStep)?.image}
              alt={`Step ${activeStep}`}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {steps.find((step) => step.number === activeStep)?.title}
                </h3>
                <p className="text-gray-200">
                  {steps.find((step) => step.number === activeStep)?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
