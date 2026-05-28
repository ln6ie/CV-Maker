import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, getFontFamily } from '../constants/tokens';

interface GlassInputProps extends TextInputProps {
  label: string;
  isDarkMode: boolean;
  error?: string;
  isRTL?: boolean;
}

export const GlassInput = ({
  label,
  isDarkMode,
  error,
  isRTL = false,
  style,
  multiline,
  numberOfLines,
  ...props
}: GlassInputProps) => {
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;

  return (
    <View style={styles.container}>
      <Text style={[
        styles.label,
        { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 600) }
      ]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          multiline && styles.inputWrapperMultiline,
          {
            backgroundColor: theme.inputBackground,
            borderColor: error ? theme.error : isDarkMode ? theme.inputBorder : 'rgba(0,0,0,0.05)',
          },
        ]}
      >
        <TextInput
          placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            { color: theme.textBody, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) },
            style,
          ]}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          textAlignVertical={multiline ? 'top' : 'center'}
          {...props}
        />
      </View>
      {error && (
        <Text style={[
          styles.errorText,
          { color: theme.error, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) }
        ]}>
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
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputWrapperMultiline: {
    paddingVertical: SPACING.md,
    minHeight: 80,
  },
  input: {
    fontSize: TYPOGRAPHY.fontSize.md,
    padding: 0,
    lineHeight: 22,
  },
  inputMultiline: {
    minHeight: 60,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '500',
    marginTop: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
});
