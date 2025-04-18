
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BarChart, Calendar, CheckCircle, Clock, Eye, 
  FileText, MessageSquare, Star, ThumbsUp, TrendingUp, 
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Chart component (simplified for now)
const MentorAnalyticsChart = () => {
  return (
    <div className="w-full h-64 bg-white border rounded-xl p-4 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <BarChart size={48} className="mx-auto mb-2 text-launchpad-blue opacity-70" />
        <p>Mentor activity analytics would appear here</p>
      </div>
    </div>
  );
};

// Recent activity component
const MentorRecentActivity = () => {
  const activities = [
    { id: 1, type: "feedback", message: "You provided feedback on 'HealthAI' pitch", time: "1 hour ago" },
    { id: 2, type: "review", message: "You completed a review of 'EduTech Platform' pitch", time: "1 day ago" },
    { id: 3, type: "match", message: "You were matched with founder Sarah Johnson", time: "2 days ago" },
    { id: 4, type: "rating", message: "Sarah Johnson rated your feedback 5 stars", time: "3 days ago" }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <MessageSquare className="text-purple-500" size={18} />;
      case "review":
        return <CheckCircle className="text-green-500" size={18} />;
      case "match":
        return <Users className="text-orange-500" size={18} />;
      case "rating":
        return <Star className="text-yellow-500" size={18} />;
      default:
        return <Calendar className="text-gray-500" size={18} />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="mt-0.5">{getIcon(activity.type)}</div>
          <div>
            <p className="text-sm text-gray-700">{activity.message}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Pitch card component
const PitchCard = ({
  title,
  founder,
  category,
  deadline,
  status
}: {
  title: string;
  founder: string;
  category: string;
  deadline: string;
  status: "new" | "in-progress" | "reviewed";
}) => {
  return (
    <div className="bg-white rounded-lg border p-4 hover:border-launchpad-blue/30 hover:shadow-sm transition-all">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {status === "new" && (
          <Badge className="bg-launchpad-accent">New</Badge>
        )}
        {status === "in-progress" && (
          <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
            In Progress
          </Badge>
        )}
        {status === "reviewed" && (
          <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
            Reviewed
          </Badge>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-3">By {founder}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span className="bg-gray-100 px-2 py-1 rounded-full">{category}</span>
        <div className="flex items-center">
          <Clock size={14} className="mr-1" />
          {deadline}
        </div>
      </div>
      <Button 
        className={`w-full ${status === "reviewed" ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-launchpad-blue hover:bg-launchpad-blue-dark"}`}
        disabled={status === "reviewed"}
      >
        {status === "new" && "Start Review"}
        {status === "in-progress" && "Continue Review"}
        {status === "reviewed" && "Reviewed"}
      </Button>
    </div>
  );
};

const MentorDashboard = () => {
  return (
    <DashboardLayout userRole="mentor">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Welcome card */}
        <Card className="lg:col-span-2 animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>Welcome Back, Michael</CardTitle>
            <CardDescription>
              Here's your mentor activity summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-launchpad-blue/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-launchpad-blue">
                    <FileText size={24} />
                  </div>
                  <span className="text-xs font-medium text-launchpad-blue/70">+3 new</span>
                </div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-gray-600">Pitches Reviewed</p>
              </div>
              <div className="bg-purple-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-purple-600">
                    <MessageSquare size={24} />
                  </div>
                  <span className="text-xs font-medium text-purple-600/70">+8% ↑</span>
                </div>
                <p className="text-2xl font-bold">56</p>
                <p className="text-sm text-gray-600">Feedback Given</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-yellow-600">
                    <Star size={24} />
                  </div>
                  <span className="text-xs font-medium text-yellow-600/70">+2% ↑</span>
                </div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Mentorship Activity</h3>
                <Link to="/mentor-dashboard/analytics">
                  <Button variant="ghost" size="sm" className="text-launchpad-blue">
                    View Details
                  </Button>
                </Link>
              </div>
              <MentorAnalyticsChart />
            </div>
          </CardContent>
        </Card>

        {/* Your impact */}
        <Card className="animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>Your Impact</CardTitle>
            <CardDescription>
              How you're helping founders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <ThumbsUp size={20} />
                </div>
                <div>
                  <p className="font-bold text-xl">87%</p>
                  <p className="text-sm text-gray-600">Founders found your feedback helpful</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "87%" }}></div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Top Expertise Areas</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Product Strategy</span>
                  <Badge variant="outline" className="bg-launchpad-blue/10 text-launchpad-blue border-launchpad-blue/20">
                    22 Pitches
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marketing</span>
                  <Badge variant="outline" className="bg-launchpad-blue/10 text-launchpad-blue border-launchpad-blue/20">
                    16 Pitches
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Business Model</span>
                  <Badge variant="outline" className="bg-launchpad-blue/10 text-launchpad-blue border-launchpad-blue/20">
                    12 Pitches
                  </Badge>
                </div>
              </div>
            </div>

            <Link to="/mentor-dashboard/expertise">
              <Button variant="outline" className="w-full">
                <Star className="mr-2 h-4 w-4" />
                Update Expertise
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pitches to review */}
        <Card className="lg:col-span-2 animate-fade-in shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Pitches To Review</CardTitle>
              <CardDescription>
                Startup pitches waiting for your feedback
              </CardDescription>
            </div>
            <Link to="/mentor-dashboard/pitches-to-review">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PitchCard
                title="EcoTech Solution"
                founder="Sarah Johnson"
                category="Cleantech"
                deadline="Due in 3 days"
                status="new"
              />
              <PitchCard
                title="FinLearn App"
                founder="Aisha Patel"
                category="FinTech"
                deadline="Due in 5 days"
                status="in-progress"
              />
              <PitchCard
                title="Remote Work Platform"
                founder="David Kim"
                category="SaaS"
                deadline="Completed"
                status="reviewed"
              />
              <PitchCard
                title="HealthAI"
                founder="Carlos Rodriguez"
                category="HealthTech"
                deadline="Due in 2 days"
                status="new"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest mentoring activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MentorRecentActivity />
            
            <div className="mt-4 pt-4 border-t">
              <div className="bg-launchpad-blue/5 p-4 rounded-lg border border-launchpad-blue/10">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Upcoming Session</p>
                  <span className="text-xs text-launchpad-blue bg-launchpad-blue/10 px-2 py-1 rounded-full">
                    Tomorrow
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  With <span className="font-medium">Sarah Johnson</span> on "EcoTech Solution"
                </p>
                <p className="text-xs text-gray-500">Apr 19, 2025 • 10:00 AM</p>
                <div className="mt-3">
                  <Button size="sm" className="w-full bg-launchpad-blue">
                    Prepare for Session
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
