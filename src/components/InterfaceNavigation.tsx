"use client";

import { Button } from "@/components/ui/button";
import { Home, GraduationCap, Image, Wrench, Briefcase, User, MessageSquare, FolderOpen } from "lucide-react";

interface InterfaceNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "experiences", label: "Experiences", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "projects", label: "Projects", icon: FolderOpen },
];

export function InterfaceNavigation({ activeSection, onSectionChange }: InterfaceNavigationProps) {
  return (
    <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-1 py-4 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center space-x-2 whitespace-nowrap transition-all ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}