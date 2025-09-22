import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  HelpCircle,
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
  Award,
  BookOpen,
  FileText,
  Settings,
  Mail,
  Phone,
  Search,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/student", icon: <BarChart className="h-4 w-4" /> },
  { name: "Achievements", href: "/student/achievements", icon: <Award className="h-4 w-4" /> },
  { name: "Portfolio", href: "/student/portfolio", icon: <FileText className="h-4 w-4" /> },
  { name: "Academic Records", href: "/student/academics", icon: <BookOpen className="h-4 w-4" /> },
  { name: "Settings", href: "/student/settings", icon: <Settings className="h-4 w-4" /> },
  { name: "Support", href: "/student/support", icon: <HelpCircle className="h-4 w-4" /> },
];

const faqs = [
  {
    id: "1",
    question: "How do I add a new achievement?",
    answer: "Navigate to the Achievements page and click the 'Add Achievement' button. Fill out the form with details about your activity, including evidence and skills gained. Your submission will then be sent to faculty for verification."
  },
  {
    id: "2",
    question: "Why was my achievement rejected?",
    answer: "Achievements may be rejected for various reasons such as insufficient evidence, unclear documentation, or activities that don't meet institutional criteria. Check the feedback provided by the faculty member and resubmit with additional information if needed."
  },
  {
    id: "3",
    question: "How long does verification take?",
    answer: "Typically, faculty members review submissions within 3-5 business days. Complex achievements or those requiring additional verification may take longer. You'll receive notifications about status updates."
  },
  {
    id: "4",
    question: "Can I edit my submitted achievements?",
    answer: "Once submitted, achievements cannot be edited directly. If changes are needed, you can contact your faculty mentor or submit a support ticket for assistance."
  },
  {
    id: "5",
    question: "How do I generate my portfolio?",
    answer: "Go to the Portfolio page, select which approved achievements to include, choose a template, and click 'Generate PDF' or 'Get Shareable Link'. Your portfolio will be created with all selected verified achievements."
  },
  {
    id: "6",
    question: "What file formats are accepted for evidence?",
    answer: "We accept PDF documents, JPG/PNG images, and valid web URLs as evidence. Files should be under 10MB in size and clearly show your participation or achievement."
  },
];

const mockTickets = [
  {
    id: "TICK-001",
    subject: "Unable to upload certificate",
    category: "Technical",
    status: "open",
    date: "2024-01-15",
    lastReply: "2024-01-15"
  },
  {
    id: "TICK-002",
    subject: "Achievement verification delay",
    category: "General",
    status: "resolved",
    date: "2024-01-10",
    lastReply: "2024-01-12"
  },
];

const StudentSupport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  });

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-pending text-pending-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      case "resolved":
        return "bg-approved text-approved-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4" />;
      case "in-progress":
        return <MessageSquare className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Ticket submitted:", ticketForm);
    // Reset form
    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: ""
    });
    alert("Support ticket submitted successfully!");
  };

  return (
    <Layout portalType="student" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support & Help</h1>
          <p className="text-muted-foreground">Get help with your AcadVault experience</p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {/* Search FAQs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search FAQs
                </CardTitle>
                <CardDescription>
                  Find answers to commonly asked questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search for help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* FAQ List */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try different search terms or submit a support ticket for personalized help.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Submit New Ticket */}
              <Card>
                <CardHeader>
                  <CardTitle>Submit Support Ticket</CardTitle>
                  <CardDescription>
                    Can't find the answer? Create a support ticket and we'll help you out.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitTicket} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select 
                          value={ticketForm.category} 
                          onValueChange={(value) => setTicketForm({...ticketForm, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="account">Account Related</SelectItem>
                            <SelectItem value="achievement">Achievement Help</SelectItem>
                            <SelectItem value="portfolio">Portfolio Support</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select 
                          value={ticketForm.priority} 
                          onValueChange={(value) => setTicketForm({...ticketForm, priority: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        placeholder="Please provide detailed information about your issue..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* My Tickets */}
              <Card>
                <CardHeader>
                  <CardTitle>My Support Tickets</CardTitle>
                  <CardDescription>
                    Track the status of your submitted tickets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTickets.map((ticket) => (
                      <div key={ticket.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{ticket.subject}</h4>
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1">{ticket.status}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Ticket ID: {ticket.id}</p>
                          <p>Category: {ticket.category}</p>
                          <p>Created: {new Date(ticket.date).toLocaleDateString()}</p>
                          <p>Last Reply: {new Date(ticket.lastReply).toLocaleDateString()}</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          View Details
                        </Button>
                      </div>
                    ))}

                    {mockTickets.length === 0 && (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No tickets yet</h3>
                        <p className="text-muted-foreground">
                          Your support tickets will appear here once submitted.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Get in touch with our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@acadv⁄ault.edu</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Weekend: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Help Links</CardTitle>
                  <CardDescription>
                    Common resources and guides
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    User Guide & Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Video Tutorials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    System Status Page
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Knowledge Base
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentSupport;