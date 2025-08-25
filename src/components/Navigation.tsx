"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Monitor } from "lucide-react";

interface NavigationProps {
  mode: "terminal" | "interface";
  onModeChange: (mode: "terminal" | "interface") => void;
}

export function Navigation({ mode, onModeChange }: NavigationProps) {
  return (
    <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              RC Portfolio
            </h1>
            <div className="hidden sm:block text-sm text-gray-400">
              Developer & Creator
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={mode === "terminal" ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange("terminal")}
              className={`flex items-center space-x-2 transition-all ${
                mode === "terminal" 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>RC-Terminal</span>
            </Button>
            <Button
              variant={mode === "interface" ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange("interface")}
              className={`flex items-center space-x-2 transition-all ${
                mode === "interface" 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Interface</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}