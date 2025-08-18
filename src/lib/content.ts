export const fullName = "Raman — AI/ML Engineer & Developer";

export const about = `I am a passionate developer with a focus on building intelligent systems. 
My journey in tech has been driven by a fascination with pattern recognition, computer vision, and machine learning.
I thrive on solving complex problems and creating software that makes a difference. 
Currently exploring advancements in neural networks and supply chain analytics.`;

export const projects = [
  {
    Title: "Artificial System Software [AiSS]",
    Description:
      "A neural network-based system designed for advanced pattern recognition tasks.",
    "Tech Stack": "Python, PyTorch, Scikit-learn",
    Link: "github.com/your-username/aiss",
  },
  {
    Title: "Apple Suppliers System [AppleSS]",
    Description:
      "A supply chain analytics dashboard to visualize and manage supplier data.",
    "Tech Stack": "Node.js, React, PostgreSQL, D3.js",
    Link: "github.com/your-username/appless",
  },
  {
    Title: "VisionKit [VK]",
    Description: "An open-source toolkit for common image processing operations.",
    "Tech Stack": "C++, OpenCV",
    Link: "github.com/your-username/visionkit",
  },
];

export const experience = [
  {
    Role: "Machine Learning Intern",
    Company: "Tech Innovations Inc.",
    Duration: "Summer 2023",
    Description:
      "Developed and evaluated models for image classification, achieving a 15% improvement in accuracy over baseline.",
  },
  {
    Role: "Freelance Web Developer",
    Client: "Local Businesses",
    Duration: "2022 - Present",
    Description:
      "Built and maintained responsive websites and e-commerce solutions for various clients.",
  },
];

export const skills = {
  "Programming Languages": "Python, C++, JavaScript, Java, Kotlin",
  "AI/ML": "PyTorch, TensorFlow, OpenCV, Scikit-learn",
  "Web Development": "Node.js, Express, React, Next.js, PostgreSQL, MongoDB",
  Tools: "Git, Docker, Jenkins, CI/CD",
  "Soft Skills": "Problem Solving, Communication, Team Collaboration, Project Management",
};

export const education = [
  {
    Degree: "Bachelor of Science in Computer Science",
    Institution: "University of Technology",
    "Graduation Year": "2024",
    "Notable Coursework":
      "Neural Networks, Image Processing, Engineering Economics, Advanced Algorithms",
  },
];

export const activities = [
  {
    Activity: "Hackathon Winner, TechCrunch Disrupt 2023",
    Description: "Led a team to build a prize-winning project in the AI for Good category.",
  },
  {
    Activity: "Open Source Contributor",
    Project: "OpenCV",
    Description: "Contributed patches and documentation for the image processing library.",
  },
];

export const contact = {
  Email: "your.email@example.com",
  GitHub: "github.com/your-username",
  LinkedIn: "linkedin.com/in/your-profile",
};

export const helpText = `Available Commands:
- open(section)    : Opens a specific section (e.g., 'projects', 'skills').
- showName()         : Displays full name and title.
- showContact()      : Shows contact information.
- showActivities()   : Lists extracurriculars and achievements.
- about()            : Shows the biography.
- project()          : Lists all projects.
- experience()       : Details work experience.
- skills()           : Lists technical and soft skills.
- education()        : Shows academic background.
- history()          : Displays command history.
- clear()            : Clears the terminal screen.
- back()             : Goes back to the previous command state (undo).
- feedback()         : Opens the feedback form.
- varName -> cmd()   : Stores command output in a variable (e.g., myVar -> project()).
- makeCopy(varName)  : Prepares a variable's content for printing.
`;
