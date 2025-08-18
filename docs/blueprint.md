# **App Name**: RC Terminal Portfolio

## Core Features:

- Typing Animation: Simulate terminal output with a configurable typing animation, including an option to skip the animation.
- Command History: Maintain a history of commands, allowing users to navigate through them using the up/down arrow keys, stored locally and persisting across reloads.
- Command Autocomplete: Suggest commands and section names as the user types, using inline ghost text or a dropdown list.
- Variables and Print Support: Allow users to store command outputs in variables and prepare a clean, print-friendly rendering of the content.
- Secure Feedback Collection: Implement a feedback UI accessible via the `feedback()` command. The app will then ask for authorization from feedbackForMe() before submission is possible.
- Stack back to commandline: Implement back functionality.
- Reasoned error messages: A generative AI tool will choose an appropiate error message for any unexpected value.

## Style Guidelines:

- Primary color: A cool, muted blue (#64B5F6) for a calm and professional terminal aesthetic.
- Background color: Very dark gray (#121212) to provide high contrast and a classic dark theme.
- Accent color: A vibrant, contrasting yellow (#FFEA00) to highlight prompts, commands, and important information.
- Font: 'Source Code Pro' (monospace) for terminal input/output to maintain a code-like feel.
- Single-column layout optimized for readability and command-line interface, ensuring adaptive padding across devices.
- Typing animation for command outputs, with short durations to respect user preferences for reduced motion.
- Minimalist icons for commands and sections, using a monospaced style to match the text.