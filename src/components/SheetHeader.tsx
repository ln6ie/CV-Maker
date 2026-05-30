import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily } from '../constants/tokens';

interface SheetHeaderProps {
  title: string;
  onClose: () => void;
  isRTL?: boolean;
  isDarkMode?: boolean;
  theme: { textPrimary: string; textSecondary: string; cardBackground?: string };
  showGrabber?: boolean;
  headerAction?: React.ReactNode;
}

export const SheetHeader = ({
  title,
  onClose,
  isRTL = false,
  isDarkMode = false,
  theme,
  showGrabber = true,
  headerAction,
}: SheetHeaderProps) => {
  // iOS 26 native close button is a 30pt circular glass pill with xmark icon
  // GlassicView provides the blur/glass background cross-platform
  const CLOSE_SIZE = 40;
  const ICON_SIZE = 20;

  return (
    <View style={styles.wrapper}>
      {/* iOS-style grabber indicator at the top center */}
      {showGrabber && (
        <View
          style={[
            styles.grabber,
            { backgroundColor: isDarkMode ? '#48484A' : '#C7C7CC' },
          ]}
        />
      )}

      {/* Header row: title centered, action + close at edges */}
      <View style={styles.headerRow}>
        <View style={{ width: CLOSE_SIZE + 12, alignItems: 'flex-start' }}>
          {headerAction}
        </View>

        <Text
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontFamily: getFontFamily(isRTL, 900),
            },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </Text>

        <View style={{ width: CLOSE_SIZE + 12, alignItems: 'flex-end' }}>
          <View style={{
            width: CLOSE_SIZE, height: CLOSE_SIZE, borderRadius: 9999,
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E5E5EA',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.65}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Close"
              accessibilityRole="button"
              style={styles.closeButtonInner}
            >
              <Ionicons
                name="close"
                size={ICON_SIZE}
                color={isDarkMode ? 'rgba(235,235,245,0.85)' : 'rgba(60,60,67,0.8)'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  grabber: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 16,
    // iOS 26: grabber is slightly more prominent
    opacity: 0.45,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 22,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  closeButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
