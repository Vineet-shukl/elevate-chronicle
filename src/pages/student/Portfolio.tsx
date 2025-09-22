import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Download,
  Share2,
  Eye,
  Award,
  BookOpen,
  FileText,
  Settings,
  HelpCircle,
  Palette,
  CheckCircle,
  Link as LinkIcon,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/student", icon: <BarChart className="h-4 w-4" /> },
  { name: "Achievements", href: "/student/achievements", icon: <Award className="h-4 w-4" /> },
  { name: "Portfolio", href: "/student/portfolio", icon: <FileText className="h-4 w-4" /> },
  { name: "Academic Records", href: "/student/academics", icon: <BookOpen className="h-4 w-4" /> },
  { name: "Settings", href: "/student/settings", icon: <Settings className="h-4 w-4" /> },
  { name: "Support", href: "/student/support", icon: <HelpCircle className="h-4 w-4" /> },
];

// Mock approved achievements
const approvedAchievements = [
  {
    id: 1,
    title: "Web Development Workshop",
    type: "Workshop",
    organization: "Tech Club",
    date: "2024-01-15",
    description: "Advanced web development concepts and hands-on projects",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    selected: true
  },
  {
    id: 2,
    title: "Research Paper Publication",
    type: "Research",
    organization: "IEEE Conference",
    date: "2024-01-01",
    description: "Published research on machine learning applications",
    skills: ["Machine Learning", "Research", "Python"],
    selected: true
  },
  {
    id: 3,
    title: "Hackathon Winner",
    type: "Competition",
    organization: "CodeFest 2024",
    date: "2023-12-15",
    description: "First place in national level hackathon",
    skills: ["Innovation", "Team Work", "Problem Solving"],
    selected: false
  },
  {
    id: 4,
    title: "Leadership Training",
    type: "Workshop",
    organization: "Student Council",
    date: "2023-11-20",
    description: "Leadership development and team management skills",
    skills: ["Leadership", "Management", "Communication"],
    selected: true
  },
];

const portfolioTemplates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, contemporary design with focus on achievements",
    preview: "🎨 Modern layout with cards and clean typography"
  },
  {
    id: "academic",
    name: "Academic Classic",
    description: "Traditional academic format with institutional branding",
    preview: "📚 Classic academic layout with formal structure"
  },
  {
    id: "creative",
    name: "Creative Showcase",
    description: "Vibrant design for creative and technical portfolios",
    preview: "🚀 Dynamic layout with visual elements and colors"
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Minimalist design focusing on content over decoration",
    preview: "✨ Simple, clean layout with emphasis on content"
  },
];

const StudentPortfolio = () => {
  const [selectedAchievements, setSelectedAchievements] = useState(
    approvedAchievements.filter(a => a.selected).map(a => a.id)
  );
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAchievementToggle = (achievementId: number, checked: boolean) => {
    if (checked) {
      setSelectedAchievements([...selectedAchievements, achievementId]);
    } else {
      setSelectedAchievements(selectedAchievements.filter(id => id !== achievementId));
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // In real implementation, this would generate and download the PDF
    alert("Portfolio PDF generated successfully!");
  };

  const handleGenerateLink = async () => {
    // Simulate link generation
    const portfolioLink = `https://acadvault.edu/portfolio/${Date.now()}`;
    navigator.clipboard.writeText(portfolioLink);
    alert(`Portfolio link generated and copied to clipboard: ${portfolioLink}`);
  };

  const selectedAchievementsData = approvedAchievements.filter(a => 
    selectedAchievements.includes(a.id)
  );

  return (
    <Layout portalType="student" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Generator</h1>
          <p className="text-muted-foreground">Create and share your professional academic portfolio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Select Content</TabsTrigger>
                <TabsTrigger value="template">Choose Template</TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Approved Achievements
                    </CardTitle>
                    <CardDescription>
                      Select which verified achievements to include in your portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvedAchievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                          <Checkbox
                            id={`achievement-${achievement.id}`}
                            checked={selectedAchievements.includes(achievement.id)}
                            onCheckedChange={(checked) => 
                              handleAchievementToggle(achievement.id, checked === true)
                            }
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor={`achievement-${achievement.id}`}
                              className="text-base font-medium cursor-pointer"
                            >
                              {achievement.title}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.organization} • {achievement.type}
                            </p>
                            <p className="text-sm mt-2">{achievement.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {achievement.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="template">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Portfolio Templates
                    </CardTitle>
                    <CardDescription>
                      Choose a template that best represents your style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {portfolioTemplates.map((template) => (
                          <div key={template.id} className="relative">
                            <RadioGroupItem
                              value={template.id}
                              id={template.id}
                              className="absolute top-4 left-4 z-10"
                            />
                            <Label
                              htmlFor={template.id}
                              className="block cursor-pointer"
                            >
                              <div className={`p-4 border rounded-lg transition-all ${
                                selectedTemplate === template.id 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border hover:border-primary/50'
                              }`}>
                                <h3 className="font-semibold mt-6 mb-2">{template.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {template.description}
                                </p>
                                <div className="bg-muted p-3 rounded text-xs text-center">
                                  {template.preview}
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Preview</CardTitle>
                <CardDescription>
                  {selectedAchievementsData.length} achievements selected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">John Doe</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Computer Science Student • University Name
                    </p>
                    <div className="space-y-2">
                      {selectedAchievementsData.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="text-xs p-2 bg-background rounded">
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-muted-foreground">{achievement.organization}</div>
                        </div>
                      ))}
                      {selectedAchievementsData.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center py-2">
                          +{selectedAchievementsData.length - 3} more achievements
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Full Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Generate your portfolio in different formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleGeneratePDF}
                  disabled={isGenerating || selectedAchievements.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating PDF..." : "Generate PDF"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleGenerateLink}
                  disabled={selectedAchievements.length === 0}
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Get Shareable Link
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Portfolio
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Achievements</span>
                    <span className="font-medium">{approvedAchievements.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Selected for Portfolio</span>
                    <span className="font-medium">{selectedAchievements.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unique Skills</span>
                    <span className="font-medium">
                      {[...new Set(selectedAchievementsData.flatMap(a => a.skills))].length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Template</span>
                    <span className="font-medium">
                      {portfolioTemplates.find(t => t.id === selectedTemplate)?.name}
                    </span>
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

export default StudentPortfolio;