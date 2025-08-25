
"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { handleCommand, getSuggestions, Line } from "@/lib/command-handler";

export const useTerminal = () => {
  const [lines, setLines] = useState<Line[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('terminalLines');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.filter((line: any) => 
            line && typeof line === 'object' && line.type && line.content !== undefined
          );
        } catch (e) {
          console.error('Failed to parse saved terminal lines:', e);
        }
      }
    }
    return [{
      type: "output",
      content: "Welcome to RC-Terminal. Try 'help' to know about available commands.",
    }];
  });

  // Save lines to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('terminalLines', JSON.stringify(lines));
      } catch (e) {
        console.error('Failed to save terminal lines:', e);
      }
    }
  }, [lines]);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [lastCommandIndex, setLastCommandIndex] = useState(0);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const inputRef = useRef<HTMLInputElement>(null);



  const addToHistory = (command: string) => {
    if (command.trim() === "") return;
    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);
    localStorage.setItem("commandHistory", JSON.stringify(newHistory));
    setLastCommandIndex(newHistory.length);
  };

  const processCommand = useCallback(
    async (commandStr: string) => {
      addToHistory(commandStr);
      setInput("");
      setSuggestion("");

      // Add input command to display immediately
      setLines(prev => [...prev, { type: "input" as const, content: commandStr }]);

      const newLines = await handleCommand(
        commandStr,
        variables,
        setVariables,
        lines,
        setLines
      );
      
      // Add lines one by one with delay for typing effect
      for (let i = 0; i < newLines.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setLines(prev => [...prev, newLines[i]]);
      }
    },
    [lines, variables]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processCommand(input.trim());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.max(0, lastCommandIndex - 1);
        setInput(commandHistory[newIndex] || "");
        setSuggestion("");
        setLastCommandIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (lastCommandIndex < commandHistory.length) {
        const newIndex = Math.min(
          commandHistory.length,
          lastCommandIndex + 1
        );
        setInput(commandHistory[newIndex] || "");
        setSuggestion("");
        setLastCommandIndex(newIndex);
      } else {
         setInput("");
         setSuggestion("");
         setLastCommandIndex(commandHistory.length);
      }
    } else if (e.key === "Tab" || (e.key === "ArrowRight" && inputRef.current && inputRef.current.selectionStart === input.length)) {
        if (!suggestion) return;
        e.preventDefault();
        const fullCommand = input + suggestion;
        setInput(fullCommand);
        setSuggestion("");
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      const newSuggestion = getSuggestions(value, variables);
      setSuggestion(newSuggestion);
    } else {
      setSuggestion("");
    }
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("commandHistory");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
           setCommandHistory(parsedHistory);
           setLastCommandIndex(parsedHistory.length);
        }
      } catch (e) {
        console.error("Could not parse command history:", e);
      }
    }
  }, []);

  return {
    lines,
    setLines,
    input,
    setInput,
    suggestion,
    handleKeyDown,
    setCommandHistory,
    setLastCommandIndex,
    handleInputChange,
    inputRef,
  };
};
