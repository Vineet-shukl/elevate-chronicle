import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Plus,
  Filter,
  Search,
  Upload,
  Tag,
  Calendar,
  Award,
  BookOpen,
  FileText,
  Settings,
  HelpCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
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
const mockAchievements = [
  {
    id: 1,
    title: "Web Development Workshop",
    type: "Workshop",
    organization: "Tech Club",
    date: "2024-01-15",
    status: "approved",
    description: "Advanced web development concepts and hands-on projects",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    feedback: null
  },
  {
    id: 2,
    title: "Data Science Internship",
    type: "Internship",
    organization: "Tech Corp",
    date: "2024-01-10",
    status: "pending",
    description: "Machine learning and data analysis internship program",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    feedback: null
  },
  {
    id: 3,
    title: "Community Service Project",
    type: "Volunteer Work",
    organization: "NGO Seva",
    date: "2024-01-05",
    status: "rejected",
    description: "Environmental cleanup and awareness campaign",
    skills: ["Leadership", "Community Service"],
    feedback: "Please provide more detailed evidence of your contribution and impact."
  },
];

const activityTypes = ["Workshop", "Internship", "Volunteer Work", "Research", "Competition", "Certification"];

const StudentAchievements = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const filteredAchievements = mockAchievements.filter((achievement) => {
    const matchesStatus = selectedStatus === "all" || achievement.status === selectedStatus;
    const matchesType = selectedType === "all" || achievement.type === selectedType;
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.organization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <Layout portalType="student" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
            <p className="text-muted-foreground">Manage your academic and extracurricular activities</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Achievement</DialogTitle>
                <DialogDescription>
                  Submit your academic or extracurricular achievement for verification
                </DialogDescription>
              </DialogHeader>
              <AddAchievementForm onClose={() => setIsAddModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search achievements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Activity Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {activityTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Input type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements List */}
        <div className="grid gap-4">
          {filteredAchievements.map((achievement) => (
            <Card key={achievement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(achievement.status)}
                      <h3 className="text-lg font-semibold">{achievement.title}</h3>
                      <Badge variant="outline">{achievement.type}</Badge>
                      <Badge className={getStatusColor(achievement.status)}>
                        {achievement.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{achievement.organization}</p>
                    <p className="text-sm mb-3">{achievement.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-4 w-4" />
                        {achievement.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {achievement.feedback && (
                      <div className="mt-3 p-3 bg-rejected/10 border border-rejected/20 rounded-md">
                        <p className="text-sm text-rejected-foreground">
                          <strong>Feedback:</strong> {achievement.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No achievements found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedStatus !== "all" || selectedType !== "all"
                  ? "Try adjusting your filters"
                  : "Start by adding your first achievement"}
              </p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

const AddAchievementForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    organization: "",
    date: "",
    description: "",
    skills: "",
    evidenceFile: null as File | null,
    evidenceUrl: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Activity Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity type" />
            </SelectTrigger>
            <SelectContent>
              {activityTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date of Completion *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title/Name of Achievement *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter the title of your achievement"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Issuing Organization/Event Organizer *</Label>
        <Input
          id="organization"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          placeholder="Enter the organization name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description & Key Takeaways *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your achievement and key learnings..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills & Tags</Label>
        <Input
          id="skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          placeholder="e.g. Leadership, Python, Communication (comma-separated)"
        />
      </div>

      <Tabs defaultValue="file" className="w-full">
        <TabsList>
          <TabsTrigger value="file">Upload File</TabsTrigger>
          <TabsTrigger value="url">External URL</TabsTrigger>
        </TabsList>
        <TabsContent value="file" className="space-y-2">
          <Label htmlFor="evidence-file">Evidence Upload</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Upload certificate, photos, or documents (PDF, JPG, PNG)
            </p>
            <Input
              id="evidence-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="mt-2"
              onChange={(e) => setFormData({ ...formData, evidenceFile: e.target.files?.[0] || null })}
            />
          </div>
        </TabsContent>
        <TabsContent value="url" className="space-y-2">
          <Label htmlFor="evidence-url">Evidence URL</Label>
          <Input
            id="evidence-url"
            type="url"
            value={formData.evidenceUrl}
            onChange={(e) => setFormData({ ...formData, evidenceUrl: e.target.value })}
            placeholder="https://example.com/certificate"
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Submit for Verification</Button>
      </div>
    </form>
  );
};

export default StudentAchievements;