import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  TrendingUp,
  Award,
  BookOpen,
  FileText,
  Calendar,
  Settings,
  HelpCircle,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/student", icon: <BarChart className="h-4 w-4" /> },
  { name: "Achievements", href: "/student/achievements", icon: <Award className="h-4 w-4" /> },
  { name: "Portfolio", href: "/student/portfolio", icon: <FileText className="h-4 w-4" /> },
  { name: "Academic Records", href: "/student/academics", icon: <BookOpen className="h-4 w-4" /> },
  { name: "Settings", href: "/student/settings", icon: <Settings className="h-4 w-4" /> },
  { name: "Support", href: "/student/support", icon: <HelpCircle className="h-4 w-4" /> },
];

// Mock data
const mockActivities = [
  {
    id: 1,
    title: "Web Development Workshop",
    type: "Workshop",
    date: "2024-01-15",
    status: "approved",
    organization: "Tech Club"
  },
  {
    id: 2,
    title: "Data Science Internship",
    type: "Internship",
    date: "2024-01-10",
    status: "pending",
    organization: "Tech Corp"
  },
  {
    id: 3,
    title: "Community Service Project",
    type: "Volunteer Work",
    date: "2024-01-05",
    status: "rejected",
    organization: "NGO Seva"
  },
  {
    id: 4,
    title: "Research Paper Publication",
    type: "Research",
    date: "2024-01-01",
    status: "approved",
    organization: "IEEE Conference"
  },
];

const StudentDashboard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-approved text-approved-foreground";
      case "pending":
        return "bg-pending text-pending-foreground";
      case "rejected":
        return "bg-rejected text-rejected-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const approvedCount = mockActivities.filter(a => a.status === "approved").length;
  const pendingCount = mockActivities.filter(a => a.status === "pending").length;
  const totalActivities = mockActivities.length;

  return (
    <Layout portalType="student" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Track your academic journey and achievements</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActivities}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-approved" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-approved">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">
                Verified achievements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-pending" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pending">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting verification
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity Timeline</CardTitle>
                  <CardDescription>Your latest submissions and their status</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border bg-card"
                  >
                    <div className="flex-shrink-0">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.organization} • {activity.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Achievement
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Portfolio
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Academic Calendar
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
                <CardDescription>Real-time ERP data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current CGPA</span>
                    <span className="text-sm font-bold">8.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Attendance</span>
                    <span className="text-sm font-bold">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Credits Earned</span>
                    <span className="text-sm font-bold">140/180</span>
                  </div>
                  <Progress value={78} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;