import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Student Portal
import StudentDashboard from "./pages/student/Dashboard";
import StudentAchievements from "./pages/student/Achievements";
import StudentPortfolio from "./pages/student/Portfolio";
import StudentAcademics from "./pages/student/Academics";
import StudentSettings from "./pages/student/Settings";
import StudentSupport from "./pages/student/Support";

// Faculty Portal
import FacultyDashboard from "./pages/faculty/Dashboard";
import FacultyVerify from "./pages/faculty/Verify";
import FacultyStudents from "./pages/faculty/Students";

// Admin Portal
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminReports from "./pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student Portal Routes */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/achievements" element={<StudentAchievements />} />
          <Route path="/student/portfolio" element={<StudentPortfolio />} />
          <Route path="/student/academics" element={<StudentAcademics />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/student/support" element={<StudentSupport />} />
          
          {/* Faculty Portal Routes */}
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/verify" element={<FacultyVerify />} />
          <Route path="/faculty/students" element={<FacultyStudents />} />
          
          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
