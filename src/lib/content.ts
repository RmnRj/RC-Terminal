export const fullName = "Raman — AI/ML Engineer & Developer";

export const about = `I am a passionate developer with a focus on building intelligent systems. 
My journey in tech has been driven by a fascination with pattern recognition, computer vision, and machine learning.
I thrive on solving complex problems and creating software that makes a difference. 
Currently exploring advancements in neural networks and supply chain analytics. I also like dogs.`;

export const projects = [
  {
    Title: "Artificial System Software [AiSS]",
    Description:
      "A neural network-based system designed for advanced pattern recognition tasks.",
    "Tech Stack": "Python, PyTorch, Scikit-learn",
    Link: "github.com/ramanc/aiss",
  },
  {
    Title: "Apple Suppliers System [AppleSS]",
    Description:
      "A supply chain analytics dashboard to visualize and manage supplier data.",
    "Tech Stack": "Node.js, React, PostgreSQL, D3.js",
    Link: "github.com/ramanc/appless",
  },
  {
    Title: "VisionKit [VK]",
    Description: "An open-source toolkit for common image processing operations.",
    "Tech Stack": "C++, OpenCV",
    Link: "github.com/ramanc/visionkit",
  },
  {
    Title: "Portfolio Terminal",
    Description: "The very terminal you are using right now!",
    "Tech Stack": "Next.js, TypeScript, TailwindCSS, Genkit",
    Link: "github.com/ramanc/terminal-portfolio",
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
      "Built and maintained responsive websites and e-commerce solutions for various clients. Specialized in React and Node.js.",
  },
   {
    Role: "Software Engineer",
    Company: "Innovate Solutions",
    Duration: "2020 - 2022",
    Description:
      "Worked on a large-scale data processing pipeline using Apache Spark and Kafka.",
  },
];

export const skills = {
  "Programming Languages": "Python, C++, JavaScript, Java, Kotlin, Go",
  "AI/ML": "PyTorch, TensorFlow, OpenCV, Scikit-learn, Keras",
  "Web Development": "Node.js, Express, React, Next.js, PostgreSQL, MongoDB, GraphQL",
  "Cloud & DevOps": "AWS, GCP, Docker, Kubernetes, Jenkins, CI/CD, Terraform",
  "Soft Skills": "Problem Solving, Communication, Team Collaboration, Project Management, Agile Methodologies",
};

export const education = [
  {
    Degree: "Master of Science in Artificial Intelligence",
    Institution: "Stanford University",
    "Graduation Year": "2026 (Expected)",
    "Notable Coursework": "Deep Learning, Natural Language Processing, Reinforcement Learning"
  },
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
    Project: "TensorFlow",
    Description: "Contributed performance optimizations to the data loading module.",
  },
  {
    Activity: "Tech Speaker",
    Event: "PyCon 2024",
    Description: "Presented a talk on 'Scaling PyTorch Models for Production'.",
  },
];

export const contact = {
  Email: "raman.c@example.com",
  GitHub: "github.com/ramanc",
  LinkedIn: "linkedin.com/in/ramanc",
  Twitter: "@raman_codes"
};

export const helpText = `Available Commands:
- open(section)    : Opens a specific section (e.g., 'projects', 'skills').
- showName()         : Displays full name and title.
- showContact()      : Shows contact information.
- showActivities()   : Lists extracurriculars and achievements.
- about()            : Shows the biography.
- projects()         : Lists all projects.
- experience()       : Details work experience.
- skills()           : Lists technical and soft skills.
- education()        : Shows academic background.
- history()          : Displays command history.
- clear()            : Clears the terminal screen.
- back()             : Goes back to the previous command state (undo).
- feedback()         : Opens the feedback form.
- varName -> cmd()   : Stores command output in a variable (e.g., myVar -> projects()).
- makeCopy(varName)  : Prepares a variable's content for printing.
`;
