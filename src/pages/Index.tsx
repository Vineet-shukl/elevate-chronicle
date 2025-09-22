import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Settings, BookOpen, CheckCircle, FileText, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Index = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && profile && !loading) {
      // Redirect authenticated users to their appropriate dashboard
      switch (profile.role) {
        case "admin":
          navigate("/admin");
          break;
        case "faculty":
          navigate("/faculty");
          break;
        case "student":
          navigate("/student");
          break;
      }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">AcadVault</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your comprehensive academic achievement management platform
          </p>
          {!user && (
            <div className="flex justify-center">
              <Link to="/auth">
                <Button size="lg">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login / Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Student Portal */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription>
                Build and manage your academic achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  Track your achievements
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  Generate portfolios
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  View academic records
                </div>
              </div>
              <Link to="/student">
                <Button className="w-full">Enter Student Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Faculty Portal */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Faculty Portal</CardTitle>
              <CardDescription>
                Verify achievements and mentor students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  Verify student activities
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  Holistic student profiles
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  Data-driven mentorship
                </div>
              </div>
              <Link to="/faculty">
                <Button className="w-full">Enter Faculty Portal</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Portal */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Settings className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>
                Manage users and generate reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  User management
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  NAAC & NIRF reports
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-approved mr-2" />
                  Institutional analytics
                </div>
              </div>
              <Link to="/admin">
                <Button className="w-full">Enter Admin Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Platform Features</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Digital Portfolios</h3>
              <p className="text-sm text-muted-foreground">Professional, shareable academic profiles</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-approved mb-2" />
              <h3 className="font-semibold">Verified Achievements</h3>
              <p className="text-sm text-muted-foreground">Faculty-verified activity records</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Holistic Mentoring</h3>
              <p className="text-sm text-muted-foreground">360-degree student insights</p>
            </div>
            <div className="flex flex-col items-center">
              <Settings className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Accreditation Ready</h3>
              <p className="text-sm text-muted-foreground">NAAC & NIRF compliant reporting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;