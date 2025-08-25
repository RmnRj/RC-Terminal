"use client";

import { useState, useEffect } from "react";
import { TypingText } from "./TypingText";

interface TypingLinesProps {
  lines: string[];
  speed?: number;
  onComplete?: () => void;
}

export function TypingLines({ lines, speed = 30, onComplete }: TypingLinesProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    setCompletedLines(prev => [...prev, lines[currentLineIndex]]);
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    setCurrentLineIndex(0);
    setCompletedLines([]);
  }, [lines]);

  return (
    <div>
      {completedLines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      {currentLineIndex < lines.length && (
        <TypingText 
          text={lines[currentLineIndex]} 
          speed={speed} 
          onComplete={handleLineComplete}
        />
      )}
    </div>
  );
}