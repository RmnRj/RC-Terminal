
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
  const lines = [`--- ${title.toUpperCase()} ---`, ""];
  
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      if (typeof item === 'object' && item !== null) {
        Object.entries(item).forEach(([key, value]) => {
          lines.push(`${key}: ${String(value)}`);
        });
        if (index < data.length - 1) lines.push("");
      } else {
        lines.push(String(item));
      }
    });
  } else if (typeof data === "object" && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      lines.push(`${key}: ${String(value)}`);
    });
  } else {
    lines.push(String(data));
  }
  
  return lines;
};

const commands: { [key: string]: (args: string[], variables: any, setVariables: Function) => Promise<Line[]> } = {
  help: async () => [
    { type: "output", content: content.helpText },
  ],
  interface: async () => [
    { type: "success", content: "Switching to Interface mode... Use the Interface button in the navigation bar." },
  ],
  portfolio: async () => [
    { type: "output", content: "Welcome to my portfolio! Available sections: home, education, gallery, skills, experiences, about, feedback, projects. Use 'interface' command to switch to visual mode." },
  ],
  home: async () => [
    { type: "output", content: "Welcome to my portfolio terminal! I'm a passionate developer creating innovative solutions. Type 'help' for available commands or 'interface' to switch to visual mode." },
  ],
  open: async (args, variables) => {
    if (args.length === 0 || (args.length === 1 && args[0] === '')) {
      return [{ type: "error", content: "Error: open() requires a section name. Try 'open(projects)'." }];
    }
  
    const lines: Line[] = [];
    for (let i = 0; i < args.length; i++) {
      const trimmedSection = args[i].trim();
      if (!trimmedSection) continue;

      // Add 3-line gap between sections (except for first section)
      if (i > 0) {
        lines.push({ type: "output", content: "" });
        lines.push({ type: "output", content: "" });
        lines.push({ type: "output", content: "" });
      }

      const sectionContent = (content as any)[trimmedSection.toLowerCase()];
      if (sectionContent) {
        const outputLines = formatOutput(trimmedSection, sectionContent);
        outputLines.forEach(line => {
          lines.push({ type: "output", content: line });
        });
      } else if (variables[trimmedSection]) {
        const outputLines = formatOutput(trimmedSection, variables[trimmedSection]);
        outputLines.forEach(line => {
          lines.push({ type: "output", content: line });
        });
      } else {
        lines.push({ type: "error", content: `Error: Section or variable '${trimmedSection}' not found.` });
      }
    }
    return lines;
  },
  showname: async () => [{ type: "output", content: content.profile.fullName }],
  showimage: async () => [{ type: "output", content: "showImage() is not implemented yet." }],
  showcontact: async () => {
    const lines = formatOutput("Contact", content.contact);
    return lines.map(line => ({ type: "output" as const, content: line }));
  },
  showactivities: async () => {
    const lines = formatOutput("Activities", content.activities);
    return lines.map(line => ({ type: "output" as const, content: line }));
  },
  about: async () => {
    const lines = formatOutput("About Me", content.profile.about);
    return lines.map(line => ({ type: "output" as const, content: line }));
  },
  projects: async () => {
    const lines = formatOutput("Projects", content.projects);
    return lines.map(line => ({ type: "output" as const, content: line }));
  },
  experience: async () => {
    const lines = formatOutput("Experience", content.experience);
    return lines.map(line => ({ type: "output" as const, content: line }));
  },
  skills: async () => {
    const lines = formatOutput("Skills", content.skills);
    return lines.map(line => ({ type: "output" as const, content: line }));
  },
  education: async () => {
    const lines = formatOutput("Education", content.education);
    return lines.map(line => ({ type: "output" as const, content: line }));
  },
  history: async () => {
    const history = JSON.parse(localStorage.getItem("commandHistory") || "[]");
    return [{ type: "output", content: history.join("\n") }];
  },
  clear: async () => [],
  feedback: async () => [{ type: "component", content: <FeedbackForm /> }],
  feedbackforme: async () => [{ type: "error", content: "This command is for administrative use." }],
  printcopy: async (args, variables) => {
    if (args.length === 0 || (args.length === 1 && args[0] === '')) {
        return [{ type: "error", content: "Usage: printCopy(section1, section2, ...)" }];
    }
    
    const disallowedCommands = ['clear', 'history', 'help', 'feedback', 'feedbackforme', 'printcopy'];
    let allContent: string[] = [];

    for (const arg of args) {
      const trimmedArg = arg.trim();
      if (disallowedCommands.includes(trimmedArg.toLowerCase())) {
        return [{ type: "error", content: `Cannot print content from '${trimmedArg}'.` }];
      }

      const lowerArg = trimmedArg.toLowerCase();
      let sectionContent = '';

      if (variables[trimmedArg]) {
        sectionContent = `=== ${trimmedArg.toUpperCase()} ===\n\n${variables[trimmedArg]}`;
      } else if ((content as any)[lowerArg]) {
        const data = (content as any)[lowerArg];
        sectionContent = `=== ${trimmedArg.toUpperCase()} ===\n\n`;
        
        if (Array.isArray(data)) {
          data.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              Object.entries(item).forEach(([key, value]) => {
                sectionContent += `${key}: ${String(value)}\n`;
              });
              if (index < data.length - 1) sectionContent += '\n';
            } else {
              sectionContent += `${String(item)}\n`;
            }
          });
        } else if (typeof data === 'object' && data !== null) {
          Object.entries(data).forEach(([key, value]) => {
            sectionContent += `${key}: ${String(value)}\n`;
          });
        } else {
          sectionContent += String(data);
        }
      } else {
        return [{ type: "error", content: `Section '${trimmedArg}' not found.` }];
      }
      
      allContent.push(sectionContent);
    }

    const printableDiv = document.createElement('div');
    printableDiv.className = 'printable';
    printableDiv.innerHTML = `
      <style>
        .printable { font-family: 'Courier New', monospace; line-height: 1.6; padding: 20px; }
        .printable h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .printable pre { white-space: pre-wrap; font-size: 12px; }
      </style>
      <h1>Portfolio Information</h1>
      <pre>${allContent.join('\n\n\n')}</pre>
    `;
    document.body.appendChild(printableDiv);
    window.print();
    document.body.removeChild(printableDiv);
    return [{ type: "success", content: "Print dialog opened with formatted content." }];
  },
};

