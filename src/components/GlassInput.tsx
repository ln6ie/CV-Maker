import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../constants/tokens';

interface GlassInputProps extends TextInputProps {
  label: string;
  isDarkMode: boolean;
  error?: string;
}

/**
 * Reusable Glassmorphism text input component.
 * Features modern semi-transparent blur card styling,
 * dynamic theme adaptability, and error highlight states.
 */
export const GlassInput = ({
  label,
  isDarkMode,
  error,
  style,
  ...props
}: GlassInputProps) => {
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error ? theme.error : theme.inputBorder,
          },
        ]}
      >
        <TextInput
          placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
          style={[
            styles.input,
            { color: theme.textBody },
            style,
          ]}
          {...props}
        />
      </View>
      {error && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    width: '100%',
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    paddingLeft: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.sans,
    padding: 0,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '500',
    marginTop: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
});
