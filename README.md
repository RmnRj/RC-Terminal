# RC-Terminal Portfolio

A modern, interactive terminal-style portfolio website built with Next.js, featuring both terminal and visual interface modes.

## 🚀 Features

### Dual Interface Modes
- **Terminal Mode**: Interactive command-line interface with real terminal experience
- **Interface Mode**: Modern web UI with dark theme and responsive design
- Seamless switching between modes with persistent state

### Terminal Features
- Real-time command execution with typing effects
- Command history and autocompletion
- Variable assignment and data manipulation
- Print functionality for generating PDFs
- Session-based state persistence

### Interface Features
- Responsive gallery with keyboard navigation
- Interactive feedback form
- Mobile-optimized layout (2 images per row on mobile)
- Dark theme with professional styling

## 🤖 AI Integration

The application uses **Google Gemini 2.0 Flash** AI model through Firebase Genkit for intelligent error handling:

### AI Implementation Details

**Files:**
- `src/ai/genkit.ts` - AI configuration and setup
- `src/ai/dev.ts` - Development environment setup
- `src/ai/flows/reasoned-error-messages.ts` - AI flow for error message generation

**How AI Works:**
1. **Smart Error Messages**: When users enter invalid commands, AI generates helpful, contextual error messages
2. **Context-Aware**: AI understands the terminal context and provides relevant suggestions
3. **User-Friendly**: Converts technical errors into understandable guidance

**AI Flow Process:**
```typescript
// When an invalid command is entered:
const result = await generateReasonedErrorMessage({
  unexpectedValue: userCommand,
  context: "User tried to run a command in the terminal"
});
// Returns: Helpful, AI-generated error message
```

**Example AI Responses:**
- Input: `opne projects` → AI: "Did you mean 'open(projects)'? Check your spelling."
- Input: `invalid_cmd` → AI: "Command not found. Try 'help' to see available commands."

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **AI**: Google Gemini 2.0 Flash via Firebase Genkit
- **UI Components**: Custom components with shadcn/ui
- **State Management**: React hooks with session storage
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── ai/                     # AI integration
│   ├── genkit.ts          # AI configuration
│   ├── dev.ts             # Development setup
│   └── flows/             # AI flows
├── components/            # React components
│   ├── Terminal.tsx       # Terminal interface
│   ├── InterfaceView.tsx  # Visual interface
│   └── FeedbackForm.tsx   # Contact form
├── data/                  # JSON data files
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and command handler
└── app/                   # Next.js app router
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/RmnRj/RC-Terminal.git
   cd RC-Terminal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   GOOGLE_GENAI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 💻 Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `open(section)` | Open specific sections (projects, skills, etc.) |
| `printCopy(sections)` | Generate PDF of selected sections |
| `clear` | Clear terminal screen |
| `interface` | Switch to visual interface mode |
| `varName -> command` | Store command output in variable |

## 🎨 Features Showcase

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Keyboard Navigation**: Full keyboard support in gallery and terminal
- **Print Functionality**: Generate clean PDFs of portfolio sections
- **Real-time Feedback**: Interactive forms with validation
- **Smart Suggestions**: AI-powered command suggestions and error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Raman** | [GitHub](https://github.com/RmnRj) | [LinkedIn](https://linkedin.com/in/rmnrj)
