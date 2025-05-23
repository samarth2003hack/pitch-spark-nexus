import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BarChart2,
  Download,
  ExternalLink,
  FileText,
  Heart,
  MessageSquare,
  Share2,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Feedback component
const FeedbackItem = ({
  name,
  role,
  date,
  rating,
  comment,
  avatarUrl,
}: {
  name: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}) => {
  return (

    <div className="border-b pb-6 mb-6 last:border-0">
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between mb-1">
            <div>
              <span className="font-medium">{name}</span>
              <span className="text-sm text-gray-500 ml-2">{role}</span>
            </div>
            <span className="text-xs text-gray-500">{date}</span>
          </div>

          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>

          <p className="text-gray-700">{comment}</p>

          <div className="flex items-center mt-3 space-x-4">
            <button className="flex items-center text-xs text-gray-500 hover:text-launchpad-blue">
              <ThumbsUp size={14} className="mr-1" />
              Helpful
            </button>
            <button className="flex items-center text-xs text-gray-500 hover:text-launchpad-blue">
              <MessageSquare size={14} className="mr-1" />
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Analytics component (simplified visualization)
const PitchAnalytics = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pitch Performance Overview</CardTitle>
          <CardDescription>
            View statistics about your pitch's performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-launchpad-blue/10 rounded-xl p-4">
              <div className="text-launchpad-blue mb-2">
                <User size={24} />
              </div>
              <p className="text-2xl font-bold">127</p>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
            <div className="bg-purple-100 rounded-xl p-4">
              <div className="text-purple-600 mb-2">
                <MessageSquare size={24} />
              </div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-gray-600">Feedbacks</p>
            </div>
            <div className="bg-yellow-100 rounded-xl p-4">
              <div className="text-yellow-600 mb-2">
                <Star size={24} />
              </div>
              <p className="text-2xl font-bold">4.7</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="w-full h-64 bg-gray-50 border rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 size={48} className="mx-auto mb-2 text-launchpad-blue opacity-70" />
              <p>Detailed analytics visualization would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
          <CardDescription>
            How viewers are interacting with your pitch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Presentation Clarity</span>
                <span className="text-sm font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: "96%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Business Model</span>
                <span className="text-sm font-medium">4.2/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-launchpad-blue h-2.5 rounded-full"
                  style={{ width: "84%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Innovation</span>
                <span className="text-sm font-medium">4.5/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-500 h-2.5 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Market Analysis</span>
                <span className="text-sm font-medium">3.9/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PitchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);

  // Mock data - in a real app, you would fetch this data based on the pitch ID
  const pitchData = {
    id: id || "1",
    title: "EcoTech Solution - Sustainable Energy Management Platform",
    status: "active",
    category: "Cleantech",
    founder: {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    date: "April 10, 2025",
    description:
      "EcoTech Solution is a cloud-based platform that helps businesses monitor and optimize their energy consumption in real-time. Our AI-powered solution identifies inefficiencies, recommends optimizations, and automates energy management to reduce costs and carbon footprint.",
    problem:
      "Companies waste up to 30% of their energy due to inefficient systems, lack of real-time monitoring, and inability to identify optimization opportunities. Current solutions are expensive, difficult to implement, and don't provide actionable insights.",
    solution:
      "Our platform connects to existing energy infrastructure through IoT sensors, collects real-time data, and uses proprietary AI algorithms to identify patterns, inefficiencies, and optimization opportunities. The system automatically adjusts energy usage based on needs and provides real-time dashboards and reports for management.",
    businessModel:
      "SaaS subscription model with tiered pricing based on company size and energy consumption. Initial setup fee plus monthly subscription ranging from $499 to $2,999 per month.",
    market:
      "The global energy management systems market is expected to reach $89.95 billion by 2027, growing at a CAGR of 17.1%. Our initial target is medium to large manufacturing businesses in North America, representing a $12B opportunity.",
    traction:
      "Currently in beta with 5 manufacturing companies. Average energy savings of 22% reported by early users. LOIs from 12 additional companies waiting for launch.",
    team: [
      {
        name: "Sarah Johnson",
        role: "Founder & CEO",
        bio: "10+ years in energy management systems. Previously VP at EnergyCorp.",
      },
      {
        name: "Michael Li",
        role: "CTO",
        bio: "Former lead engineer at Tesla Energy. MS in Electrical Engineering from MIT.",
      },
      {
        name: "Priya Sharma",
        role: "Head of Sales",
        bio: "15+ years B2B SaaS sales experience. Previously at Schneider Electric.",
      },
    ],
    fundingStatus: "Seeking $1.5M Seed Round",
    askAmount: "$1,500,000",
    useOfFunds: "Product development (40%), Market expansion (35%), Team growth (25%)",
    pitchDeck: "ecotech-solution-deck.pdf",
    website: "https://ecotechsolution.com",
    feedback: [
      {
        id: "1",
        name: "Michael Chen",
        role: "Mentor - Energy Sector",
        date: "April 15, 2025",
        rating: 4,
        comment:
          "Strong concept with impressive early traction. The market analysis is thorough, and the team has relevant experience. I would recommend more clarity on customer acquisition strategy and how you plan to scale beyond manufacturing. The solution is technically sound, and I appreciate the focus on measurable ROI for customers.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
      },
      {
        id: "2",
        name: "Jane Doe",
        role: "Mentor - Startup Strategy",
        date: "April 13, 2025",
        rating: 5,
        comment:
          "EcoTech Solution addresses a significant pain point with a well-thought-out product. The business model is clear and appears sustainable. I particularly like the IoT + AI approach to create a competitive moat. Consider refining your go-to-market strategy with more specific customer segmentation. Overall, this is one of the stronger pitches I've reviewed this quarter.",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100",
      },
    ],
    media: {
      video: "https://example.com/pitch-video.mp4",
      photos: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      ],
    },
  };

  // Function to handle feedback submission
  const handleSubmitFeedback = () => {
    alert("In a real app, this would submit your feedback to the database");
    setFeedbackText("");
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              to="/pitches"
              className="inline-flex items-center text-sm text-gray-600 hover:text-launchpad-blue"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pitches
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {pitchData.title}
                      </CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-2">
                          {pitchData.category}
                        </Badge>
                        <span className="text-gray-500">
                          Posted on {pitchData.date}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{pitchData.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pitch Media</CardTitle>
                  <CardDescription>
                    Video presentation and supporting images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pitchData.media.video && (
                      <div className="aspect-video w-full">
                        <video
                          controls
                          className="w-full h-full rounded-lg"
                          src={pitchData.media.video}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {pitchData.media.photos && pitchData.media.photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {pitchData.media.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden"
                          >
                            <img
                              src={photo}
                              alt={`Pitch image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Problem & Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Problem</h3>
                      <p className="text-gray-700">{pitchData.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Solution</h3>
                      <p className="text-gray-700">{pitchData.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pitch Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Business Model</h2>
                      <p className="text-gray-700">{pitchData.businessModel}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Market Opportunity</h2>
                      <p className="text-gray-700">{pitchData.market}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Traction</h2>
                      <p className="text-gray-700">{pitchData.traction}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Team</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pitchData.team.map((member, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                            <p className="text-sm">{member.bio}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Funding</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Funding Status</p>
                          <p className="font-medium">{pitchData.fundingStatus}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Ask Amount</p>
                          <p className="font-medium">{pitchData.askAmount}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-500 mb-1">Use of Funds</p>
                          <p className="font-medium">{pitchData.useOfFunds}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Founder</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={pitchData.founder.avatarUrl}
                        alt={pitchData.founder.name}
                      />
                      <AvatarFallback>
                        {pitchData.founder.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-lg">{pitchData.founder.name}</p>
                      <p className="text-gray-500">{pitchData.founder.role}</p>
                      <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-launchpad-blue">
                        View Profile
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                    <Button className="flex-1 bg-launchpad-blue hover:bg-launchpad-blue-dark">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pitch Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">{pitchData.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {pitchData.status === "active" ? "Active" : pitchData.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Seeking</p>
                      <p className="font-medium">{pitchData.askAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Team Size</p>
                      <p className="font-medium">{pitchData.team.length} members</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Posted on</p>
                      <p className="font-medium">{pitchData.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Similar Pitches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3 hover:border-launchpad-blue hover:bg-launchpad-blue/5 transition-colors cursor-pointer">
                      <p className="font-medium">Green Energy Monitoring</p>
                      <p className="text-xs text-gray-500 mb-1">Cleantech</p>
                      <div className="flex items-center text-xs">
                        <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span>4.5/5</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3 hover:border-launchpad-blue hover:bg-launchpad-blue/5 transition-colors cursor-pointer">
                      <p className="font-medium">Carbon Footprint Tracker</p>
                      <p className="text-xs text-gray-500 mb-1">Cleantech</p>
                      <div className="flex items-center text-xs">
                        <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span>4.2/5</span>
                      </div>
                    </div>
                    <div className="rounded-lg border p-3 hover:border-launchpad-blue hover:bg-launchpad-blue/5 transition-colors cursor-pointer">
                      <p className="font-medium">Smart Factory Optimization</p>
                      <p className="text-xs text-gray-500 mb-1">Industrial IoT</p>
                      <div className="flex items-center text-xs">
                        <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span>4.8/5</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4 text-launchpad-blue">
                    View More Similar Pitches
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PitchDetails;
