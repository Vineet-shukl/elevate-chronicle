import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

// Main Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Student Portal Routes */}
            <Route path="/student" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/achievements" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentAchievements />
              </ProtectedRoute>
            } />
            <Route path="/student/portfolio" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentPortfolio />
              </ProtectedRoute>
            } />
            <Route path="/student/academics" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentAcademics />
              </ProtectedRoute>
            } />
            <Route path="/student/settings" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentSettings />
              </ProtectedRoute>
            } />
            <Route path="/student/support" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentSupport />
              </ProtectedRoute>
            } />
            
            {/* Faculty Portal Routes */}
            <Route path="/faculty" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/verify" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <FacultyVerify />
              </ProtectedRoute>
            } />
            <Route path="/faculty/students" element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <FacultyStudents />
              </ProtectedRoute>
            } />
            
            {/* Admin Portal Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminReports />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
