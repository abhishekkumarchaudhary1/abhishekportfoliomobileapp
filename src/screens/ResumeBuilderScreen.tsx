import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Card, InputField, Button, SkillsManager, ExperienceForm, EducationForm, ProjectForm } from '../components';
import { colors, typography, spacing } from '../theme';
import { defaultResume } from '../data/defaultData';
import { ResumeData, Experience, Education, Project } from '../types';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const ResumeBuilderScreen: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [customResume, setCustomResume] = useState<ResumeData>(defaultResume);
  const [isExporting, setIsExporting] = useState(false);

  const handleToggleMode = () => {
    setIsEditMode(!isEditMode);
    // Reset to default when switching back to view mode
    if (isEditMode) {
      setCustomResume(defaultResume);
    }
  };

  // Experience Handlers
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      description: '',
      achievements: [],
    };
    setCustomResume({
      ...customResume,
      experience: [...customResume.experience, newExp],
    });
  };

  const handleUpdateExperience = (index: number, updatedExp: Experience) => {
    const newExperience = [...customResume.experience];
    newExperience[index] = updatedExp;
    setCustomResume({ ...customResume, experience: newExperience });
  };

  const handleRemoveExperience = (index: number) => {
    if (customResume.experience.length > 1) {
      setCustomResume({
        ...customResume,
        experience: customResume.experience.filter((_, i) => i !== index),
      });
    } else {
      Alert.alert('Cannot Remove', 'At least one experience entry is required.');
    }
  };

  // Education Handlers
  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      year: '',
    };
    setCustomResume({
      ...customResume,
      education: [...customResume.education, newEdu],
    });
  };

  const handleUpdateEducation = (index: number, updatedEdu: Education) => {
    const newEducation = [...customResume.education];
    newEducation[index] = updatedEdu;
    setCustomResume({ ...customResume, education: newEducation });
  };

  const handleRemoveEducation = (index: number) => {
    if (customResume.education.length > 1) {
      setCustomResume({
        ...customResume,
        education: customResume.education.filter((_, i) => i !== index),
      });
    } else {
      Alert.alert('Cannot Remove', 'At least one education entry is required.');
    }
  };

  // Project Handlers
  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
    };
    const currentProjects = customResume.projects || [];
    setCustomResume({
      ...customResume,
      projects: [...currentProjects, newProject],
    });
  };

  const handleUpdateProject = (index: number, updatedProject: Project) => {
    const currentProjects = customResume.projects || [];
    const newProjects = [...currentProjects];
    newProjects[index] = updatedProject;
    setCustomResume({ ...customResume, projects: newProjects });
  };

  const handleRemoveProject = (index: number) => {
    const currentProjects = customResume.projects || [];
    setCustomResume({
      ...customResume,
      projects: currentProjects.filter((_, i) => i !== index),
    });
  };

  const generateResumeHTML = (resume: ResumeData) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume - ${resume.personalInfo.name}</title>
          <style>
            @page {
              size: letter;
              margin: 0;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Calibri', 'Arial', sans-serif;
              font-size: 9pt;
              line-height: 1.3;
              color: #000000;
              padding: 0.35in 0.5in;
              max-width: 8.5in;
            }
            h1 {
              font-size: 18pt;
              font-weight: bold;
              color: #000000;
              margin-bottom: 2pt;
              text-transform: uppercase;
              letter-spacing: 0.5pt;
            }
            h2 {
              font-size: 11pt;
              font-weight: bold;
              color: #000000;
              margin-top: 8pt;
              margin-bottom: 4pt;
              border-bottom: 1.5pt solid #333333;
              padding-bottom: 2pt;
              text-transform: uppercase;
            }
            .title {
              font-size: 11pt;
              color: #333333;
              font-weight: 600;
              margin-bottom: 3pt;
            }
            .contact {
              font-size: 8.5pt;
              color: #333333;
              margin-bottom: 1pt;
              display: flex;
              justify-content: space-between;
            }
            .contact a {
              color: #000000;
              text-decoration: underline;
            }
            .summary {
              font-size: 9pt;
              color: #000000;
              line-height: 1.3;
              margin-top: 6pt;
              margin-bottom: 6pt;
              text-align: justify;
            }
            .section-spacing {
              margin-bottom: 6pt;
            }
            .job-title {
              font-size: 10pt;
              font-weight: bold;
              color: #000000;
              margin-top: 4pt;
            }
            .company {
              font-size: 9pt;
              color: #333333;
              font-weight: 600;
              margin-bottom: 1pt;
            }
            .duration {
              font-size: 8.5pt;
              color: #666666;
              font-style: italic;
              margin-bottom: 3pt;
            }
            .description {
              font-size: 9pt;
              color: #000000;
              line-height: 1.3;
              margin-bottom: 3pt;
            }
            .achievements-list {
              margin-left: 15pt;
              margin-top: 2pt;
              margin-bottom: 4pt;
            }
            .achievement {
              font-size: 8.5pt;
              color: #000000;
              line-height: 1.25;
              margin-bottom: 1.5pt;
              list-style-type: disc;
            }
            .degree {
              font-size: 10pt;
              font-weight: bold;
              color: #000000;
              margin-top: 4pt;
            }
            .institution {
              font-size: 9pt;
              color: #333333;
              font-weight: 600;
              margin-bottom: 1pt;
            }
            .year {
              font-size: 8.5pt;
              color: #666666;
              font-style: italic;
              margin-bottom: 4pt;
            }
            .skills-container {
              margin-top: 4pt;
              line-height: 2;
            }
            .skill {
              display: inline-block;
              font-size: 8.5pt;
              color: #000000;
              background-color: #F3F4F6;
              padding: 2pt 8pt;
              margin: 2pt 3pt;
              border-radius: 8pt;
              border: 0.5pt solid #D1D5DB;
            }
            .skill::after {
              content: '';
            }
            .skill:last-child::after {
              content: '';
            }
          </style>
        </head>
        <body>
          <!-- Header -->
          <h1>${resume.personalInfo.name}</h1>
          <div class="title">${resume.personalInfo.title}</div>
          <div class="contact">
            <span>✉ ${resume.personalInfo.email}</span>
            <span>☎ ${resume.personalInfo.phone}</span>
          </div>
          <div class="contact">
            <span>⌂ ${resume.personalInfo.location}</span>
            ${resume.personalInfo.website ? `<span>🌐 <a href="${resume.personalInfo.website}">${resume.personalInfo.website}</a></span>` : ''}
          </div>
          
          <!-- Summary -->
          <div class="summary">${resume.personalInfo.summary}</div>
          
          <!-- Experience -->
          <h2>Professional Experience</h2>
          ${resume.experience.map(exp => `
            <div class="section-spacing">
              <div class="job-title">${exp.position}</div>
              <div class="company">${exp.company} | ${exp.duration}</div>
              ${exp.description ? `<div class="description">${exp.description}</div>` : ''}
              ${exp.achievements && exp.achievements.length > 0 ? `
                <ul class="achievements-list">
                  ${exp.achievements.map(achievement => `
                    <li class="achievement">${achievement}</li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
          
          <!-- Education -->
          <h2>Education</h2>
          ${resume.education.map(edu => `
            <div class="section-spacing">
              <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''} | ${edu.year}</div>
              <div class="institution">${edu.institution}</div>
            </div>
          `).join('')}
          
          <!-- Projects -->
          ${resume.projects && resume.projects.length > 0 ? `
            <h2>Key Projects</h2>
            ${resume.projects.map(project => `
              <div class="section-spacing">
                <div class="job-title">${project.title}</div>
                <div class="description">${project.description}</div>
                ${project.technologies && project.technologies.length > 0 ? `
                  <div class="skills-container">
                    ${project.technologies.map(tech => `<span class="skill">${tech}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          ` : ''}
          
          <!-- Skills -->
          <h2>Technical Skills</h2>
          <div class="skills-container">
            ${resume.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        </body>
      </html>
    `;
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);

      // Generate HTML for the resume
      const html = generateResumeHTML(isEditMode ? customResume : defaultResume);

      // Create PDF
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });

      // Use sharing to let user save/share the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          UTI: '.pdf',
          mimeType: 'application/pdf',
          dialogTitle: 'Save or Share Resume'
        });
      } else {
        Alert.alert(
          'PDF Created',
          'Your resume PDF has been created. Please use a file manager app to access it.',
          [{ text: 'OK' }]
        );
      }

    } catch (error) {
      Alert.alert('Error', 'Failed to export PDF. Please try again.');
      console.error('PDF Export Error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isEditMode) {
    // View Mode - Display Default Resume
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Portfolio app by ABHISHEK" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card style={styles.section}>
            <Text style={styles.name}>{defaultResume.personalInfo.name}</Text>
            <Text style={styles.title}>{defaultResume.personalInfo.title}</Text>
            <Text style={styles.contact}>
              {defaultResume.personalInfo.email} • {defaultResume.personalInfo.phone}
            </Text>
            <Text style={styles.contact}>{defaultResume.personalInfo.location}</Text>
            <Text style={styles.summary}>{defaultResume.personalInfo.summary}</Text>
          </Card>

          {/* Experience */}
          <Text style={styles.sectionTitle}>Experience</Text>
          {defaultResume.experience.map((exp) => (
            <Card key={exp.id} style={styles.section}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.duration}>{exp.duration}</Text>
              <Text style={styles.description}>{exp.description}</Text>
              {exp.achievements.map((achievement, idx) => (
                <Text key={idx} style={styles.achievement}>• {achievement}</Text>
              ))}
            </Card>
          ))}

          {/* Education */}
          <Text style={styles.sectionTitle}>Education</Text>
          {defaultResume.education.map((edu) => (
            <Card key={edu.id} style={styles.section}>
              <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
              <Text style={styles.institution}>{edu.institution}</Text>
              <Text style={styles.year}>{edu.year}</Text>
            </Card>
          ))}

          {/* Skills */}
          <Text style={styles.sectionTitle}>Skills</Text>
          <Card style={styles.section}>
            <View style={styles.skillsContainer}>
              {defaultResume.skills.map((skill, idx) => (
                <View key={idx} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </Card>

          <Button
            title="Export as PDF"
            onPress={handleExportPDF}
            loading={isExporting}
            style={styles.exportButton}
          />

          <Button
            title="Build Custom Resume"
            onPress={handleToggleMode}
            variant="outline"
          />

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Edit Mode - Custom Resume Builder
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Build Your Resume" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Personal Information */}
        <Card style={styles.section}>
          <Text style={styles.formSectionTitle}>Personal Information</Text>
          <InputField
            label="Full Name"
            value={customResume.personalInfo.name}
            onChangeText={(text) => setCustomResume({
              ...customResume,
              personalInfo: { ...customResume.personalInfo, name: text }
            })}
            placeholder="Enter your full name"
          />
          <InputField
            label="Job Title / Designation"
            value={customResume.personalInfo.title}
            onChangeText={(text) => setCustomResume({
              ...customResume,
              personalInfo: { ...customResume.personalInfo, title: text }
            })}
            placeholder="e.g., Full Stack Developer"
          />
          <InputField
            label="Email"
            value={customResume.personalInfo.email}
            onChangeText={(text) => setCustomResume({
              ...customResume,
              personalInfo: { ...customResume.personalInfo, email: text }
            })}
            placeholder="your.email@example.com"
            keyboardType="email-address"
          />
          <InputField
            label="Contact Number"
            value={customResume.personalInfo.phone}
            onChangeText={(text) => setCustomResume({
              ...customResume,
              personalInfo: { ...customResume.personalInfo, phone: text }
            })}
            placeholder="+91 99999 99999"
            keyboardType="phone-pad"
          />
          <InputField
            label="Address / Location"
            value={customResume.personalInfo.location}
            onChangeText={(text) => setCustomResume({
              ...customResume,
              personalInfo: { ...customResume.personalInfo, location: text }
            })}
            placeholder="City, State, Country"
          />
          <InputField
            label="Website / LinkedIn URL"
            value={customResume.personalInfo.website || ''}
            onChangeText={(text) => setCustomResume({
              ...customResume,
              personalInfo: { ...customResume.personalInfo, website: text }
            })}
            placeholder="https://linkedin.com/in/yourprofile"
            keyboardType="url"
          />
          <InputField
            label="Professional Summary"
            value={customResume.personalInfo.summary}
            onChangeText={(text) => setCustomResume({
              ...customResume,
              personalInfo: { ...customResume.personalInfo, summary: text }
            })}
            placeholder="Brief summary of your experience and skills"
            multiline
            numberOfLines={4}
          />
        </Card>

        {/* Professional Experience */}
        <Card style={styles.section}>
          <Text style={styles.formSectionTitle}>Professional Experience</Text>
          {customResume.experience.map((exp, index) => (
            <ExperienceForm
              key={exp.id}
              experience={exp}
              onUpdate={(updated) => handleUpdateExperience(index, updated)}
              onRemove={() => handleRemoveExperience(index)}
              canRemove={customResume.experience.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddExperience}>
            <Text style={styles.addButtonText}>+ Add Experience</Text>
          </TouchableOpacity>
        </Card>

        {/* Education */}
        <Card style={styles.section}>
          <Text style={styles.formSectionTitle}>Education</Text>
          {customResume.education.map((edu, index) => (
            <EducationForm
              key={edu.id}
              education={edu}
              onUpdate={(updated) => handleUpdateEducation(index, updated)}
              onRemove={() => handleRemoveEducation(index)}
              canRemove={customResume.education.length > 1}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddEducation}>
            <Text style={styles.addButtonText}>+ Add Education</Text>
          </TouchableOpacity>
        </Card>

        {/* Projects */}
        <Card style={styles.section}>
          <Text style={styles.formSectionTitle}>Key Projects (Optional)</Text>
          {(customResume.projects || []).map((project, index) => (
            <ProjectForm
              key={project.id}
              project={project}
              onUpdate={(updated) => handleUpdateProject(index, updated)}
              onRemove={() => handleRemoveProject(index)}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
            <Text style={styles.addButtonText}>+ Add Project</Text>
          </TouchableOpacity>
        </Card>

        {/* Skills */}
        <Card style={styles.section}>
          <Text style={styles.formSectionTitle}>Technical Skills</Text>
          <SkillsManager
            skills={customResume.skills}
            onSkillsChange={(newSkills) => setCustomResume({ ...customResume, skills: newSkills })}
          />
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title="Export as PDF"
            onPress={handleExportPDF}
            loading={isExporting}
            style={styles.previewButton}
          />
          <Button
            title="Preview Resume"
            onPress={handleToggleMode}
            style={styles.previewButton}
          />
          <Button
            title="Cancel"
            variant="outline"
            onPress={handleToggleMode}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  name: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.blue,
    marginBottom: spacing.xs,
  },
  contact: {
    fontSize: typography.sizes.sm,
    color: colors.gray600,
    marginBottom: spacing.xs / 2,
  },
  summary: {
    fontSize: typography.sizes.base,
    color: colors.gray700,
    lineHeight: 22,
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  sectionTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.gray900,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  jobTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.gray900,
    marginBottom: spacing.xs / 2,
  },
  company: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.blue,
    marginBottom: spacing.xs / 2,
  },
  duration: {
    fontSize: typography.sizes.sm,
    color: colors.gray500,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.sizes.base,
    color: colors.gray700,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  achievement: {
    fontSize: typography.sizes.sm,
    color: colors.gray600,
    lineHeight: 20,
    marginBottom: spacing.xs / 2,
  },
  degree: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.gray900,
    marginBottom: spacing.xs / 2,
  },
  institution: {
    fontSize: typography.sizes.base,
    color: colors.blue,
    marginBottom: spacing.xs / 2,
  },
  year: {
    fontSize: typography.sizes.sm,
    color: colors.gray500,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  skillTag: {
    backgroundColor: colors.gray100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  skillText: {
    fontSize: typography.sizes.sm,
    color: colors.gray700,
    fontWeight: typography.weights.medium,
  },
  formSectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  addButton: {
    backgroundColor: colors.blue,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  addButtonText: {
    color: colors.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  exportButton: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  previewButton: {
    marginBottom: spacing.xs,
  },
  bottomPadding: {
    height: spacing.lg,
  },
});
