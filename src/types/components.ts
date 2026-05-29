import { TextInputProps } from 'react-native';
import { ThemeColors } from './theme';

export interface GlassInputProps extends TextInputProps {
  label: string;
  isDarkMode: boolean;
  error?: string;
  isRTL?: boolean;
}

export interface SectionCardProps {
  title: string;
  theme: ThemeColors;
  children: React.ReactNode;
  isRTL?: boolean;
  isDarkMode?: boolean;
}

export interface ExportButtonProps {
  theme: ThemeColors;
  isRTL: boolean;
  t: any;
  exportStatus: 'idle' | 'generating' | 'completed';
  onPress: () => void;
  onReShare: () => void;
}

export interface SplashProps {
  onFinish: () => void;
  isThemeReady: boolean;
}

export interface LargeTextEditorSheetProps {
  visible: boolean;
  value: string;
  label: string;
  isDarkMode: boolean;
  isRTL: boolean;
  onSave: (val: string) => void;
  onClose: () => void;
  placeholder?: string;
}
