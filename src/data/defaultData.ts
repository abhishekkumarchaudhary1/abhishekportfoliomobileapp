import { PortfolioData, ResumeData } from '../types';
import basicInfo from '../../assets/basicInfo.json';

// Transform basicInfo.json to PortfolioData format
export const defaultPortfolio: PortfolioData = {
    name: basicInfo.personalInfo.name,
    title: basicInfo.personalInfo.title,
    bio: basicInfo.personalInfo.bio,
    email: basicInfo.personalInfo.email,
    phone: basicInfo.personalInfo.phone,
    location: basicInfo.personalInfo.location,
    github: basicInfo.personalInfo.github,
    linkedin: basicInfo.personalInfo.linkedin,
    website: basicInfo.personalInfo.website,

    projects: basicInfo.projects.map(project => ({
        id: project.id.toString(),
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        imageUrl: project.image,
        link: project.link,
        sourceCode: project.sourceCode,
    })),

    skills: basicInfo.skills.categories.flatMap(category =>
        category.skills.map(skill => ({
            name: skill.name,
            category: category.title.toLowerCase().includes('frontend') ? 'frontend' as const :
                category.title.toLowerCase().includes('backend') ? 'backend' as const :
                    'tools' as const
        }))
    ).concat(
        basicInfo.skills.otherSkills.map(skill => ({
            name: skill,
            category: 'tools' as const
        }))
    ),
};

// Transform basicInfo.json to ResumeData format
export const defaultResume: ResumeData = {
    personalInfo: {
        name: basicInfo.personalInfo.name,
        email: basicInfo.personalInfo.email,
        phone: basicInfo.personalInfo.phone,
        location: basicInfo.personalInfo.location,
        title: basicInfo.personalInfo.title,
        summary: basicInfo.personalInfo.bio,
        website: basicInfo.personalInfo.website,
    },

    experience: basicInfo.experience.map((exp, index) => ({
        id: (index + 1).toString(),
        company: exp.company,
        position: exp.title,
        duration: exp.years,
        description: exp.description,
        achievements: exp.responsibilities || [],
    })),

    education: basicInfo.education.map((edu, index) => ({
        id: (index + 1).toString(),
        institution: edu.school,
        degree: edu.degree,
        field: '', // Not specified in basicInfo
        year: edu.years,
    })),

    projects: basicInfo.projects.slice(0, 3).map(project => ({
        id: project.id.toString(),
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        imageUrl: project.image,
    })),

    skills: basicInfo.skills.categories.flatMap(category =>
        category.skills.map(skill => skill.name)
    ).concat(basicInfo.skills.otherSkills),
};
