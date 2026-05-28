import { Platform, PlatformColor, ColorValue } from 'react-native';

const system = (iosName: string, fallback: string): ColorValue =>
  Platform.select<ColorValue>({
    ios: PlatformColor(iosName),
    default: fallback as ColorValue,
  })!;

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
      background: system('systemGroupedBackground', '#F2F2F7'),
      cardBackground: system('secondarySystemGroupedBackground', '#FFFFFF'),
      cardBorder: system('separator', 'rgba(60, 60, 67, 0.18)'),
      textPrimary: system('label', '#000000'),
      textSecondary: system('secondaryLabel', '#3C3C43'),
      textBody: system('label', '#000000'),
      placeholderText: system('placeholderText', '#C7C7CC'),
      inputBackground: system('systemGray6', '#E5E5EA'),
      inputBorder: system('separator', 'rgba(60, 60, 67, 0.18)'),
      buttonBackground: system('systemBlue', '#007AFF'),
      buttonText: '#FFFFFF',
      accent: system('systemBlue', '#007AFF'),
      shadow: 'rgba(0, 0, 0, 0.05)',
      error: system('systemRed', '#FF3B30'),
      success: system('systemGreen', '#34C759'),
      borderMuted: system('separator', '#C6C6C8'),
    },
    dark: {
      background: '#000000',
      cardBackground: '#1C1C1E',
      cardBorder: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#FFFFFF',
      textSecondary: '#EBEBF5',
      textBody: '#FFFFFF',
      placeholderText: '#636366',
      inputBackground: '#1C1C1E',
      inputBorder: 'rgba(255, 255, 255, 0.1)',
      buttonBackground: '#0A84FF',
      buttonText: '#FFFFFF',
      accent: '#0A84FF',
      shadow: 'rgba(0, 0, 0, 0.3)',
      error: '#FF453A',
      success: '#30D158',
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
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'System',
    arabic: 'Cairo',
    arabicBold: 'Cairo-Bold',
    arabicBlack: 'Cairo-Black',
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

export const getFontFamily = (isRTL: boolean, weight: string | number = '400'): string => {
  if (!isRTL) return 'System';
  const w = typeof weight === 'string' ? parseInt(weight, 10) || 400 : weight;
  if (w >= 800) return TYPOGRAPHY.fontFamily.arabicBlack;
  if (w >= 600) return TYPOGRAPHY.fontFamily.arabicBold;
  return TYPOGRAPHY.fontFamily.arabic;
};
