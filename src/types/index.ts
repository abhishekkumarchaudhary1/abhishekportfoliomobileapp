// Portfolio Types
export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    link?: string;
}

export interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'mobile' | 'tools' | 'other';
}

export interface PortfolioData {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    github?: string;
    linkedin?: string;
    website?: string;
    projects: Project[];
    skills: Skill[];
}

// Resume Types
export interface Experience {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    year: string;
}

export interface ResumeData {
    personalInfo: {
        name: string;
        email: string;
        phone: string;
        location: string;
        title: string;
        summary: string;
        website?: string;
    };
    experience: Experience[];
    education: Education[];
    projects?: Project[];
    skills: string[];
}
