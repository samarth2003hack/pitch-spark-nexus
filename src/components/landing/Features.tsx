
import { LightbulbIcon, Users, BarChart3, MessageCircle } from "lucide-react";

// Feature card component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string; 
  delay?: number;
}) => {
  return (
    <div 
      className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 card-hover"
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "both" 
      }}
    >
      <div className="w-12 h-12 rounded-full bg-launchpad-blue/10 text-launchpad-blue flex items-center justify-center mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export function Features() {
  const features = [
    {
      icon: LightbulbIcon,
      title: "Showcase Your Ideas",
      description: "Present your startup concept with structured pitch templates designed to highlight your vision and strategy.",
      delay: 0
    },
    {
      icon: Users,
      title: "Connect with Mentors",
      description: "Get matched with experienced mentors in your industry who can provide valuable insights and guidance.",
      delay: 100
    },
    {
      icon: MessageCircle,
      title: "Receive Expert Feedback",
      description: "Collect detailed feedback from mentors on your business model, pitch presentation, and overall strategy.",
      delay: 200
    },
    {
      icon: BarChart3,
      title: "Track Your Progress",
      description: "Monitor engagement with your pitch and visualize improvements through our analytics dashboard.",
      delay: 300
    }
  ];

  return (
    <section className="section-padding bg-launchpad-gray-light">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Elevate Your Startup Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            LaunchPad provides the tools and connections founders need to refine their ideas and mentors need to discover promising startups.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
