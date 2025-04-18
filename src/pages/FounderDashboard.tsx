
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Calendar, Eye, MessageSquare, PenTool, TrendingUp, Users } from "lucide-react";

// Chart component (simplified for now)
const AnalyticsChart = () => {
  return (
    <div className="w-full h-64 bg-white border rounded-xl p-4 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <BarChart size={48} className="mx-auto mb-2 text-launchpad-blue opacity-70" />
        <p>Analytics chart visualization would appear here</p>
      </div>
    </div>
  );
};

// Recent activity component
const RecentActivity = () => {
  const activities = [
    { id: 1, type: "feedback", message: "Jane Doe left feedback on your pitch 'EcoTech Solution'", time: "2 hours ago" },
    { id: 2, type: "view", message: "Your pitch 'EcoTech Solution' was viewed by 5 new mentors", time: "1 day ago" },
    { id: 3, type: "update", message: "You updated your 'EcoTech Solution' pitch", time: "3 days ago" },
    { id: 4, type: "match", message: "You were matched with mentor Michael Chen", time: "1 week ago" }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <MessageSquare className="text-purple-500" size={18} />;
      case "view":
        return <Eye className="text-blue-500" size={18} />;
      case "update":
        return <PenTool className="text-green-500" size={18} />;
      case "match":
        return <Users className="text-orange-500" size={18} />;
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

const FounderDashboard = () => {
  return (
    <DashboardLayout userRole="founder">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Welcome card */}
        <Card className="lg:col-span-2 animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>Welcome Back, Sarah</CardTitle>
            <CardDescription>
              Here's what's happening with your pitches today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-launchpad-blue/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-launchpad-blue">
                    <Eye size={24} />
                  </div>
                  <span className="text-xs font-medium text-launchpad-blue/70">+12% ↑</span>
                </div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
              <div className="bg-purple-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-purple-600">
                    <MessageSquare size={24} />
                  </div>
                  <span className="text-xs font-medium text-purple-600/70">+5% ↑</span>
                </div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-600">Feedback Received</p>
              </div>
              <div className="bg-green-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-green-600">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-xs font-medium text-green-600/70">+8% ↑</span>
                </div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-600">Active Pitches</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Pitch Performance</h3>
                <Link to="/founder-dashboard/analytics">
                  <Button variant="ghost" size="sm" className="text-launchpad-blue">
                    View Details
                  </Button>
                </Link>
              </div>
              <AnalyticsChart />
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card className="animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you can perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/founder-dashboard/create-pitch">
              <Button className="w-full bg-launchpad-blue hover:bg-launchpad-blue-dark">
                <PenTool className="mr-2 h-4 w-4" />
                Create New Pitch
              </Button>
            </Link>
            <Link to="/founder-dashboard/pitches">
              <Button variant="outline" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                View My Pitches
              </Button>
            </Link>
            <Link to="/founder-dashboard/feedback">
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Review Feedback
              </Button>
            </Link>
            <Link to="/founder-dashboard/mentors">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Find Mentors
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <Card className="lg:col-span-2 animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates on your pitches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        {/* Upcoming mentorship */}
        <Card className="animate-fade-in shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>
              Scheduled mentorship meetings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-launchpad-blue/5 p-4 rounded-lg border border-launchpad-blue/10">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Pitch Review Session</p>
                  <span className="text-xs text-launchpad-blue bg-launchpad-blue/10 px-2 py-1 rounded-full">
                    Tomorrow
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  With <span className="font-medium">Michael Chen</span>
                </p>
                <p className="text-xs text-gray-500">Apr 19, 2025 • 10:00 AM</p>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Reschedule
                  </Button>
                  <Button size="sm" className="text-xs bg-launchpad-blue">
                    Join
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">Feedback Discussion</p>
                  <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                    Next Week
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  With <span className="font-medium">Jane Doe</span>
                </p>
                <p className="text-xs text-gray-500">Apr 24, 2025 • 2:00 PM</p>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Reschedule
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Cancel
                  </Button>
                </div>
              </div>

              <Link to="/founder-dashboard/schedule">
                <Button variant="ghost" size="sm" className="w-full text-launchpad-blue">
                  View All Scheduled Sessions
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FounderDashboard;
