import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, StatusBar, View, useWindowDimensions } from 'react-native';
import { useCVContext } from '../context/CVContext';
import { RaqeemLogo } from '../components/RaqeemLogo';

interface IntroScreenProps {
  onFinish: () => void;
  isThemeReady: boolean;
}

export const IntroScreen = ({ onFinish, isThemeReady }: IntroScreenProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const { theme, isDarkMode } = useCVContext();

  const scale = useRef(new Animated.Value(0.92)).current;
  
  // Dual-opacity values: 
  // bgOpacity is strictly 1 (fully opaque) from frame 1 to perfectly hide cards underneath.
  // logoOpacity beautifully fades in the brand elements over the solid background.
  const bgOpacity = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Track if a minimum brand viewing duration has elapsed to ensure animation visibility
  const [minDurationElapsed, setMinDurationElapsed] = useState(false);

  useEffect(() => {
    // 1. Entrance spring animation for the logo
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Enforce 1.5 seconds minimum delay for a premium entry flow
    const timer = setTimeout(() => {
      setMinDurationElapsed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 2. Trigger exit transition: Entire screen view dissolves smoothly to reveal underlying app
    if (isThemeReady && minDurationElapsed) {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bgOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(onFinish);
    }
  }, [isThemeReady, minDurationElapsed]);

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.root, { backgroundColor: theme.background, opacity: bgOpacity }]} pointerEvents="none">
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background} 
      />
      <Animated.View
        style={[
          styles.container,
          { opacity: logoOpacity, transform: [{ scale }] },
        ]}
      >
        <RaqeemLogo 
          width={Math.min(screenWidth - 20, 320)} 
          height={220} 
          isDarkMode={isDarkMode} 
          layout="vertical"
        />
        {/* Dynamic Underline styled in beautiful matching iOS brand blue */}
        <View style={[styles.accentRule, { backgroundColor: theme.accent }]} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  accentRule: {
    height: 1.5,
    width: 32,
    marginTop: 16,
    opacity: 0.35,
  },
});
