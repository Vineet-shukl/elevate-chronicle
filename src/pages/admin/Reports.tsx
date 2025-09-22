import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Settings,
  Users,
  FileText,
  Download,
  BarChart3,
  PieChart,
  Filter,
  Calendar,
  Award,
  GraduationCap,
  TrendingUp,
  Activity,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: <Settings className="h-4 w-4" /> },
  { name: "User Management", href: "/admin/users", icon: <Users className="h-4 w-4" /> },
  { name: "Reports & Analytics", href: "/admin/reports", icon: <FileText className="h-4 w-4" /> },
];

// Mock report data
const institutionalReports = [
  {
    id: "naac-2024",
    name: "NAAC Accreditation Report 2024",
    type: "NAAC",
    description: "Comprehensive report for NAAC accreditation including all student achievements and institutional metrics",
    lastGenerated: "2024-01-15",
    status: "ready",
    size: "2.5 MB"
  },
  {
    id: "nirf-2024",
    name: "NIRF Ranking Data 2024",
    type: "NIRF",
    description: "National Institutional Ranking Framework data compilation with research and innovation metrics",
    lastGenerated: "2024-01-10",
    status: "ready",
    size: "1.8 MB"
  },
  {
    id: "annual-2023",
    name: "Annual Achievement Report 2023",
    type: "Annual",
    description: "Complete annual report of student achievements, faculty performance, and institutional growth",
    lastGenerated: "2023-12-31",
    status: "ready",
    size: "4.2 MB"
  },
];

const analyticsData = {
  monthlyAchievements: [
    { month: "Aug", count: 145 },
    { month: "Sep", count: 189 },
    { month: "Oct", count: 234 },
    { month: "Nov", count: 198 },
    { month: "Dec", count: 267 },
    { month: "Jan", count: 312 },
  ],
  achievementsByType: [
    { type: "Workshop", count: 456, percentage: 32 },
    { type: "Internship", count: 234, percentage: 16 },
    { type: "Competition", count: 189, percentage: 13 },
    { type: "Certification", count: 167, percentage: 12 },
    { type: "Research", count: 145, percentage: 10 },
    { type: "Volunteer Work", count: 234, percentage: 17 },
  ],
  departmentStats: [
    { department: "Computer Science", students: 450, achievements: 1234, avgCGPA: 8.4 },
    { department: "Information Technology", students: 380, achievements: 987, avgCGPA: 8.2 },
    { department: "Electronics", students: 320, achievements: 756, avgCGPA: 8.1 },
    { department: "Mechanical", students: 290, achievements: 634, avgCGPA: 7.9 },
  ]
};

const AdminReports = () => {
  const [selectedReportType, setSelectedReportType] = useState("all");
  const [dateRange, setDateRange] = useState("current-year");
  const [isGenerating, setIsGenerating] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-approved text-approved-foreground";
      case "generating":
        return "bg-pending text-pending-foreground";
      case "error":
        return "bg-rejected text-rejected-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleGenerateReport = async (reportType: string) => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    alert(`${reportType} report generated successfully!`);
  };

  const handleDownloadReport = (reportId: string) => {
    alert(`Downloading report: ${reportId}`);
  };

  return (
    <Layout portalType="admin" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate institutional reports and view platform analytics</p>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">Institutional Reports</TabsTrigger>
            <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            {/* Pre-built Report Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Accreditation Reports
                </CardTitle>
                <CardDescription>
                  One-click generation of NAAC and NIRF compliant reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">NAAC Self-Assessment Report</h3>
                      <Badge variant="outline">Template</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Automatically compiles student achievements, faculty data, and institutional metrics for NAAC accreditation.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleGenerateReport("NAAC")}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate NAAC Report"}
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">NIRF Data Template</h3>
                      <Badge variant="outline">Template</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Generates NIRF ranking data including research output, student achievements, and innovation metrics.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleGenerateReport("NIRF")}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate NIRF Report"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>
                  Recently generated institutional reports ready for download
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institutionalReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{report.name}</h3>
                          <Badge variant="outline">{report.type}</Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Generated: {new Date(report.lastGenerated).toLocaleDateString()} • Size: {report.size}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,420</div>
                  <p className="text-xs text-approved">↗ +15% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,250</div>
                  <p className="text-xs text-approved">↗ +3% this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">24hr avg response</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-approved">NAAC compliant</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Achievement Trends
                  </CardTitle>
                  <CardDescription>Monthly achievement submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.monthlyAchievements.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.month}</span>
                        <div className="flex items-center space-x-2 flex-1 ml-4">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(item.count / 350) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Achievement Categories
                  </CardTitle>
                  <CardDescription>Distribution by activity type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.achievementsByType.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.type}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Academic and achievement metrics by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.departmentStats.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{dept.department}</h3>
                        <Badge variant="outline">{dept.students} students</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-primary">{dept.achievements}</p>
                          <p className="text-xs text-muted-foreground">Achievements</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-approved">{dept.avgCGPA}</p>
                          <p className="text-xs text-muted-foreground">Avg CGPA</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold">{(dept.achievements / dept.students).toFixed(1)}</p>
                          <p className="text-xs text-muted-foreground">Per Student</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            {/* Custom Report Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>
                  Create custom reports with specific filters and data points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student Report</SelectItem>
                          <SelectItem value="achievement">Achievement Report</SelectItem>
                          <SelectItem value="faculty">Faculty Report</SelectItem>
                          <SelectItem value="department">Department Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Period</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="current-month">Current Month</SelectItem>
                          <SelectItem value="current-semester">Current Semester</SelectItem>
                          <SelectItem value="current-year">Current Academic Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="ec">Electronics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Data Points</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="achievements" defaultChecked />
                          <label htmlFor="achievements" className="text-sm">Student Achievements</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="grades" />
                          <label htmlFor="grades" className="text-sm">Academic Grades</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="attendance" />
                          <label htmlFor="attendance" className="text-sm">Attendance Records</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="skills" />
                          <label htmlFor="skills" className="text-sm">Skills & Competencies</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                          <SelectItem value="csv">CSV File</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Report Preview</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Student achievement data</p>
                        <p>• Current academic year</p>
                        <p>• All departments included</p>
                        <p>• PDF format</p>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Custom Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Custom Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Custom Reports</CardTitle>
                <CardDescription>Previously generated custom reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">CS Department Achievement Report Q1 2024</p>
                      <p className="text-sm text-muted-foreground">Generated on Jan 15, 2024 • 1.2 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Student Performance Analysis 2023</p>
                      <p className="text-sm text-muted-foreground">Generated on Dec 31, 2023 • 2.8 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminReports;