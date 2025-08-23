"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { handleCommand, getSuggestions, Line } from "@/lib/command-handler";

export const useTerminal = () => {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      content: "Welcome to RC Terminal. Type 'help' for a list of commands.",
    },
  ]);
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

      const currentLines = [...lines, { type: "input" as const, content: commandStr }];
      setLines(currentLines);

      const newLines = await handleCommand(
        commandStr,
        variables,
        setVariables,
        lines,
        setLines
      );
      setLines((prev) => [...prev, ...newLines]);
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
    } else if (e.key === "Tab" || e.key === "ArrowRight") {
        if (!suggestion || !inputRef.current) return;
        const caret = inputRef.current.selectionStart ?? input.length;
        // Allow accepting suggestion only when the caret is at the end of the input
        if (suggestion && caret === input.length) {
            e.preventDefault();
            setInput(input + suggestion);
            setSuggestion("");
        }
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
