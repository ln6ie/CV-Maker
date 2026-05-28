import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, StatusBar } from 'react-native';

interface SplashProps {
  onFinish: () => void;
}

export const Splash = ({ onFinish }: SplashProps) => {
  const scale = useRef(new Animated.Value(0.85)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
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
      ]),
      Animated.delay(2000),
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
      ]),
    ]).start(onFinish);
  }, []);

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
