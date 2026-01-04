import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
}) => {
    const getButtonStyle = (): ViewStyle => {
        if (disabled) {
            return styles.buttonDisabled;
        }

        switch (variant) {
            case 'primary':
                return styles.buttonPrimary;
            case 'secondary':
                return styles.buttonSecondary;
            case 'outline':
                return styles.buttonOutline;
            default:
                return styles.buttonPrimary;
        }
    };

    const getTextStyle = (): TextStyle => {
        switch (variant) {
            case 'primary':
                return styles.textPrimary;
            case 'secondary':
                return styles.textSecondary;
            case 'outline':
                return styles.textOutline;
            default:
                return styles.textPrimary;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? colors.white : colors.blue} />
            ) : (
                <Text style={[styles.text, getTextStyle()]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    buttonPrimary: {
        backgroundColor: colors.blue,
    },
    buttonSecondary: {
        backgroundColor: colors.red,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.blue,
    },
    buttonDisabled: {
        backgroundColor: colors.gray300,
    },
    text: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
    },
    textPrimary: {
        color: colors.white,
    },
    textSecondary: {
        color: colors.white,
    },
    textOutline: {
        color: colors.blue,
    },
});
