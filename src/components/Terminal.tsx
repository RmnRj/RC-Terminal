"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { Line } from "@/lib/command-handler";
import { Card, CardContent } from "@/components/ui/card";
import TypingEffect from "./TypingEffect";

export function Terminal() {
  const {
    lines,
    input,
    setInput,
    handleKeyDown,
    suggestion,
  } = useTerminal();
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isTyping]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleTypingComplete = () => {
    setIsTyping(false);
  }

  const renderLine = (line: Line, index: number) => {
    const isLastLine = index === lines.length - 1;
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

        if (isLastLine && typeof line.content === 'string' && line.type !== 'error') {
            return (
                 <div key={index} className={`${colorClass} whitespace-pre-wrap`}>
                    <TypingEffect text={line.content} onFinished={handleTypingComplete} />
                 </div>
            )
        }
        
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
  
  useEffect(() => {
    const lastLine = lines[lines.length-1];
    if (lastLine && (lastLine.type === 'output' || lastLine.type === 'success') && typeof lastLine.content === 'string') {
        setIsTyping(true);
    }
  }, [lines]);

  return (
    <Card
      className="w-full h-full flex flex-col bg-black/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10"
      onClick={focusInput}
    >
      <CardContent className="p-4 flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="flex flex-col gap-2">
          {lines.map(renderLine)}
          {!isTyping && (
             <div className="flex items-center relative">
              <span className="text-accent mr-2 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none focus:ring-0 outline-none w-full caret-accent z-10"
                autoComplete="off"
                aria-label="Terminal input"
                disabled={isTyping}
              />
              {suggestion && (
                <div className="absolute left-[calc(1ch+1rem)] top-0 text-muted-foreground/50 pointer-events-none">
                  {input}
                  <span className="text-muted-foreground/50">{suggestion.substring(input.length)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
