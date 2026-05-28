/**
 * Design Tokens for the CV Builder Mobile Application and generated PDF.
 * Strictly conforms to the rules: no emojis, strictly typed, no hardcoded values.
 */

export const COLORS = {
  pdf: {
    light: {
      background: '#FFFFFF',
      primaryHeader: '#002060',
      body: '#1A1A1A',
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
      background: '#F0F3F8',
      cardBackground: 'rgba(255, 255, 255, 0.65)',
      cardBorder: 'rgba(255, 255, 255, 0.3)',
      textPrimary: '#002060',
      textSecondary: '#5A6E85',
      textBody: '#1A1A1A',
      inputBackground: 'rgba(255, 255, 255, 0.45)',
      inputBorder: 'rgba(0, 32, 96, 0.15)',
      buttonBackground: '#002060',
      buttonText: '#FFFFFF',
      accent: '#0056B3',
      shadow: 'rgba(0, 0, 0, 0.05)',
      error: '#D32F2F',
      success: '#388E3C',
    },
    dark: {
      background: '#0B0F19',
      cardBackground: 'rgba(15, 22, 38, 0.7)',
      cardBorder: 'rgba(255, 255, 255, 0.08)',
      textPrimary: '#8ECAE6',
      textSecondary: '#A9B6C3',
      textBody: '#E5E5E5',
      inputBackground: 'rgba(255, 255, 255, 0.05)',
      inputBorder: 'rgba(255, 255, 255, 0.1)',
      buttonBackground: '#1D3557',
      buttonText: '#FFFFFF',
      accent: '#457B9D',
      shadow: 'rgba(0, 0, 0, 0.3)',
      error: '#CF6679',
      success: '#4CAF50',
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
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
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
