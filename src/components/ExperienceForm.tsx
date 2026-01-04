import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Experience } from '../types';
import { InputField } from './InputField';
import { colors, typography, spacing } from '../theme';

interface ExperienceFormProps {
    experience: Experience;
    onUpdate: (experience: Experience) => void;
    onRemove: () => void;
    canRemove: boolean;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
    experience,
    onUpdate,
    onRemove,
    canRemove,
}) => {
    const [newAchievement, setNewAchievement] = useState('');

    const handleAddAchievement = () => {
        const trimmed = newAchievement.trim();
        if (trimmed) {
            onUpdate({
                ...experience,
                achievements: [...experience.achievements, trimmed],
            });
            setNewAchievement('');
        }
    };

    const handleRemoveAchievement = (index: number) => {
        onUpdate({
            ...experience,
            achievements: experience.achievements.filter((_, i) => i !== index),
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Experience Entry</Text>
                {canRemove && (
                    <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                )}
            </View>

            <InputField
                label="Position/Job Title"
                value={experience.position}
                onChangeText={(text) => onUpdate({ ...experience, position: text })}
                placeholder="e.g., Senior Software Developer"
            />

            <InputField
                label="Company"
                value={experience.company}
                onChangeText={(text) => onUpdate({ ...experience, company: text })}
                placeholder="e.g., ABC Tech Solutions"
            />

            <InputField
                label="Duration"
                value={experience.duration}
                onChangeText={(text) => onUpdate({ ...experience, duration: text })}
                placeholder="e.g., Jan 2020 - Present"
            />

            <InputField
                label="Description"
                value={experience.description}
                onChangeText={(text) => onUpdate({ ...experience, description: text })}
                placeholder="Brief description of your role"
                multiline
                numberOfLines={3}
            />

            <Text style={styles.sectionLabel}>Key Achievements/Responsibilities</Text>
            {experience.achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementRow}>
                    <Text style={styles.achievementText}>• {achievement}</Text>
                    <TouchableOpacity
                        onPress={() => handleRemoveAchievement(index)}
                        style={styles.achievementRemove}
                    >
                        <Text style={styles.achievementRemoveText}>×</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <View style={styles.achievementInput}>
                <InputField
                    label="Add Achievement"
                    value={newAchievement}
                    onChangeText={setNewAchievement}
                    placeholder="Describe an achievement or responsibility"
                    multiline
                    numberOfLines={2}
                />
                <TouchableOpacity
                    style={styles.addAchievementButton}
                    onPress={handleAddAchievement}
                    disabled={!newAchievement.trim()}
                >
                    <Text style={styles.addAchievementText}>+ Add Achievement</Text>
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
    achievementRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: colors.white,
        padding: spacing.sm,
        borderRadius: 6,
        marginBottom: spacing.xs,
    },
    achievementText: {
        flex: 1,
        fontSize: typography.sizes.sm,
        color: colors.gray700,
        lineHeight: 20,
    },
    achievementRemove: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.gray400,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.xs,
    },
    achievementRemoveText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: typography.weights.bold,
        lineHeight: 18,
    },
    achievementInput: {
        marginTop: spacing.sm,
    },
    addAchievementButton: {
        backgroundColor: colors.blue,
        padding: spacing.sm,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    addAchievementText: {
        color: colors.white,
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.semibold,
    },
});