const commandsWithArgs = ['open', 'printcopy'];
const allDataKeys = Object.keys(content);
const allowedOpenArgs = allDataKeys.filter(key => !['profile', 'helpText'].includes(key));
const allTopLevelCommands = Object.keys(commands);


/**
 * Provides autocompletion suggestions for commands and their arguments in a TypeScript environment.
 * @param {string} input - The current user input in the terminal.
 * @param {Record<string, any>} variables - A dictionary of user-defined variables.
 * @returns {string} The suggested text (ghost text) to be displayed.
 */
export const getSuggestions = (input: string, variables: Record<string, any>): string => {
  if (!input) {
    return "";
  }

  // Regex to match an incomplete command with arguments, e.g., "open(arg1, ar"
  const commandRegex = /^(\w+)\(([^)]*)$/;
  const match: RegExpMatchArray | null = input.match(commandRegex);

  // Case 1: The user is typing inside the parentheses of a command.
  if (match) {
    // Safely destructure the results from the regex match.
    const [, commandRaw, argsPart] = match;

    // Type guard to ensure the captured groups are strings.
    if (typeof commandRaw !== 'string' || typeof argsPart !== 'string') {
      return "";
    }

    const command: string = commandRaw.toLowerCase();

    // Split the string inside the parentheses by commas to get individual arguments.
    const allArgs: string[] = argsPart.split(',').map(arg => arg.trim());
    
    // The argument the user is currently typing is the last one in the array.
    const currentTypingArg: string | undefined = allArgs[allArgs.length - 1];
    
    // Arguments that are already fully typed are all arguments except the last one.
    const completedArgs: string[] = allArgs.slice(0, -1);
    const usedArgSet: Set<string> = new Set(completedArgs.map(arg => arg.toLowerCase()).filter(Boolean));

    let candidates: string[] = [];

    // Determine the list of possible suggestions based on the command.
    if (command === 'open') {
      candidates = [...Object.keys(variables), ...allowedOpenArgs].filter(key => !usedArgSet.has(key.toLowerCase()));
    } else if (command === 'printcopy') {
      candidates = [...Object.keys(variables), ...allDataKeys];
    }

    // currentTypingArg can be an empty string "" but not undefined here
    if (typeof currentTypingArg === 'string') {
      if (currentTypingArg) { // User has started typing the argument
        const suggestion = candidates.find(c => c.toLowerCase().startsWith(currentTypingArg.toLowerCase()));
        if (suggestion) {
          return suggestion.substring(currentTypingArg.length);
        }
      } else { // Current argument is empty (e.g., after a comma)
        if (candidates.length > 0) {
          return candidates[0];
        }
      }
    }
    
    return "";
  }

  // Case 2: The user is typing a command name itself.
  const commandCandidates: string[] = [...allTopLevelCommands, ...Object.keys(variables)];
  const suggestion: string | undefined = commandCandidates.find(c => c.toLowerCase().startsWith(input.toLowerCase()));

  if (suggestion) {
    const remaining: string = suggestion.substring(input.length);
    // Removed the automatic closing bracket feature.
    // if (commandsWithArgs.includes(suggestion.toLowerCase()) && input.toLowerCase() === suggestion.toLowerCase()) {
    //   return "()";
    // }
    return remaining;
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
  let finalArgsString = argsString;

  // If the command ends with ')' but argsString is undefined, it means empty args like command()
  if (trimmedCommand.endsWith(')') && argsString === undefined) {
      finalArgsString = '';
  }

  if (finalArgsString === undefined || finalArgsString === null) {
      // Command without parentheses
      const cmdFunc = commands[command.toLowerCase()];
      if (cmdFunc) {
          return cmdFunc([], variables, setVariables);
      }
  } else {
      // Command with parentheses
      const cmdFunc = commands[command.toLowerCase()];
      if (cmdFunc) {
          const args = finalArgsString.trim() === '' 
            ? [] 
            : finalArgsString.split(",").map((arg) => arg.trim().replace(/^['"]|['"]$/g, ""));
          return cmdFunc(args, variables, setVariables);
      }
  }

  try {
    const result = await generateReasonedErrorMessage({
      unexpectedValue: trimmedCommand,
      context: "User tried to run a command in the terminal.",
    });
    return [{ type: "error", content: result.errorMessage }];
  } catch (e) {
    return [{ type: "error", content: `Error: command not found: ${command}. Try 'help'.` }];
  }
};

