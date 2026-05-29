import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, StatusBar } from 'react-native';
import { SplashProps } from '../types/components';

export const Splash = ({ onFinish, isThemeReady }: SplashProps) => {
  const scale = useRef(new Animated.Value(0.85)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  
  // Track animation completion state to synchronize with theme load
  const [introAnimationDone, setIntroAnimationDone] = useState(false);

  useEffect(() => {
    // 1. Trigger the intro scale and opacity animation
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIntroAnimationDone(true);
    });
  }, []);

  // 2. Once the intro animation finishes AND the theme is loaded, trigger exit transition
  useEffect(() => {
    if (introAnimationDone && isThemeReady) {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeOut, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(onFinish);
    }
  }, [introAnimationDone, isThemeReady]);

  return (
    <Animated.View style={[styles.root, { opacity: fadeOut }]}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeIn, transform: [{ scale }] },
        ]}
      >
        <Text style={styles.logo}>Raqeem</Text>
        <Text style={styles.sub}>Professional CV Builder</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    color: '#007AFF',
    fontSize: 56,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  sub: {
    color: '#8E8E93',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 20,
  },
});
