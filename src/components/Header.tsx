import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';
import { TranslationSet } from '../constants/translations';

interface HeaderProps {
  isDarkMode: boolean;
  onOpenSettings: () => void;
  theme: any;
  isRTL: boolean;
  t: TranslationSet;
}

export const Header = ({ isDarkMode, onOpenSettings, theme, isRTL, t }: HeaderProps) => {
  return (
    <View
      style={[
        styles.headerContainer,
        { flexDirection: isRTL ? 'row-reverse' : 'row' },
      ]}
    >
      <Text
        style={{
          color: theme.buttonBackground,
          fontSize: 22,
          fontWeight: '800',
          letterSpacing: -0.5,
        }}
      >
        {t.app.title}
      </Text>

      <TouchableOpacity
        onPress={onOpenSettings}
        activeOpacity={0.85}
        style={[
          styles.settingsButton,
          { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
        ]}
      >
        <Ionicons name="settings-outline" size={22} color={theme.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'android' ? SPACING.md : SPACING.sm,
    paddingBottom: SPACING.md,
  },
  settingsButton: {
    borderRadius: BORDER_RADIUS.full,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
