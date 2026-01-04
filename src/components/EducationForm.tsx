import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Education } from '../types';
import { InputField } from './InputField';
import { colors, typography, spacing } from '../theme';

interface EducationFormProps {
    education: Education;
    onUpdate: (education: Education) => void;
    onRemove: () => void;
    canRemove: boolean;
}

export const EducationForm: React.FC<EducationFormProps> = ({
    education,
    onUpdate,
    onRemove,
    canRemove,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Education Entry</Text>
                {canRemove && (
                    <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                )}
            </View>

            <InputField
                label="Degree"
                value={education.degree}
                onChangeText={(text) => onUpdate({ ...education, degree: text })}
                placeholder="e.g., Bachelor of Science"
            />

            <InputField
                label="Field of Study"
                value={education.field}
                onChangeText={(text) => onUpdate({ ...education, field: text })}
                placeholder="e.g., Computer Science"
            />

            <InputField
                label="Institution"
                value={education.institution}
                onChangeText={(text) => onUpdate({ ...education, institution: text })}
                placeholder="e.g., ABC University"
            />

            <InputField
                label="Year"
                value={education.year}
                onChangeText={(text) => onUpdate({ ...education, year: text })}
                placeholder="e.g., 2018-2022"
            />
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
});
