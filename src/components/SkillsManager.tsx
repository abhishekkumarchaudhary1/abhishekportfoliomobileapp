import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface SkillsManagerProps {
    skills: string[];
    onSkillsChange: (skills: string[]) => void;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({ skills, onSkillsChange }) => {
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        const trimmedSkill = newSkill.trim();
        if (trimmedSkill && !skills.includes(trimmedSkill)) {
            onSkillsChange([...skills, trimmedSkill]);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        onSkillsChange(skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <View style={styles.container}>
            <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                        <Text style={styles.skillText}>{skill}</Text>
                        <TouchableOpacity
                            onPress={() => handleRemoveSkill(skill)}
                            style={styles.removeButton}
                        >
                            <Text style={styles.removeButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newSkill}
                    onChangeText={setNewSkill}
                    placeholder="Add a skill (e.g., React, Node.js)"
                    placeholderTextColor={colors.gray400}
                    onSubmitEditing={handleAddSkill}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddSkill}
                    disabled={!newSkill.trim()}
                >
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: spacing.sm,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginBottom: spacing.md,
    },
    skillTag: {
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
    skillText: {
        fontSize: typography.sizes.sm,
        color: colors.gray700,
        fontWeight: typography.weights.medium,
        marginRight: spacing.xs,
    },
    removeButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.gray400,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: typography.weights.bold,
        lineHeight: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    input: {
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
    addButton: {
        backgroundColor: colors.blue,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        color: colors.white,
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
    },
});
