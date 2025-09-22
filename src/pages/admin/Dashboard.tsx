import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Settings,
  Users,
  FileText,
  TrendingUp,
  Award,
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: <Settings className="h-4 w-4" /> },
  { name: "User Management", href: "/admin/users", icon: <Users className="h-4 w-4" /> },
  { name: "Reports & Analytics", href: "/admin/reports", icon: <FileText className="h-4 w-4" /> },
];

// Mock institutional data
const institutionalStats = {
  totalStudents: 1250,
  totalFaculty: 85,
  totalAchievements: 3420,
  totalAdmins: 12,
  pendingVerifications: 47,
  monthlyGrowth: 15,
  platformEngagement: 87,
  naacCompliance: 92
};

const recentActivities = [
  {
    id: 1,
    type: "achievement",
    description: "152 new achievements submitted this week",
    timestamp: "2 hours ago",
    priority: "normal"
  },
  {
    id: 2,
    type: "user",
    description: "15 new students registered",
    timestamp: "5 hours ago",
    priority: "normal"
  },
  {
    id: 3,
    type: "verification",
    description: "47 achievements pending faculty verification",
    timestamp: "1 day ago",
    priority: "high"
  },
  {
    id: 4,
    type: "report",
    description: "Monthly NAAC report generated successfully",
    timestamp: "2 days ago",
    priority: "normal"
  },
];

const AdminDashboard = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-rejected";
      case "medium":
        return "text-pending";
      default:
        return "text-muted-foreground";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Award className="h-4 w-4" />;
      case "user":
        return <Users className="h-4 w-4" />;
      case "verification":
        return <Clock className="h-4 w-4" />;
      case "report":
        return <FileText className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Layout portalType="admin" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Administrator Dashboard</h1>
          <p className="text-muted-foreground">Institutional overview and system management</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalStats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{institutionalStats.monthlyGrowth} new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <Users className="h-4 w-4 text-approved" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-approved">{institutionalStats.totalFaculty}</div>
              <p className="text-xs text-muted-foreground">
                Active mentors & verifiers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{institutionalStats.totalAchievements.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Verified student activities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-pending" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pending">{institutionalStats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting faculty review
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Health & Engagement */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>System Health & Engagement</CardTitle>
              <CardDescription>Platform performance and user engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Platform Engagement</span>
                  <span className="text-sm font-bold">{institutionalStats.platformEngagement}%</span>
                </div>
                <Progress value={institutionalStats.platformEngagement} />
                <p className="text-xs text-muted-foreground">Active users in the last 30 days</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">NAAC Compliance</span>
                  <span className="text-sm font-bold text-approved">{institutionalStats.naacCompliance}%</span>
                </div>
                <Progress value={institutionalStats.naacCompliance} />
                <p className="text-xs text-muted-foreground">Data quality for accreditation reporting</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-approved">98.5%</p>
                  <p className="text-xs text-muted-foreground">System Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">2.3s</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">450GB</p>
                  <p className="text-xs text-muted-foreground">Data Storage</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users ({institutionalStats.totalStudents + institutionalStats.totalFaculty})
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate NAAC Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics Dashboard
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Export Student Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 p-3 border rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-pending mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">High Verification Load</p>
                      <p className="text-xs text-muted-foreground">
                        47 achievements pending verification
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 border rounded-lg">
                    <CheckCircle className="h-4 w-4 text-approved mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Backup Complete</p>
                      <p className="text-xs text-muted-foreground">
                        Daily backup completed successfully
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
            <CardDescription>Latest platform activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border bg-card"
                >
                  <div className="flex-shrink-0 text-muted-foreground">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                  <div className={`text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                    {activity.priority}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;