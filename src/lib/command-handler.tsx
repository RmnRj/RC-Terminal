"use client";

import React from "react";
import { generateReasonedErrorMessage } from "@/ai/flows/reasoned-error-messages";
import * as content from "./content";
import data from './data.json';
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
        if (typeof item === 'object' && item !== null) {
          return Object.entries(item)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
        }
        return item;
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
    if (args.length === 0 || (args.length === 1 && args[0] === '')) {
      return [{ type: "error", content: "Error: open() requires a section name. Try 'open(projects)'." }];
    }
  
    const lines: Line[] = [];
    for (const section of args) {
      const trimmedSection = section.trim();
      if (!trimmedSection) continue;

      const sectionContent = (content as any)[trimmedSection.toLowerCase()];
      if (sectionContent) {
        lines.push({ type: "output", content: formatOutput(trimmedSection, sectionContent) });
      } else if (variables[trimmedSection]) {
        lines.push({ type: "output", content: formatOutput(trimmedSection, variables[trimmedSection]) });
      } else {
        lines.push({ type: "error", content: `Error: Section or variable '${trimmedSection}' not found.` });
      }
    }
    return lines;
  },
  showname: async () => [{ type: "output", content: content.fullName }],
  showimage: async () => [{ type: "output", content: "showImage() is not implemented yet." }],
  showcontact: async () => [{ type: "output", content: formatOutput("Contact", content.contact) }],
  showactivities: async () => [{ type: "output", content: formatOutput("Activities", content.activities) }],
  about: async () => [{ type: "output", content: formatOutput("About Me", content.about) }],
  projects: async () => [{ type: "output", content: formatOutput("Projects", content.projects) }],
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
  printcopy: async (args, variables) => {
    if (args.length === 0 || (args.length === 1 && args[0] === '')) {
        return [{ type: "error", content: "Usage: printCopy(variableOrSectionName)" }];
    }
    
    const arg = args[0];
    const disallowedCommands = ['clear', 'history', 'help', 'feedback', 'feedbackforme', 'printcopy'];
    if (disallowedCommands.includes(arg.toLowerCase())) {
        return [{ type: "error", content: `Cannot print content from '${arg}'.` }];
    }

    let contentToPrint: any = '';
    const lowerArg = arg.toLowerCase();

    if (variables[arg]) {
        contentToPrint = variables[arg];
    } else if ((content as any)[lowerArg]) {
        contentToPrint = formatOutput(arg, (content as any)[lowerArg]);
    } else if (commands[lowerArg]) {
        const lines = await commands[lowerArg]([], variables, () => {});
        contentToPrint = lines.map(l => l.content).join('\n');
    } else {
        return [{ type: "error", content: `Variable or section '${arg}' not found.` }];
    }

    const printableDiv = document.createElement('div');
    printableDiv.className = 'printable';
    printableDiv.innerHTML = `<h1>Printable Copy</h1><pre>${typeof contentToPrint === 'string' ? contentToPrint : JSON.stringify(contentToPrint, null, 2)}</pre>`;
    document.body.appendChild(printableDiv);
    window.print();
    document.body.removeChild(printableDiv);
    return [{ type: "success", content: "Print dialog opened." }];
  },
};

const allCommands = Object.keys(commands);
const allDataKeys = Object.keys(data);
const allowedOpenArgs = allDataKeys.filter(key => key !== 'fullName');

