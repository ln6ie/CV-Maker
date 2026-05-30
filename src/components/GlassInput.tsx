import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, getFontFamily } from '../constants/tokens';
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
  inlineMultiline,
  noCard,
  tip,
  ...props
}: GlassInputProps) => {
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;
  const [editorVisible, setEditorVisible] = useState(false);
  const bgColor = isDarkMode ? '#1C1C1E' : '#FFFFFF';
  const borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)';

  const hintAlign = isRTL ? 'left' : 'right';

  const wrapper = (content: React.ReactNode) => {
    const input = noCard ? (
      content
    ) : (
      <View
        style={{
          borderRadius: multiline ? 14 : 9999,
          backgroundColor: bgColor,
          borderColor: error ? theme.error : borderColor,
          borderWidth: error ? 1 : 0.5,
          paddingHorizontal: SPACING.md,
          paddingVertical: 6,
        }}
      >
        {content}
      </View>
    );

    return (
      <View>
        {input}

        {!noCard && placeholder && (
          <Text
            style={[
              styles.hint,
              {
                color: theme.placeholderText,
                textAlign: hintAlign,
                fontFamily: getFontFamily(isRTL, 400),
              },
            ]}
          >
            {placeholder}
          </Text>
        )}

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

        {tip && !value && !error && (
          <View style={[styles.errorRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Ionicons name="bulb-outline" size={12} color={theme.placeholderText} />
            <Text style={{
              fontSize: 10,
              color: theme.placeholderText,
              textAlign: isRTL ? 'right' : 'left',
              fontFamily: getFontFamily(isRTL, 400),
              flexShrink: 1,
            }}>
              {tip}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // ── Tap-to-expand multiline (sheet editor) ─────────────────────
  if (multiline && !inlineMultiline) {
    return wrapper(
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setEditorVisible(true)}
          style={styles.previewArea}
        >
          {!value && (
            <Text
              style={{
                color: isDarkMode ? '#636366' : '#C7C7CC',
                fontSize: TYPOGRAPHY.fontSize.md,
                fontFamily: getFontFamily(isRTL, 400),
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {label}
            </Text>
          )}
          {value && (
            <Text
              numberOfLines={3}
              style={{
                color: theme.textBody,
                fontSize: TYPOGRAPHY.fontSize.md,
                lineHeight: 22,
                fontFamily: getFontFamily(isRTL, 400),
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {value}
            </Text>
          )}
        </TouchableOpacity>

        <LargeTextEditorSheet
          visible={editorVisible}
          onClose={() => setEditorVisible(false)}
          label={label}
          value={value}
          placeholder={placeholder}
          onSave={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
        />
      </>
    );
  }

  // ── Inline multiline (TextInput rendered directly) ──────────────
  if (multiline && inlineMultiline) {
    return wrapper(
      <View>
        <TextInput
          multiline
          numberOfLines={numberOfLines || 8}
          placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          textAlignVertical="top"
          style={[
            styles.inputArea,
            {
              backgroundColor: 'transparent',
              color: theme.textBody,
              textAlign: isRTL ? 'right' : 'left',
              fontFamily: getFontFamily(isRTL, 400),
            },
            style,
          ]}
          {...props}
        />
      </View>
    );
  }

  // ── Single-line field ───────────────────────────────────────────
  return wrapper(
    <TextInput
      placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
      textAlignVertical="center"
      style={[
        styles.inputArea,
        {
          backgroundColor: 'transparent',
          color: theme.textBody,
          textAlign: isRTL ? 'right' : 'left',
          fontFamily: getFontFamily(isRTL, 400),
        },
        style,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={label}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  inputArea: {
    fontSize: TYPOGRAPHY.fontSize.md,
    padding: 0,
    paddingVertical: 10,
    lineHeight: 22,
  },
  previewArea: {
    minHeight: 60,
    paddingVertical: 10,
  },
  hint: {
    fontSize: 10,
    marginTop: 2,
    paddingHorizontal: 2,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    paddingLeft: 2,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '500',
    flexShrink: 1,
  },
});
