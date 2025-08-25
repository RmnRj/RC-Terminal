"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

interface InterfaceViewProps {
  activeSection: string;
}

export function InterfaceView({ activeSection }: InterfaceViewProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to My Portfolio
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  I'm a passionate developer creating innovative solutions with modern technologies. 
                  Explore my work through the terminal interface or browse visually through the sections above.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Github className="w-5 h-5 mr-2" />
                  View GitHub
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Professional development experience with modern frameworks and technologies.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FolderOpen className="w-5 h-5" />
                    <span>Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Innovative projects showcasing full-stack development and problem-solving skills.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="w-5 h-5" />
                    <span>Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Expertise in React, TypeScript, Node.js, and modern web development tools.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Education</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Computer Science Degree</CardTitle>
                  <p className="text-gray-600">University Name • 2020-2024</p>
                </CardHeader>
                <CardContent>
                  <p>Bachelor's degree in Computer Science with focus on software development and algorithms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Skills</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Next.js", "Node.js", "Python", "Git", "Docker"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>RC Terminal Portfolio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>A terminal-style portfolio with modern UI interface toggle.</p>
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "experiences":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Experiences</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Software Developer</CardTitle>
                  <p className="text-gray-600">Company Name • 2023-Present</p>
                </CardHeader>
                <CardContent>
                  <p>Developing web applications using React, TypeScript, and modern frameworks.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">About Me</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p>
                    I'm a passionate developer with experience in full-stack development, 
                    specializing in React, TypeScript, and modern web technologies.
                  </p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>email@example.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Gallery</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Image {i}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "feedback":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Feedback</h2>
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p>I'd love to hear from you! Feel free to reach out for collaborations or just to say hello.</p>
                <div className="mt-4">
                  <Button>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </div>
    </div>
  );
}