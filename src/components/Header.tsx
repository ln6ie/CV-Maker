import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';
import { TranslationSet } from '../constants/translations';
import { RaqeemLogo } from './RaqeemLogo';
import { GlassicView } from './Glassic';

interface HeaderProps {
  isDarkMode: boolean;
  onOpenSettings: () => void;
  onOpenAIPrompt: () => void;
  onOpenCVManager: () => void;
  onLoadSample: () => void;
  theme: any;
  isRTL: boolean;
  t: TranslationSet;
  activeStep: number;
}

export const Header = ({ isDarkMode, onOpenSettings, onOpenAIPrompt, onOpenCVManager, onLoadSample, theme, isRTL, t, activeStep }: HeaderProps) => {
  return (
    <GlassicView
      cornerRadius={24}
      glassEffectStyle="regular"
      isDarkMode={isDarkMode}
      style={{
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1000,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <View style={{ paddingTop: 56, paddingHorizontal: 0, paddingBottom: 12 }}>
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <RaqeemLogo width={60} height={40} layout="iconOnly" isDarkMode={isDarkMode} isRTL={isRTL} />

          <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: SPACING.sm, alignItems: 'center', marginRight: isRTL ? 0 : 12, marginLeft: isRTL ? 12 : 0 }}>
            <TouchableOpacity
              onPress={onOpenCVManager}
              activeOpacity={0.85}
              style={[
                styles.headerButton,
                { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
              ]}
            >
              <Ionicons name="folder-outline" size={18} color={theme.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onLoadSample}
              activeOpacity={0.85}
              style={[
                styles.headerButton,
                { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
              ]}
            >
              <Ionicons name="flask-outline" size={18} color={theme.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onOpenAIPrompt}
              activeOpacity={0.85}
              style={[
                styles.headerButton,
                { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
              ]}
            >
              <Ionicons name="sparkles" size={18} color={theme.accent} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onOpenSettings}
              activeOpacity={0.85}
              style={[
                styles.headerButton,
                { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
              ]}
            >
              <Ionicons name="settings-outline" size={18} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stepper */}
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 4, paddingHorizontal: 12 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 4,
                backgroundColor: i <= activeStep ? theme.accent : (isDarkMode ? '#2C2C2E' : '#E5E5EA'),
              }}
            />
          ))}
        </View>
      </View>
    </GlassicView>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    borderRadius: BORDER_RADIUS.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
