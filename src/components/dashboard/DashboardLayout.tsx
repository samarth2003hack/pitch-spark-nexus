
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
  X,
  Home,
  BarChart2,
  FileText,
  MessageSquare,
  Users,
  PenTool,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: "founder" | "mentor";
}

interface NavItem {
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  badge?: number;
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Define navigation items based on user role
  const founderNavItems: NavItem[] = [
    { label: "Dashboard", icon: Home, href: "/founder-dashboard" },
    { label: "My Pitches", icon: FileText, href: "/founder-dashboard/pitches" },
    { label: "Create Pitch", icon: PenTool, href: "/founder-dashboard/create-pitch" },
    { label: "Feedback", icon: MessageSquare, href: "/founder-dashboard/feedback", badge: 3 },
    { label: "Analytics", icon: BarChart2, href: "/founder-dashboard/analytics" },
    { label: "Mentors", icon: Users, href: "/founder-dashboard/mentors" }
  ];

  const mentorNavItems: NavItem[] = [
    { label: "Dashboard", icon: Home, href: "/mentor-dashboard" },
    { label: "Pitches to Review", icon: FileText, href: "/mentor-dashboard/pitches-to-review", badge: 5 },
    { label: "Feedback Given", icon: MessageSquare, href: "/mentor-dashboard/feedback" },
    { label: "My Expertise", icon: Star, href: "/mentor-dashboard/expertise" },
    { label: "Analytics", icon: BarChart2, href: "/mentor-dashboard/analytics" }
  ];

  const navItems = userRole === "founder" ? founderNavItems : mentorNavItems;

  // Check if path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking on a link on mobile
  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 bg-white border-r border-gray-200`}
      >
        {/* Sidebar header */}
        <div className="h-16 px-4 flex items-center justify-between border-b">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-bold text-xl text-launchpad-blue-dark">LaunchPad</span>
          </Link>
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Sidebar content */}
        <div className="py-4 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-md group ${
                    isActive(item.href)
                      ? "bg-launchpad-blue text-white"
                      : "text-gray-700 hover:bg-launchpad-blue/10"
                  }`}
                  onClick={closeSidebarOnMobile}
                >
                  <item.icon size={20} className={`mr-3 ${!isActive(item.href) && "text-gray-500 group-hover:text-launchpad-blue"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-launchpad-accent">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <ul className="space-y-2">
              <li>
                <Link
                  to={`/${userRole}-dashboard/settings`}
                  className={`flex items-center px-4 py-3 rounded-md group ${
                    isActive(`/${userRole}-dashboard/settings`)
                      ? "bg-launchpad-blue text-white"
                      : "text-gray-700 hover:bg-launchpad-blue/10"
                  }`}
                  onClick={closeSidebarOnMobile}
                >
                  <Settings
                    size={20}
                    className={`mr-3 ${!isActive(`/${userRole}-dashboard/settings`) && "text-gray-500 group-hover:text-launchpad-blue"}`}
                  />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-500 group"
                  onClick={closeSidebarOnMobile}
                >
                  <LogOut size={20} className="mr-3 text-gray-500 group-hover:text-red-500" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`md:ml-64 transition-all duration-300 ${isMobile && isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b px-4 flex items-center justify-between">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
          )}

          <div className={`flex-1 ${isMobile ? "ml-4" : ""}`}>
            <h1 className="text-xl font-semibold text-gray-800">
              {userRole === "founder" ? "Founder Dashboard" : "Mentor Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-launchpad-accent text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem className="py-3 cursor-pointer">
                    <div>
                      <p className="font-medium">New feedback received</p>
                      <p className="text-sm text-gray-500">
                        John Doe left feedback on your pitch "EcoTech Solution"
                      </p>
                      <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3 cursor-pointer">
                    <div>
                      <p className="font-medium">Pitch view milestone</p>
                      <p className="text-sm text-gray-500">
                        Your pitch "EcoTech Solution" reached 50 views
                      </p>
                      <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-3 cursor-pointer">
                    <div>
                      <p className="font-medium">New mentor match</p>
                      <p className="text-sm text-gray-500">
                        You've been matched with a new mentor in your industry
                      </p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-2 justify-center text-center text-launchpad-blue cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userRole === "founder" ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"}
                      alt="User"
                    />
                    <AvatarFallback>
                      {userRole === "founder" ? "SJ" : "MC"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {userRole === "founder" ? "Sarah Johnson" : "Michael Chen"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="p-4 md:p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
