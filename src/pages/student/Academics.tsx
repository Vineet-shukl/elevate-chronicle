import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  FileText,
  Settings,
  HelpCircle,
  GraduationCap,
  Clock,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/student", icon: <BarChart className="h-4 w-4" /> },
  { name: "Achievements", href: "/student/achievements", icon: <Award className="h-4 w-4" /> },
  { name: "Portfolio", href: "/student/portfolio", icon: <FileText className="h-4 w-4" /> },
  { name: "Academic Records", href: "/student/academics", icon: <BookOpen className="h-4 w-4" /> },
  { name: "Settings", href: "/student/settings", icon: <Settings className="h-4 w-4" /> },
  { name: "Support", href: "/student/support", icon: <HelpCircle className="h-4 w-4" /> },
];

// Mock academic data
const semesterData = [
  {
    semester: "Semester 8",
    year: "2024",
    status: "current",
    sgpa: null,
    subjects: [
      { code: "CS801", name: "Machine Learning", credits: 4, grade: null, marks: null, status: "ongoing" },
      { code: "CS802", name: "Software Engineering", credits: 3, marks: null, grade: null, status: "ongoing" },
      { code: "CS803", name: "Distributed Systems", credits: 4, marks: null, grade: null, status: "ongoing" },
      { code: "CS804", name: "Capstone Project", credits: 6, marks: null, grade: null, status: "ongoing" },
    ]
  },
  {
    semester: "Semester 7",
    year: "2023",
    status: "completed",
    sgpa: 9.2,
    subjects: [
      { code: "CS701", name: "Artificial Intelligence", credits: 4, grade: "A+", marks: 92, status: "completed" },
      { code: "CS702", name: "Computer Networks", credits: 3, grade: "A", marks: 87, status: "completed" },
      { code: "CS703", name: "Database Systems", credits: 4, grade: "A+", marks: 94, status: "completed" },
      { code: "CS704", name: "Web Technologies", credits: 3, grade: "A+", marks: 96, status: "completed" },
    ]
  },
  {
    semester: "Semester 6",
    year: "2023",
    status: "completed",
    sgpa: 8.8,
    subjects: [
      { code: "CS601", name: "Operating Systems", credits: 4, grade: "A", marks: 89, status: "completed" },
      { code: "CS602", name: "Compiler Design", credits: 3, grade: "A", marks: 85, status: "completed" },
      { code: "CS603", name: "Computer Graphics", credits: 4, grade: "A+", marks: 91, status: "completed" },
      { code: "CS604", name: "Software Testing", credits: 3, grade: "B+", marks: 82, status: "completed" },
    ]
  },
];

const academicSummary = {
  currentCGPA: 8.75,
  totalCredits: 140,
  requiredCredits: 180,
  completedSemesters: 7,
  totalSemesters: 8,
  attendance: 92,
  rank: 12,
  totalStudents: 120
};

const StudentAcademics = () => {
  const getGradeColor = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      'A+': 'bg-approved text-approved-foreground',
      'A': 'bg-approved text-approved-foreground',
      'B+': 'bg-warning text-warning-foreground',
      'B': 'bg-warning text-warning-foreground',
      'C+': 'bg-pending text-pending-foreground',
      'C': 'bg-pending text-pending-foreground',
      'F': 'bg-rejected text-rejected-foreground'
    };
    return gradeColors[grade] || 'bg-muted text-muted-foreground';
  };

  const creditProgress = (academicSummary.totalCredits / academicSummary.requiredCredits) * 100;

  return (
    <Layout portalType="student" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Academic Records</h1>
          <p className="text-muted-foreground">Your complete academic performance and progress</p>
        </div>

        {/* Academic Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current CGPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-approved" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-approved">{academicSummary.currentCGPA}</div>
              <p className="text-xs text-muted-foreground">
                Out of 10.0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Progress</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{academicSummary.totalCredits}/{academicSummary.requiredCredits}</div>
              <Progress value={creditProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(creditProgress)}% completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{academicSummary.attendance}%</div>
              <p className="text-xs text-muted-foreground">
                Current semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{academicSummary.rank}</div>
              <p className="text-xs text-muted-foreground">
                Out of {academicSummary.totalStudents} students
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Semester-wise Records */}
        <Card>
          <CardHeader>
            <CardTitle>Semester-wise Academic Records</CardTitle>
            <CardDescription>Detailed breakdown of your academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current">Current Semester</TabsTrigger>
                <TabsTrigger value="completed">Completed Semesters</TabsTrigger>
                <TabsTrigger value="summary">Performance Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-4">
                {semesterData
                  .filter(sem => sem.status === "current")
                  .map((semester) => (
                    <Card key={semester.semester}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{semester.semester}</CardTitle>
                            <CardDescription>Academic Year: {semester.year}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-pending text-pending-foreground">
                            In Progress
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {semester.subjects.map((subject) => (
                            <div key={subject.code} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium">{subject.name}</div>
                                <div className="text-sm text-muted-foreground">{subject.code}</div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Credits: </span>
                                  <span className="font-medium">{subject.credits}</span>
                                </div>
                                <Badge variant="outline">Ongoing</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {semesterData
                  .filter(sem => sem.status === "completed")
                  .map((semester) => (
                    <Card key={semester.semester}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{semester.semester}</CardTitle>
                            <CardDescription>Academic Year: {semester.year}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-approved">SGPA: {semester.sgpa}</div>
                            <Badge className="bg-approved text-approved-foreground">Completed</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {semester.subjects.map((subject) => (
                            <div key={subject.code} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium">{subject.name}</div>
                                <div className="text-sm text-muted-foreground">{subject.code}</div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Credits: </span>
                                  <span className="font-medium">{subject.credits}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Marks: </span>
                                  <span className="font-medium">{subject.marks}</span>
                                </div>
                                <Badge className={getGradeColor(subject.grade!)}>
                                  {subject.grade}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="summary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>CGPA Trend</CardTitle>
                      <CardDescription>Semester-wise CGPA progression</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {semesterData
                          .filter(sem => sem.sgpa !== null)
                          .reverse()
                          .map((semester) => (
                            <div key={semester.semester} className="flex items-center justify-between">
                              <span className="text-sm">{semester.semester}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${(semester.sgpa! / 10) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{semester.sgpa}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Grade Distribution</CardTitle>
                      <CardDescription>Your overall grade performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">A+ Grades</span>
                          <Badge className="bg-approved text-approved-foreground">6 subjects</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">A Grades</span>
                          <Badge className="bg-approved text-approved-foreground">4 subjects</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">B+ Grades</span>
                          <Badge className="bg-warning text-warning-foreground">1 subject</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Subjects</span>
                          <Badge variant="outline">11 completed</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentAcademics;