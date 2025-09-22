import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home, LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  portalType: "student" | "faculty" | "admin";
  navigation: Array<{
    name: string;
    href: string;
    icon: ReactNode;
  }>;
}

const Layout = ({ children, portalType, navigation }: LayoutProps) => {
  const location = useLocation();

  const getPortalTitle = () => {
    switch (portalType) {
      case "student":
        return "Student Portal";
      case "faculty":
        return "Faculty Portal";
      case "admin":
        return "Administrator Portal";
      default:
        return "Portal";
    }
  };

  const getPortalColor = () => {
    switch (portalType) {
      case "student":
        return "text-primary";
      case "faculty":
        return "text-approved";
      case "admin":
        return "text-warning";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">AcadVault</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className={`text-lg font-semibold ${getPortalColor()}`}>
                {getPortalTitle()}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;