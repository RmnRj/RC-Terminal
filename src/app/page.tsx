"use client";

import { useState, useRef } from "react";
import { Terminal } from "@/components/Terminal";
import { Navigation } from "@/components/Navigation";
import { InterfaceNavigation } from "@/components/InterfaceNavigation";
import { InterfaceView } from "@/components/InterfaceView";

export default function Home() {
  const [mode, setMode] = useState<"terminal" | "interface">("terminal");
  const [activeSection, setActiveSection] = useState("home");
  const terminalRef = useRef<any>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation mode={mode} onModeChange={setMode} />
      
      {mode === "terminal" ? (
        <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
          <div className="w-full max-w-5xl h-[80vh]">
            <Terminal key="persistent-terminal" />
          </div>
        </main>
      ) : (
        <div className="bg-gray-900 text-white min-h-[calc(100vh-4rem)]">
          <InterfaceNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
          <InterfaceView activeSection={activeSection} />
        </div>
      )}
    </div>
  );
}
