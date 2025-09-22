import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  FileCheck,
  User,
  Award,
  Eye,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/faculty", icon: <Users className="h-4 w-4" /> },
  { name: "Verify Achievements", href: "/faculty/verify", icon: <FileCheck className="h-4 w-4" /> },
  { name: "Student Management", href: "/faculty/students", icon: <User className="h-4 w-4" /> },
];

// Mock data
const mockRecentSubmissions = [
  {
    id: 1,
    studentName: "John Doe",
    rollNumber: "CS2021001",
    title: "Web Development Workshop",
    type: "Workshop",
    submittedDate: "2024-01-15",
    status: "pending"
  },
  {
    id: 2,
    studentName: "Jane Smith",
    rollNumber: "CS2021002",
    title: "Machine Learning Certification",
    type: "Certification",
    submittedDate: "2024-01-14",
    status: "pending"
  },
  {
    id: 3,
    studentName: "Mike Johnson",
    rollNumber: "CS2021003",
    title: "Hackathon Participation",
    type: "Competition",
    submittedDate: "2024-01-13",
    status: "pending"
  },
];

const facultyStats = {
  totalMentees: 45,
  pendingVerifications: 12,
  verifiedThisWeek: 8,
  averageResponseTime: "2.5 days"
};

const FacultyDashboard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-pending text-pending-foreground";
      case "approved":
        return "bg-approved text-approved-foreground";
      case "rejected":
        return "bg-rejected text-rejected-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout portalType="faculty" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Monitor and guide your mentees' academic journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facultyStats.totalMentees}</div>
              <p className="text-xs text-muted-foreground">
                Assigned students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <AlertCircle className="h-4 w-4 text-pending" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pending">{facultyStats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting your review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-approved" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-approved">{facultyStats.verifiedThisWeek}</div>
              <p className="text-xs text-muted-foreground">
                Achievements processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facultyStats.averageResponseTime}</div>
              <p className="text-xs text-muted-foreground">
                Per verification
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Verifications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Latest achievement submissions from your mentees</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All ({facultyStats.pendingVerifications})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border bg-card"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {submission.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submission.studentName} ({submission.rollNumber}) • {submission.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(submission.status)}>
                        <Clock className="h-3 w-3 mr-1" />
                        {submission.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(submission.submittedDate).toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Insights */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common faculty tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Review Pending ({facultyStats.pendingVerifications})
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  View Student Profiles
                </Button>
                <Button className="w-full" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Verification History
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Insights</CardTitle>
                <CardDescription>Your mentorship impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Verifications Completed</span>
                    <span className="text-sm font-bold">{facultyStats.verifiedThisWeek}/15</span>
                  </div>
                  <Progress value={(facultyStats.verifiedThisWeek / 15) * 100} />
                  
                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Student Engagement</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Response Rate</span>
                      <span className="font-medium">95%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacultyDashboard;