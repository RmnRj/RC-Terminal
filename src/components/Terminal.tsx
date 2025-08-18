"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { Line } from "@/lib/command-handler";
import { Card, CardContent } from "@/components/ui/card";

export function Terminal() {
  const {
    lines,
    input,
    handleKeyDown,
    suggestion,
    handleInputChange,
    inputRef: terminalInputRef,
  } = useTerminal();
  const [isTyping, setIsTyping] = useState(false);
  const [animatedLines, setAnimatedLines] = useState<Line[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalInputRef.current && !isTyping) {
      terminalInputRef.current.focus();
    }
  }, [isTyping, terminalInputRef]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [animatedLines, isTyping]);
  
  useEffect(() => {
    const lastLine = lines[lines.length - 1];
    if (lastLine && (lastLine.type === 'output' || lastLine.type === 'success' || lastLine.type === 'error') && typeof lastLine.content === 'string' && lastLine.content.length > 0) {
      setIsTyping(true);
      const newLines = lastLine.content.split('\n').map(lineContent => ({
        ...lastLine,
        content: lineContent,
      }));
      
      const previousLines = lines.slice(0, lines.length -1);
      
      setAnimatedLines([...previousLines]);
      
      let currentAnimatedLines = [...previousLines];

      const animate = (index: number) => {
        if (index < newLines.length) {
            currentAnimatedLines.push(newLines[index]);
            setAnimatedLines([...currentAnimatedLines]);
            setTimeout(() => animate(index + 1), 50); // Delay between lines
        } else {
            setIsTyping(false);
        }
      }
      animate(0);

    } else {
       setAnimatedLines(lines);
       setIsTyping(false);
    }
  }, [lines]);


  const focusInput = () => {
    if (terminalInputRef.current) {
      terminalInputFRef.current.focus();
    }
  };
  
  const renderLine = (line: Line, index: number) => {
    switch (line.type) {
      case "input":
        return (
          <div key={index} className="flex items-center">
            <span className="text-accent mr-2 font-bold">$</span>
            <span className="flex-1">{line.content}</span>
          </div>
        );
      case "output":
      case "error":
      case "success":
        const colorClass =
          line.type === "error"
            ? "text-destructive"
            : line.type === "success"
            ? "text-green-400"
            : "text-foreground";
        
        return (
          <div
            key={index}
            className={`${colorClass} whitespace-pre-wrap`}
          >
            {line.content}
          </div>
        );
      case "component":
        return <div key={index}>{line.content}</div>;
      default:
        return null;
    }
  };
  
  return (
    <Card
      className="w-full h-full flex flex-col bg-black/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10"
      onClick={focusInput}
    >
      <CardContent className="p-4 flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="flex flex-col gap-2">
          {animatedLines.map(renderLine)}
          {!isTyping && (
             <div className="flex items-center relative">
              <span className="text-accent mr-2 font-bold">$</span>
              <input
                ref={terminalInputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none focus:ring-0 outline-none w-full caret-accent z-10"
                autoComplete="off"
                aria-label="Terminal input"
                disabled={isTyping}
              />
              {suggestion && input && suggestion.toLowerCase().startsWith(input.toLowerCase()) && (
                <div className="absolute left-[calc(1ch+1rem)] top-0 text-muted-foreground/50 pointer-events-none">
                  <span className="invisible">{input}</span>
                  <span>{suggestion.substring(input.length)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
