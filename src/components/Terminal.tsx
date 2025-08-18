"use client";

import React, { useRef, useEffect } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import { Line } from "@/lib/command-handler";
import { Card, CardContent } from "@/components/ui/card";

export function Terminal() {
  const {
    lines,
    input,
    setInput,
    handleKeyDown,
    setCommandHistory,
    setLastCommandIndex,
  } = useTerminal();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("commandHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setCommandHistory(parsedHistory);
      setLastCommandIndex(parsedHistory.length);
    }
  }, [setCommandHistory, setLastCommandIndex]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
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
          {lines.map(renderLine)}
          <div className="flex items-center">
            <span className="text-accent mr-2 font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none focus:ring-0 outline-none w-full caret-accent"
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