export const getSuggestions = (input: string, variables: Record<string, any>): string => {
    if (!input) return "";

    const commandsWithArgs = ['open', 'printcopy'];

    // Regex to match 'open(arg1, arg2, ...'
    const openRegex = /^open\(([^)]*)$/;
    const openMatch = input.match(openRegex);
    
    if (openMatch) {
        const argsPart = openMatch[1];
        const args = argsPart.split(',').map(a => a.trim());
        const currentArg = args[args.length - 1];

        const usedArgs = new Set(args.slice(0, args.length - 1));
        const availableSuggestions = allowedOpenArgs.filter(key => !usedArgs.has(key));
        
        if (currentArg) {
            const suggestion = availableSuggestions.find(s => s.startsWith(currentArg));
            if (suggestion) {
                return suggestion;
            }
        }
        return "";
    }
    
    // Regex for printcopy
    const printCopyRegex = /^(printcopy\()([^)]*)$/;
    const printCopyMatch = input.match(printCopyRegex);
    if (printCopyMatch) {
        const arg = printCopyMatch[2].trim();
        const candidates = [...allDataKeys, ...Object.keys(variables)];
        if (arg) {
            const suggestion = candidates.find(c => c.startsWith(arg));
            if (suggestion) return suggestion;
        }
        return "";
    }

    // Default command suggestion
    const commandCandidates = [...allCommands, ...Object.keys(variables)];
    const suggestion = commandCandidates.find(c => c.startsWith(input));

    if (suggestion) {
        if (commandsWithArgs.includes(suggestion) && input === suggestion) {
            return `${suggestion}()`;
        }
        return suggestion;
    }

    return "";
};


export const handleCommand = async (
  commandStr: string,
  variables: any,
  setVariables: Function,
  lines: Line[],
  setLines: Function
): Promise<Line[]> => {
  const trimmedCommand = commandStr.trim().replace(/;$/, "");
  
  if (trimmedCommand.toLowerCase() === 'clear') {
    setLines([]);
    return [];
  }

  // Variable assignment
  if (trimmedCommand.includes("->")) {
    const parts = trimmedCommand.split("->").map((p) => p.trim());
    if (parts.length !== 2) return [{ type: "error", content: "Invalid variable assignment syntax. Use: varName -> command()" }];
    const varName = parts[0];
    const cmdStr = parts[1];

    // Temporarily handle command to get output
    const tempLines = await handleCommand(cmdStr, variables, setVariables, lines, setLines);
    
    // Check for component output first
    const componentLine = tempLines.find(line => line.type === 'component');
    if (componentLine) {
        return [{ type: "error", content: `Cannot store component output in variable '${varName}'.` }];
    }

    const outputContent = tempLines
      .filter(line => line.type === 'output' && typeof line.content === 'string')
      .map(line => line.content)
      .join('\n');
    
    if (outputContent) {
      setVariables({ ...variables, [varName]: outputContent });
      return [{ type: "success", content: `Stored output in variable '${varName}'.` }];
    } else {
      // Try to get raw data from commands that return structured data
      const match = cmdStr.match(/^([a-zA-Z_]+)(?:\(.*\))?$/);
       if (match) {
        const [, command] = match;
        const sectionContent = (content as any)[command.toLowerCase()];
        if(sectionContent) {
          setVariables({ ...variables, [varName]: sectionContent });
          return [{ type: "success", content: `Stored data in variable '${varName}'.` }];
        }
      }
      return [{ type: "error", content: `Command '${cmdStr}' produced no storable output.` }];
    }
  }

  const match = trimmedCommand.match(/^([a-zA-Z_]+)(?:\((.*)\))?$/);

  if (!match) {
      try {
          const result = await generateReasonedErrorMessage({
              unexpectedValue: trimmedCommand,
              context: "User tried to run a command in the terminal. The command syntax is likely incorrect. It should be command or command(arguments).",
          });
          return [{ type: "error", content: result.errorMessage }];
      } catch (e) {
          return [{ type: "error", content: `Error: command not found or invalid syntax: ${trimmedCommand}. Try 'help'.` }];
      }
  }

  const [, command, argsString] = match;
  const cmdFunc = commands[command.toLowerCase()];

  if (cmdFunc) {
      const args = (argsString === undefined || argsString === null || argsString.trim() === '') 
        ? [] 
        : argsString.split(",").map((arg) => arg.trim().replace(/^['"]|['"]$/g, ""));
      return cmdFunc(args, variables, setVariables);
  } else {
    try {
      const result = await generateReasonedErrorMessage({
        unexpectedValue: trimmedCommand,
        context: "User tried to run a command in the terminal.",
      });
      return [{ type: "error", content: result.errorMessage }];
    } catch (e) {
      return [{ type: "error", content: `Error: command not found: ${command}. Try 'help'.` }];
    }
  }
};

    