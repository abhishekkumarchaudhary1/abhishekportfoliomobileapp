import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface InputFieldProps extends TextInputProps {
    label: string;
    error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    ...textInputProps
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor={colors.gray400}
                {...textInputProps}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
        color: colors.gray700,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray300,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.sm + 4,
        paddingHorizontal: spacing.md,
        fontSize: typography.sizes.base,
        color: colors.gray900,
    },
    inputError: {
        borderColor: colors.red,
    },
    errorText: {
        fontSize: typography.sizes.xs,
        color: colors.red,
        marginTop: spacing.xs,
    },
});
