"use client";

import React, { useState, useCallback, useEffect } from "react";
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
  const [commandStack, setCommandStack] = useState<Line[][]>([]);

  const addToHistory = (command: string) => {
    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);
    localStorage.setItem("commandHistory", JSON.stringify(newHistory));
    setLastCommandIndex(newHistory.length);
  };

  const processCommand = useCallback(
    async (commandStr: string) => {
      addToHistory(commandStr);
      setInput("");

      const currentLines = [...lines, { type: "input" as const, content: commandStr }];
      if (commandStack.length >= 5) {
        setCommandStack(prev => [...prev.slice(1), currentLines]);
      } else {
        setCommandStack(prev => [...prev, currentLines]);
      }
      setLines(currentLines);

      const newLines = await handleCommand(
        commandStr,
        variables,
        setVariables,
        lines,
        setLines,
        commandStack,
        setCommandStack
      );
      setLines((prev) => [...prev, ...newLines]);
    },
    [lines, variables, commandStack]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        processCommand(input.trim());
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.max(0, lastCommandIndex - 1);
        setInput(commandHistory[newIndex] || "");
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
        setLastCommandIndex(newIndex);
      }
    } else if (e.key === "Tab" || e.key === "ArrowRight") {
        if (suggestion) {
            e.preventDefault();
            setInput(suggestion);
        }
    }
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem("commandHistory");
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      setCommandHistory(parsedHistory);
      setLastCommandIndex(parsedHistory.length);
    }
  }, []);
  
  useEffect(() => {
    if (input) {
      const newSuggestion = getSuggestions(input, variables);
      setSuggestion(newSuggestion);
    } else {
      setSuggestion("");
    }
  }, [input, variables]);

  return {
    lines,
    setLines,
    input,
    setInput,
    suggestion,
    handleKeyDown,
    setCommandHistory,
    setLastCommandIndex,
  };
};
