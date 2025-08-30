"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Mail, Phone, MapPin, Briefcase, FolderOpen, Wrench, X, ChevronLeft, ChevronRight } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";
import * as content from "@/lib/content";

interface InterfaceViewProps {
  activeSection: string;
}

export function InterfaceView({ activeSection }: InterfaceViewProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryImages = [
    { id: 1, title: "Project Screenshot 1", url: "https://via.placeholder.com/800x600/374151/f3f4f6?text=Project+1" },
    { id: 2, title: "Project Screenshot 2", url: "https://via.placeholder.com/800x600/374151/f3f4f6?text=Project+2" },
    { id: 3, title: "Project Screenshot 3", url: "https://via.placeholder.com/800x600/374151/f3f4f6?text=Project+3" },
    { id: 4, title: "Project Screenshot 4", url: "https://via.placeholder.com/800x600/374151/f3f4f6?text=Project+4" },
    { id: 5, title: "Project Screenshot 5", url: "https://via.placeholder.com/800x600/374151/f3f4f6?text=Project+5" },
    { id: 6, title: "Project Screenshot 6", url: "https://via.placeholder.com/800x600/374151/f3f4f6?text=Project+6" },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedImage(prev => prev! > 0 ? prev! - 1 : galleryImages.length - 1);
      } else if (e.key === "ArrowRight") {
        setSelectedImage(prev => prev! < galleryImages.length - 1 ? prev! + 1 : 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, galleryImages.length]);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to My Portfolio
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                  I'm a passionate developer creating innovative solutions with modern technologies. 
                  Explore my work through the terminal interface or browse visually through the sections above.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-[#333] hover:bg-[#24292e] text-white" asChild>
                  <a href={content.contact.GitHub} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button size="lg" className="bg-[#0077b5] hover:bg-[#005885] text-white" asChild>
                  <a href={content.contact.LinkedIn} target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.063 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <span>Experience</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">Professional development experience with modern frameworks and technologies.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <FolderOpen className="w-5 h-5 text-purple-400" />
                    <span>Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">Innovative projects showcasing full-stack development and problem-solving skills.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Wrench className="w-5 h-5 text-green-400" />
                    <span>Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200">Expertise in React, TypeScript, Node.js, and modern web development tools.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Education</h2>
            <div className="grid gap-6">
              {content.education.map((edu: any, index: number) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{edu.Degree}</CardTitle>
                    <p className="text-gray-300">{edu.Institution} • {edu["Graduation Year"]}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200"><strong className="text-blue-400">Coursework:</strong> {edu["Notable Coursework"]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Skills</h2>
            <div className="grid gap-6">
              {Object.entries(content.skills).map(([category, skillString]: [string, any]) => (
                <Card key={category} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillString.split(', ').map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-600">{skill}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {content.projects.map((project: any, index: number) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{project.Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-200">{project.Description}</p>
                    <p className="text-sm text-gray-300"><strong className="text-purple-400">Tech:</strong> {project["Tech Stack"]}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-700">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "experiences":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Experiences</h2>
            <div className="grid gap-6">
              {content.experience.map((exp: any, index: number) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{exp.Role}</CardTitle>
                    <p className="text-gray-300">{exp.Company || exp.Client} • {exp.Duration}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200">{exp.Description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "activities":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Activities</h2>
            <div className="grid gap-6">
              {content.activities.map((activity: any, index: number) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{activity.Title || activity.Activity}</CardTitle>
                    <p className="text-gray-300">{activity.Organization} • {activity.Duration || activity.Year}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200">{activity.Description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">About Me</h2>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{content.profile.fullName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-200 whitespace-pre-line leading-relaxed">{content.profile.about}</p>
                <div className="space-y-2 pt-4 border-t border-gray-700">
                  {Object.entries(content.contact).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <span className="text-blue-400 capitalize font-medium">{key}:</span>
                      {key === 'Email' ? (
                        <a href={`mailto:${value}`} className="text-gray-200 hover:text-blue-400 transition-colors">
                          {key}
                        </a>
                      ) : (
                        <a href={value} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition-colors">
                          {key}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Gallery</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              {galleryImages.map((image, index) => (
                <Card key={image.id} className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-750 transition-colors" onClick={() => setSelectedImage(index)}>
                  <CardContent className="p-2 md:p-4">
                    <div className="aspect-square md:aspect-video bg-gray-700 rounded-lg overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-gray-200 text-xs md:text-sm mt-1 md:mt-2 text-center">{image.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedImage !== null && (
              <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
                <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
                  <img 
                    src={galleryImages[selectedImage].url} 
                    alt={galleryImages[selectedImage].title}
                    className="w-full h-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => prev! > 0 ? prev! - 1 : galleryImages.length - 1);
                    }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(prev => prev! < galleryImages.length - 1 ? prev! + 1 : 0);
                    }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                    <p className="text-lg font-medium">{galleryImages[selectedImage].title}</p>
                    <p className="text-sm text-gray-300">{selectedImage + 1} of {galleryImages.length}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "feedback":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Feedback</h2>
            <FeedbackForm />
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </div>
    </div>
  );
}