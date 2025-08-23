
"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { handleCommand, getSuggestions, Line } from "@/lib/command-handler";
import TypingEffect from "@/components/TypingEffect";

export const useTerminal = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [lastCommandIndex, setLastCommandIndex] = useState(0);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLines([
      {
        type: "output",
        content: (
          <TypingEffect
            text="Welcome to RC Terminal. Type 'help' for a list of commands."
            onFinished={() => setIsTyping(false)}
          />
        ),
      },
    ]);
  }, []);

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

      const currentLines = [...lines, { type: "input" as const, content: commandStr }];
      setLines(currentLines);

      setIsTyping(true);
      const outputLines = await handleCommand(
        commandStr,
        variables,
        setVariables,
        lines,
        setLines
      );
      
      if (outputLines.length > 0) {
        const outputWithTyping = outputLines.map(line => {
            if ((line.type === 'output' || line.type === 'success' || line.type === 'error') && typeof line.content === 'string') {
                return {
                    ...line,
                    content: <TypingEffect text={line.content} onFinished={() => setIsTyping(false)} />
                };
            }
            return line;
        });

        const hasComponent = outputLines.some(line => line.type === 'component');
        if (hasComponent) {
            setIsTyping(false);
        }
        
        setLines((prev) => [...prev, ...outputWithTyping]);

      } else {
         setIsTyping(false);
      }
    },
    [lines, variables]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isTyping) return;
      processCommand(input.trim());
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isTyping) return;
      if (commandHistory.length > 0) {
        const newIndex = Math.max(0, lastCommandIndex - 1);
        setInput(commandHistory[newIndex] || "");
        setSuggestion("");
        setLastCommandIndex(newIndex);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (isTyping) return;
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
    isTyping,
  };
};
