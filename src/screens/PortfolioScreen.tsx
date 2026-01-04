import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Card } from '../components';
import { colors, typography, spacing } from '../theme';
import { defaultPortfolio } from '../data/defaultData';
import basicInfo from '../../assets/basicInfo.json';

export const PortfolioScreen: React.FC = () => {
    const { name, title, bio, email, phone, location, github, linkedin, website, projects, skills } = defaultPortfolio;

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Portfolio" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <Card style={styles.section}>
                    {/* Profile Image */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: basicInfo.personalInfo.profileImage }}
                            style={styles.profileImage}
                        />
                    </View>

                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.jobTitle}>{title}</Text>
                    <Text style={styles.bio}>{bio}</Text>

                    <View style={styles.contactContainer}>
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
                            <Text style={styles.contactItem}>📧 {email}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
                            <Text style={styles.contactItem}>📱 {phone}</Text>
                        </TouchableOpacity>

                        <Text style={styles.contactItem}>📍 {location}</Text>

                        {website && (
                            <TouchableOpacity onPress={() => Linking.openURL(website)}>
                                <Text style={styles.contactItem}>🌐 {website}</Text>
                            </TouchableOpacity>
                        )}

                        {github && (
                            <TouchableOpacity onPress={() => Linking.openURL(github)}>
                                <Text style={styles.contactItem}>🔗 {github}</Text>
                            </TouchableOpacity>
                        )}

                        {linkedin && (
                            <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
                                <Text style={styles.contactItem}>💼 {linkedin}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Card>

                {/* Projects Section */}
                <Text style={styles.sectionTitle}>Projects</Text>
                {projects.map((project) => (
                    <Card key={project.id} style={styles.projectCard}>
                        <Text style={styles.projectTitle}>{project.title}</Text>
                        <Text style={styles.projectDescription}>{project.description}</Text>
                        <View style={styles.techContainer}>
                            {project.technologies.map((tech, index) => (
                                <View key={index} style={styles.techTag}>
                                    <Text style={styles.techText}>{tech}</Text>
                                </View>
                            ))}
                        </View>
                        {project.link && project.link !== '#' && (
                            <TouchableOpacity
                                style={styles.goLiveButton}
                                onPress={() => Linking.openURL(project.link!)}
                            >
                                <Text style={styles.goLiveText}>Go Live 🚀</Text>
                            </TouchableOpacity>
                        )}
                    </Card>
                ))}

                {/* Skills Section */}
                <Text style={styles.sectionTitle}>Skills</Text>
                <Card style={styles.section}>
                    <View style={styles.skillsContainer}>
                        {skills.map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                                <Text style={styles.skillText}>{skill.name}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

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
    imageContainer: {
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: colors.blue,
    },
    name: {
        fontSize: typography.sizes['3xl'],
        fontWeight: typography.weights.bold,
        color: colors.gray900,
        marginBottom: spacing.xs,
    },
    jobTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.medium,
        color: colors.blue,
        marginBottom: spacing.md,
    },
    bio: {
        fontSize: typography.sizes.base,
        color: colors.gray600,
        lineHeight: 24,
        marginBottom: spacing.md,
    },
    contactContainer: {
        borderTopWidth: 1,
        borderTopColor: colors.gray200,
        paddingTop: spacing.md,
    },
    contactItem: {
        fontSize: typography.sizes.sm,
        color: colors.gray700,
        marginBottom: spacing.xs,
    },
    sectionTitle: {
        fontSize: typography.sizes['2xl'],
        fontWeight: typography.weights.bold,
        color: colors.gray900,
        marginTop: spacing.md,
        marginBottom: spacing.md,
    },
    projectCard: {
        marginBottom: spacing.md,
    },
    projectTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.gray900,
        marginBottom: spacing.xs,
    },
    projectDescription: {
        fontSize: typography.sizes.base,
        color: colors.gray600,
        lineHeight: 22,
        marginBottom: spacing.md,
    },
    techContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
    },
    techTag: {
        backgroundColor: colors.blue,
        paddingHorizontal: spacing.sm + 4,
        paddingVertical: spacing.xs,
        borderRadius: 16,
    },
    techText: {
        fontSize: typography.sizes.xs,
        color: colors.white,
        fontWeight: typography.weights.medium,
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
    bottomPadding: {
        height: spacing.lg,
    },
    goLiveButton: {
        marginTop: spacing.md,
        backgroundColor: colors.gray100,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: colors.gray300,
    },
    goLiveText: {
        color: colors.blue,
        fontWeight: typography.weights.semibold,
        fontSize: typography.sizes.sm,
    },
});
