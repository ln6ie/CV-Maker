import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, getFontFamily } from '../constants/tokens';
import { LargeTextEditorSheet } from './LargeTextEditorSheet';
import { GlassInputProps } from '../types/components';

export const GlassInput = ({
  label,
  isDarkMode,
  error,
  isRTL = false,
  style,
  multiline,
  numberOfLines,
  value = '',
  onChangeText,
  placeholder,
  ...props
}: GlassInputProps) => {
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;
  const [editorVisible, setEditorVisible] = useState(false);

  if (multiline) {
    return (
      <View style={styles.container}>
        <Text style={[
          styles.label,
          { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 600) }
        ]}>
          {label}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setEditorVisible(true)}
          style={[
            styles.inputWrapper,
            styles.inputWrapperMultiline,
            {
              backgroundColor: theme.inputBackground,
              borderColor: error ? theme.error : isDarkMode ? theme.inputBorder : 'rgba(0,0,0,0.05)',
              alignItems: 'stretch',
            },
          ]}
        >
          <Text
            numberOfLines={4}
            style={{
              color: value ? theme.textBody : (isDarkMode ? '#636366' : '#C7C7CC'),
              fontSize: TYPOGRAPHY.fontSize.md,
              lineHeight: 22,
              fontFamily: getFontFamily(isRTL, 400),
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            {value || placeholder || label}
          </Text>

          {/* iOS Expand Indicator Icon */}
          <Ionicons
            name="expand-outline"
            size={14}
            color={theme.textSecondary}
            style={{ position: 'absolute', bottom: 8, right: isRTL ? undefined : 12, left: isRTL ? 12 : undefined }}
          />
        </TouchableOpacity>

        {error && (
          <View style={[styles.errorRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Ionicons name="alert-circle" size={14} color={theme.error} />
            <Text style={[
              styles.errorText,
              { color: theme.error, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) }
            ]}>
              {error}
            </Text>
          </View>
        )}

        <LargeTextEditorSheet
          visible={editorVisible}
          onClose={() => setEditorVisible(false)}
          label={label}
          value={value}
          placeholder={placeholder}
          isDarkMode={isDarkMode}
          isRTL={isRTL}
          onSave={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
        />
      </View>
    );
  }

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
            { color: theme.textBody, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) },
            style,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...props}
        />
      </View>
      {error && (
        <View style={[styles.errorRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Ionicons name="alert-circle" size={14} color={theme.error} />
          <Text style={[
            styles.errorText,
            { color: theme.error, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) }
          ]}>
            {error}
          </Text>
        </View>
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
  errorRow: {
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '500',
    flexShrink: 1,
  },
});
