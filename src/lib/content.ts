
import profile from '../data/profile.json';
import projects from '../data/projects.json';
import experience from '../data/experience.json';
import skills from '../data/skills.json';
import education from '../data/education.json';
import activities from '../data/activities.json';
import contact from '../data/contact.json';

export {
    profile,
    projects,
    experience,
    skills,
    education,
    activities,
    contact
};

export const helpText = `Available Commands:
- portfolio        : Shows portfolio overview and available sections.
- home             : Welcome message and introduction.
- interface        : Instructions to switch to visual interface mode.
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
