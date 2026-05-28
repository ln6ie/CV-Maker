import { Platform, PlatformColor, ColorValue } from 'react-native';

/**
 * Helper to dynamically fetch UIKit system colors on iOS,
 * with pixel-perfect design system fallbacks for Android/Web.
 */
const getNativeColor = (iosName: string, fallback: string): ColorValue => {
  return Platform.select({
    ios: PlatformColor(iosName),
    default: fallback as any,
  }) as ColorValue;
};

/**
 * Global Design Tokens for the CV Builder Application.
 * Locked to iOS specifications and absolute solid parameters.
 */
export const COLORS = {
  pdf: {
    light: {
      background: '#FFFFFF',
      primaryHeader: '#002060',
      body: '#000000',
      border: '#000000',
    },
    dark: {
      background: '#000000',
      primaryHeader: '#1D3557',
      body: '#E5E5E5',
      border: '#333333',
    },
  },
  app: {
    light: {
      background: '#F2F2F7',
      cardBackground: 'rgba(255, 255, 255, 0.75)',
      cardBorder: 'rgba(0, 0, 0, 0.1)',
      textPrimary: '#002060',
      textSecondary: '#3A3A3C',
      textBody: '#000000',
      inputBackground: 'rgba(255, 255, 255, 0.85)',
      inputBorder: 'rgba(0, 32, 96, 0.15)',
      buttonBackground: '#002060',
      buttonText: '#FFFFFF',
      accent: '#0055A5',
      shadow: 'rgba(0, 0, 0, 0.05)',
      error: '#EF4444',
      success: '#10B981',
      borderMuted: '#D1D1D6',
    },
    dark: {
      background: '#000000', // Pure OLED Black Background
      cardBackground: 'rgba(28, 28, 30, 0.8)',
      cardBorder: 'rgba(255, 255, 255, 0.1)', // Subtle glass element lines
      textPrimary: '#8ECAE6',
      textSecondary: '#AEAEB2',
      textBody: '#E5E5E5',
      inputBackground: 'rgba(44, 44, 46, 0.7)',
      inputBorder: 'rgba(255, 255, 255, 0.1)',
      buttonBackground: '#1D3557',
      buttonText: '#FFFFFF',
      accent: '#3B82F6',
      shadow: 'rgba(0, 0, 0, 0.3)',
      error: '#EF4444',
      success: '#10B981',
      borderMuted: '#38383A',
    },
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 16,
  lg: 24, // Pill curves
  xl: 32, // Native pill actions
  full: 9999,
};

export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    heading: 28,
  },
};
