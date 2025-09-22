import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileCheck,
  User,
  Search,
  Eye,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/faculty", icon: <Users className="h-4 w-4" /> },
  { name: "Verify Achievements", href: "/faculty/verify", icon: <FileCheck className="h-4 w-4" /> },
  { name: "Student Management", href: "/faculty/students", icon: <User className="h-4 w-4" /> },
];

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    rollNumber: "CS2021001",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    program: "B.Tech Computer Science",
    semester: 8,
    cgpa: 8.75,
    attendance: 92,
    totalAchievements: 12,
    approvedAchievements: 10,
    pendingAchievements: 2,
    skills: ["React", "Python", "Machine Learning", "Web Development"],
    recentActivities: [
      { title: "Web Development Workshop", date: "2024-01-15", status: "approved" },
      { title: "Data Science Internship", date: "2024-01-10", status: "pending" },
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    rollNumber: "CS2021002",
    email: "jane.smith@university.edu",
    phone: "+1 (555) 234-5678",
    program: "B.Tech Computer Science",
    semester: 8,
    cgpa: 9.2,
    attendance: 95,
    totalAchievements: 15,
    approvedAchievements: 14,
    pendingAchievements: 1,
    skills: ["Machine Learning", "Research", "Python", "Neural Networks"],
    recentActivities: [
      { title: "Research Paper Publication", date: "2024-01-12", status: "approved" },
      { title: "AI Conference Presentation", date: "2024-01-08", status: "approved" },
    ]
  },
  {
    id: 3,
    name: "Mike Johnson",
    rollNumber: "CS2021003",
    email: "mike.johnson@university.edu",
    phone: "+1 (555) 345-6789",
    program: "B.Tech Computer Science",
    semester: 8,
    cgpa: 8.1,
    attendance: 88,
    totalAchievements: 8,
    approvedAchievements: 6,
    pendingAchievements: 2,
    skills: ["Leadership", "Mobile Development", "React Native", "Team Work"],
    recentActivities: [
      { title: "Hackathon Winner", date: "2024-01-05", status: "pending" },
      { title: "App Development Project", date: "2023-12-20", status: "approved" },
    ]
  },
];

const FacultyStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<typeof mockStudents[0] | null>(null);

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = filterSemester === "all" || student.semester.toString() === filterSemester;
    return matchesSearch && matchesSemester;
  });

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

  return (
    <Layout portalType="faculty" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Monitor and mentor your assigned students</p>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Semester</Label>
                <Select value={filterSemester} onValueChange={setFilterSemester}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="6">Semester 6</SelectItem>
                    <SelectItem value="7">Semester 7</SelectItem>
                    <SelectItem value="8">Semester 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Program</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student List */}
        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.rollNumber} • {student.program} • Semester {student.semester}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-approved">{student.cgpa}</p>
                        <p className="text-xs text-muted-foreground">CGPA</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{student.attendance}%</p>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">{student.approvedAchievements}</p>
                        <p className="text-xs text-muted-foreground">Approved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-pending">{student.pendingAchievements}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {student.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {student.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{student.skills.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Recent: {student.recentActivities[0]?.title} • {new Date(student.recentActivities[0]?.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Holistic Student Profile</DialogTitle>
                          <DialogDescription>
                            Complete academic and extracurricular overview
                          </DialogDescription>
                        </DialogHeader>
                        {selectedStudent && (
                          <HolisticStudentProfile student={selectedStudent} />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

const HolisticStudentProfile = ({ student }: { student: typeof mockStudents[0] }) => {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{student.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Roll Number:</span>
              <span>{student.rollNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Program:</span>
              <span>{student.program}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Semester:</span>
              <span>{student.semester}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Email:</span>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4 mr-1" />
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">CGPA:</span>
                <span className="text-lg font-bold text-approved">{student.cgpa}/10.0</span>
              </div>
              <Progress value={(student.cgpa / 10) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Attendance:</span>
                <span className="text-lg font-bold">{student.attendance}%</span>
              </div>
              <Progress value={student.attendance} />
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Class Rank:</span>
              <span>5th out of 120</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Achievement Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{student.totalAchievements}</p>
              <p className="text-sm text-muted-foreground">Total Achievements</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-approved">{student.approvedAchievements}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pending">{student.pendingAchievements}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Recent Activities</h4>
            {student.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills & Competencies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills & Competencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mentoring Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mentoring Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Strengths</h4>
              <ul className="text-sm space-y-1">
                <li>• Consistent academic performance with high CGPA</li>
                <li>• Active participation in extracurricular activities</li>
                <li>• Strong technical skills in modern technologies</li>
              </ul>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">Areas for Development</h4>
              <ul className="text-sm space-y-1">
                <li>• Could improve attendance slightly</li>
                <li>• Encourage more research-oriented activities</li>
                <li>• Consider leadership roles in student organizations</li>
              </ul>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="text-sm space-y-1">
                <li>• Excellent candidate for higher studies</li>
                <li>• Strong portfolio for tech industry placements</li>
                <li>• Should consider mentoring junior students</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  function getStatusColor(status: string) {
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
  }
};

export default FacultyStudents;