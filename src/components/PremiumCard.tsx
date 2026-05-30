import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';

interface PremiumCardProps {
  children: React.ReactNode;
  title?: string;
}

export const PremiumCard = ({ children, title }: PremiumCardProps) => {
  const { isDarkMode, isRTL, theme } = useCVContext();

  return (
    <View
      style={{
        borderRadius: 24,
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: title ? 20 : 24,
        backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.03)',
        ...Platform.select({
          android: { elevation: 3 },
          default: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDarkMode ? 0.3 : 0.04,
            shadowRadius: 12,
          },
        }),
      }}
    >
      {title && (
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: 20,
            fontWeight: '700',
            letterSpacing: -0.3,
            marginBottom: 20,
            textAlign: isRTL ? 'right' : 'left',
            fontFamily: getFontFamily(isRTL, 700),
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};
