import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../constants/tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 80;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface ExportButtonProps {
  theme: any;
  isRTL: boolean;
  t: any;
  exportStatus: 'idle' | 'generating' | 'completed';
  onPress: () => void;
  onReShare: () => void;
}

export const ExportButton = ({ theme, isRTL, t, exportStatus, onPress, onReShare }: ExportButtonProps) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (exportStatus === 'generating') {
      progress.setValue(0);
      setDisplay(0);
      Animated.timing(progress, {
        toValue: 100,
        duration: 800,
        useNativeDriver: false,
      }).start();
      const id = progress.addListener(({ value }) => setDisplay(Math.round(value)));
      return () => progress.removeListener(id);
    }
  }, [exportStatus]);

  const offset = progress.interpolate({
    inputRange: [0, 100],
    outputRange: [CIRCUMFERENCE, 0],
  });

  if (exportStatus === 'idle') {
    return (
      <TouchableOpacity
        style={[styles.pill, { backgroundColor: theme.buttonBackground }]}
        activeOpacity={0.85}
        onPress={onPress}
      >
        <Ionicons
          name="share-outline"
          size={18}
          color="#FFFFFF"
          style={{ marginRight: isRTL ? 0 : SPACING.sm, marginLeft: isRTL ? SPACING.sm : 0 }}
        />
        <Text style={styles.pillText}>{t.buttons.export}</Text>
      </TouchableOpacity>
    );
  }

  if (exportStatus === 'generating') {
    return (
      <View style={styles.ringWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke="rgba(255,255,255,0.15)" strokeWidth={STROKE} fill="none" />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={theme.accent}
            strokeWidth={STROKE}
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90, ${SIZE / 2}, ${SIZE / 2})`}
          />
        </Svg>
        <View style={styles.labelWrap}>
          <Text style={[styles.percent, { color: theme.buttonText }]}>{display}%</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.pill, { backgroundColor: theme.success }]}
      activeOpacity={0.85}
      onPress={onReShare}
    >
      <Ionicons
        name="checkmark-circle"
        size={18}
        color="#FFFFFF"
        style={{ marginRight: isRTL ? 0 : SPACING.sm, marginLeft: isRTL ? SPACING.sm : 0 }}
      />
      <Text style={styles.pillText}>{t.buttons.shareAgain}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  ringWrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: SPACING.md,
  },
  labelWrap: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontSize: 18,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
