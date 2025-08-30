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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [terminalInputRef]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);
  
  const focusInput = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };
  
  const renderLine = (line: Line, index: number) => {
    const safeRenderContent = (content: any) => {
      if (React.isValidElement(content)) {
        return content;
      }
      if (typeof content === 'string' || typeof content === 'number') {
        return content;
      }
      if (typeof content === 'object' && content !== null) {
        console.warn('Invalid object passed to terminal:', content);
        return JSON.stringify(content, null, 2);
      }
      return String(content || '');
    };

    switch (line.type) {
      case "input":
        return (
          <div key={index} className="flex items-center">
            <span className="text-green-400 mr-2 font-bold">$</span>
            <span className="flex-1 text-white">{safeRenderContent(line.content)}</span>
          </div>
        );
      case "output":
      case "error":
      case "success":
        const colorClass = line.type === "error" ? "text-red-400" : "text-white";
        return (
          <div
            key={index}
            className={`${colorClass} whitespace-pre-wrap`}
          >
            {safeRenderContent(line.content)}
          </div>
        );
      case "component":
        return <div key={index} className="text-white">{safeRenderContent(line.content)}</div>;
      default:
        console.warn('Unknown line type:', line.type);
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
          <div className="flex items-center relative">
            <span className="text-green-400 mr-2 font-bold">$</span>
            <input
              ref={terminalInputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none focus:ring-0 outline-none w-full text-white caret-green-400 z-10"
              autoComplete="off"
              aria-label="Terminal input"
            />
            {suggestion && input && (
              <div className="absolute left-[calc(1ch+1rem)] top-0 text-gray-500 pointer-events-none">
                <span className="invisible">{input}</span>
                <span>{suggestion}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
