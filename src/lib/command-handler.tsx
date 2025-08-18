"use client";

import React from "react";
import { generateReasonedErrorMessage } from "@/ai/flows/reasoned-error-messages";
import * as content from "./content";
import FeedbackForm from "@/components/FeedbackForm";

export interface Line {
  type: "input" | "output" | "error" | "success" | "component";
  content: React.ReactNode;
}

const formatOutput = (title: string, data: any) => {
  let output = `\n--- ${title.toUpperCase()} ---\n\n`;
  if (Array.isArray(data)) {
    output += data
      .map((item) => {
        return Object.entries(item)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
      })
      .join("\n\n");
  } else if (typeof data === "object" && data !== null) {
    output += Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  } else {
    output += data;
  }
  return output + "\n";
};

const commands: { [key: string]: (args: string[], variables: any, setVariables: Function) => Promise<Line[]> } = {
  help: async () => [
    { type: "output", content: content.helpText },
  ],
  open: async (args, variables) => {
    if (args.length === 0) return [{ type: "error", content: "Error: open() requires a section name. Try 'open(projects)'." }];
    const section = args[0].toLowerCase();
    const sectionContent = (content as any)[section];
    if (sectionContent) {
        const output = formatOutput(section, sectionContent);
        return [{ type: "output", content: output }];
    }
    if (variables[section]) {
        return [{ type: "output", content: variables[section] }];
    }
    return [{ type: "error", content: `Error: Section or variable '${section}' not found.` }];
  },
  showname: async () => [{ type: "output", content: content.fullName }],
  showimage: async () => [{ type: "output", content: "showImage() is not implemented yet." }],
  showcontact: async () => [{ type: "output", content: formatOutput("Contact", content.contact) }],
  showactivities: async () => [{ type: "output", content: formatOutput("Activities", content.activities) }],
  about: async () => [{ type: "output", content: formatOutput("About Me", content.about) }],
  project: async () => [{ type: "output", content: formatOutput("Projects", content.projects) }],
  experience: async () => [{ type: "output", content: formatOutput("Experience", content.experience) }],
  skills: async () => [{ type: "output", content: formatOutput("Skills", content.skills) }],
  education: async () => [{ type: "output", content: formatOutput("Education", content.education) }],
  history: async () => {
    const history = JSON.parse(localStorage.getItem("commandHistory") || "[]");
    return [{ type: "output", content: history.join("\n") }];
  },
  clear: async () => [],
  feedback: async () => [{ type: "component", content: <FeedbackForm /> }],
  feedbackforme: async () => [{ type: "error", content: "This command is for administrative use." }],
  makecopy: async (args) => {
    if (args.length === 0) return [{ type: "error", content: "Usage: makeCopy(variableName)" }];
    // This part is a bit tricky without access to variables state directly
    // This will be handled in the calling function.
    return [{ type: "output", content: "Preparing printable copy..." }];
  },
  back: async () => {
    // Logic handled in useTerminal hook
    return [];
  },
};

const allCommands = Object.keys(commands);

export const getSuggestions = (input: string): string[] => {
  const command = input.split("(")[0].toLowerCase();
  if (!input) return [];
  return allCommands.filter((c) => c.startsWith(command)).map(cmd => cmd + "()");
};

export const handleCommand = async (
  commandStr: string,
  variables: any,
  setVariables: Function,
  lines: Line[],
  setLines: Function,
  commandStack: Line[][],
  setCommandStack: Function
): Promise<Line[]> => {

  if (commandStr.toLowerCase() === 'clear') {
    setLines([]);
    return [];
  }
  
  if (commandStr.toLowerCase() === 'back') {
    if (commandStack.length > 1) {
      const newStack = commandStack.slice(0, -1);
      setCommandStack(newStack);
      setLines(newStack[newStack.length - 1] || []);
    } else {
      setCommandStack([]);
      setLines([ { type: "output", content: "Welcome to RC Terminal. Type 'help' for a list of commands." } ]);
    }
    return [];
  }

  // Variable assignment
  if (commandStr.includes("->")) {
    const parts = commandStr.split("->").map((p) => p.trim());
    if (parts.length !== 2) return [{ type: "error", content: "Invalid variable assignment syntax. Use: varName -> command()" }];
    const varName = parts[0];
    const cmdStr = parts[1];

    // Temporarily handle command to get output
    const tempLines = await handleCommand(cmdStr, variables, setVariables, lines, setLines, commandStack, setCommandStack);
    const outputContent = tempLines
      .filter(line => line.type === 'output' && typeof line.content === 'string')
      .map(line => line.content)
      .join('\n');
    
    const finalOutput = outputContent;

    if (finalOutput) {
      setVariables({ ...variables, [varName]: finalOutput });
      return [{ type: "success", content: `Stored output in variable '${varName}'.` }];
    } else {
      return [{ type: "error", content: `Command '${cmdStr}' produced no storable output.` }];
    }
  }

  const match = commandStr.match(/^([a-zA-Z_]+)\((.*)\)$/);

  if (!match) {
      try {
          const result = await generateReasonedErrorMessage({
              unexpectedValue: commandStr,
              context: "User tried to run a command in the terminal. The command syntax is likely incorrect. It should be command(args).",
          });
          return [{ type: "error", content: result.errorMessage }];
      } catch (e) {
          return [{ type: "error", content: `Error: command not found or invalid syntax: ${commandStr}. Try 'help'.` }];
      }
  }

  const [, command, argsString] = match;
  const args = argsString ? argsString.split(",").map((arg) => arg.trim().replace(/^['"]|['"]$/g, "")) : [];
  
  const cmdFunc = commands[command.toLowerCase()];

  if (command.toLowerCase() === 'makecopy') {
      const varName = args[0];
      if (!varName || !variables[varName]) {
          return [{ type: "error", content: "Variable not found. Usage: makeCopy(variableName)" }];
      }
      const printableDiv = document.createElement('div');
      printableDiv.className = 'printable';
      printableDiv.innerHTML = `<h1>Printable Copy</h1><pre>${variables[varName]}</pre>`;
      document.body.appendChild(printableDiv);
      window.print();
      document.body.removeChild(printableDiv);
      return [{ type: "success", content: "Print dialog opened." }];
  }

  if (cmdFunc) {
    return cmdFunc(args, variables, setVariables);
  } else {
    try {
      const result = await generateReasonedErrorMessage({
        unexpectedValue: commandStr,
        context: "User tried to run a command in the terminal.",
      });
      return [{ type: "error", content: result.errorMessage }];
    } catch (e) {
      return [{ type: "error", content: `Error: command not found: ${command}. Try 'help'.` }];
    }
  }
};
