import data from './data.json';

export const { 
    fullName, 
    about, 
    projects, 
    experience, 
    skills, 
    education, 
    activities, 
    contact 
} = data;

export const helpText = `Available Commands:
- open(section)    : Opens a specific section (e.g., 'projects', 'skills').
- showName         : Displays full name and title.
- showContact      : Shows contact information.
- showActivities   : Lists extracurriculars and achievements.
- about            : Shows the biography.
- projects         : Lists all projects.
- experience       : Details work experience.
- skills           : Lists technical and soft skills.
- education        : Shows academic background.
- history          : Displays command history.
- clear            : Clears the terminal screen.
- feedback         : Opens the feedback form.
- varName -> cmd() : Stores command output in a variable (e.g., myVar -> projects()).
- printCopy(var)   : Prepares a variable's or section's content for printing.
`;
