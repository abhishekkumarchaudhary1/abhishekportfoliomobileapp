import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Project } from '../types';
import { InputField } from './InputField';
import { colors, typography, spacing, borderRadius } from '../theme';

interface ProjectFormProps {
    project: Project;
    onUpdate: (project: Project) => void;
    onRemove: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
    project,
    onUpdate,
    onRemove,
}) => {
    const [newTech, setNewTech] = useState('');

    const handleAddTechnology = () => {
        const trimmed = newTech.trim();
        if (trimmed && !project.technologies.includes(trimmed)) {
            onUpdate({
                ...project,
                technologies: [...project.technologies, trimmed],
            });
            setNewTech('');
        }
    };

    const handleRemoveTechnology = (tech: string) => {
        onUpdate({
            ...project,
            technologies: project.technologies.filter(t => t !== tech),
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Project Entry</Text>
                <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>

            <InputField
                label="Project Title"
                value={project.title}
                onChangeText={(text) => onUpdate({ ...project, title: text })}
                placeholder="e.g., E-commerce Platform"
            />

            <InputField
                label="Description"
                value={project.description}
                onChangeText={(text) => onUpdate({ ...project, description: text })}
                placeholder="Brief description of the project"
                multiline
                numberOfLines={3}
            />

            <Text style={styles.sectionLabel}>Technologies Used</Text>
            <View style={styles.techContainer}>
                {project.technologies.map((tech, index) => (
                    <View key={index} style={styles.techTag}>
                        <Text style={styles.techText}>{tech}</Text>
                        <TouchableOpacity
                            onPress={() => handleRemoveTechnology(tech)}
                            style={styles.techRemove}
                        >
                            <Text style={styles.techRemoveText}>×</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.techInputContainer}>
                <TextInput
                    style={styles.techInput}
                    value={newTech}
                    onChangeText={setNewTech}
                    placeholder="Add technology"
                    placeholderTextColor={colors.gray400}
                    onSubmitEditing={handleAddTechnology}
                />
                <TouchableOpacity
                    style={styles.addTechButton}
                    onPress={handleAddTechnology}
                    disabled={!newTech.trim()}
                >
                    <Text style={styles.addTechText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray50,
        padding: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.gray200,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.gray900,
    },
    removeButton: {
        backgroundColor: colors.red,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: 6,
    },
    removeButtonText: {
        color: colors.white,
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.semibold,
    },
    sectionLabel: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
        color: colors.gray700,
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
    },
    techContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    techTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray100,
        paddingLeft: spacing.md,
        paddingRight: spacing.xs,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.gray300,
    },
    techText: {
        fontSize: typography.sizes.sm,
        color: colors.gray700,
        fontWeight: typography.weights.medium,
        marginRight: spacing.xs,
    },
    techRemove: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.gray400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    techRemoveText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: typography.weights.bold,
        lineHeight: 18,
    },
    techInputContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: spacing.xs,
    },
    techInput: {
        flex: 1,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.sm + 4,
        paddingHorizontal: spacing.md,
        fontSize: typography.sizes.base,
        color: colors.gray900,
    },
    addTechButton: {
        backgroundColor: colors.blue,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTechText: {
        color: colors.white,
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
    },
});
