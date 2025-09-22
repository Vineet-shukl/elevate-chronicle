import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  FileCheck,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  ExternalLink,
  Calendar,
  Tag,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/faculty", icon: <Users className="h-4 w-4" /> },
  { name: "Verify Achievements", href: "/faculty/verify", icon: <FileCheck className="h-4 w-4" /> },
  { name: "Student Management", href: "/faculty/students", icon: <User className="h-4 w-4" /> },
];

// Mock submissions data
const mockSubmissions = [
  {
    id: 1,
    studentName: "John Doe",
    rollNumber: "CS2021001",
    title: "Web Development Workshop",
    type: "Workshop",
    organization: "Tech Club",
    date: "2024-01-15",
    submittedDate: "2024-01-16",
    description: "Attended a comprehensive web development workshop covering React, Node.js, and MongoDB. Built a full-stack application as the final project.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
    evidenceType: "certificate",
    evidenceUrl: "/certificates/web-dev-certificate.pdf",
    status: "pending"
  },
  {
    id: 2,
    studentName: "Jane Smith",
    rollNumber: "CS2021002",
    title: "Machine Learning Research Paper",
    type: "Research",
    organization: "IEEE Conference",
    date: "2024-01-10",
    submittedDate: "2024-01-12",
    description: "Co-authored a research paper on neural network optimization techniques. Paper was accepted and presented at the IEEE AI Conference 2024.",
    skills: ["Machine Learning", "Python", "Research", "Neural Networks"],
    evidenceType: "url",
    evidenceUrl: "https://ieeexplore.ieee.org/document/example",
    status: "pending"
  },
  {
    id: 3,
    studentName: "Mike Johnson",
    rollNumber: "CS2021003",
    title: "Hackathon Winner",
    type: "Competition",
    organization: "CodeFest 2024",
    date: "2024-01-05",
    submittedDate: "2024-01-07",
    description: "Won first place in the national hackathon with an innovative mobile app for environmental monitoring. Led a team of 4 developers.",
    skills: ["Leadership", "Mobile Development", "React Native", "Team Work"],
    evidenceType: "image",
    evidenceUrl: "/images/hackathon-certificate.jpg",
    status: "pending"
  },
];

const FacultyVerify = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<typeof mockSubmissions[0] | null>(null);
  const [feedback, setFeedback] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-pending text-pending-foreground";
      case "approved":
        return "bg-approved text-approved-foreground";
      case "rejected":
        return "bg-rejected text-rejected-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleApprove = (submissionId: number) => {
    console.log("Approved submission:", submissionId);
    alert("Achievement approved successfully!");
  };

  const handleReject = (submissionId: number) => {
    if (!feedback.trim()) {
      alert("Please provide feedback for rejection.");
      return;
    }
    console.log("Rejected submission:", submissionId, "Feedback:", feedback);
    alert("Achievement rejected with feedback sent to student.");
    setFeedback("");
  };

  return (
    <Layout portalType="faculty" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Achievement Verification</h1>
          <p className="text-muted-foreground">Review and verify student achievement submissions</p>
        </div>

        {/* Verification Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="h-5 w-5 mr-2" />
              Verification Queue
            </CardTitle>
            <CardDescription>
              {mockSubmissions.length} submissions awaiting your review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(submission.status)}
                      <h3 className="text-lg font-semibold">{submission.title}</h3>
                      <Badge variant="outline">{submission.type}</Badge>
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Student:</strong> {submission.studentName} ({submission.rollNumber})</p>
                      <p><strong>Organization:</strong> {submission.organization}</p>
                      <p><strong>Date:</strong> {new Date(submission.date).toLocaleDateString()}</p>
                      <p><strong>Submitted:</strong> {new Date(submission.submittedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Achievement Verification</DialogTitle>
                          <DialogDescription>
                            Review the complete submission details and evidence
                          </DialogDescription>
                        </DialogHeader>
                        {selectedSubmission && (
                          <VerificationDetailView 
                            submission={selectedSubmission}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            feedback={feedback}
                            setFeedback={setFeedback}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {mockSubmissions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No pending verifications</h3>
              <p className="text-muted-foreground">
                All student submissions have been reviewed. New submissions will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

const VerificationDetailView = ({ 
  submission, 
  onApprove, 
  onReject, 
  feedback, 
  setFeedback 
}: {
  submission: typeof mockSubmissions[0];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Student & Achievement Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Student Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{submission.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Roll Number:</span>
              <span>{submission.rollNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Submission Date:</span>
              <span>{new Date(submission.submittedDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Achievement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Type:</span>
              <Badge variant="outline">{submission.type}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Organization:</span>
              <span>{submission.organization}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(submission.date).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description & Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{submission.description}</p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            Skills & Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {submission.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evidence */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">
                  {submission.evidenceType === 'certificate' ? 'Certificate Document' :
                   submission.evidenceType === 'url' ? 'External Link' : 'Image Evidence'}
                </p>
                <p className="text-sm text-muted-foreground">{submission.evidenceUrl}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                {submission.evidenceType === 'certificate' && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                )}
                {submission.evidenceType === 'url' && (
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-4">
        <div className="flex-1">
          <Button 
            className="w-full"
            onClick={() => onApprove(submission.id)}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Achievement
          </Button>
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="feedback">Rejection Feedback (Required)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide detailed feedback for rejection..."
              rows={3}
            />
          </div>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => onReject(submission.id)}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject Achievement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacultyVerify;