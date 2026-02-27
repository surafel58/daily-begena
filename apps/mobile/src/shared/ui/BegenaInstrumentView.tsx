import { useState, useCallback } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  AnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import { colors, spacing, typography } from './theme';

const TOTAL_STRINGS = 10;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// The 5 main beginner strings
const MAIN_STRINGS = [1, 4, 6, 8, 10];

function isMainString(n: number) {
  return MAIN_STRINGS.includes(n);
}

// Pluck flash on a string
function PluckFlash({
  flash,
  isMain,
}: {
  flash: SharedValue<number>;
  isMain: boolean;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: flash.value,
  }));

  if (!isMain) return null;

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.goldBright, borderRadius: 2 }, animatedStyle]}
      pointerEvents="none"
    />
  );
}

interface BegenaInstrumentViewProps {
  activeStrings: number[];
  currentString: number | null;
  tunedStrings: number[];
  statusColor: string;
  orbAnimatedStyle: AnimatedStyle;
  onStringPress: (stringNum: number) => void;
}

export function BegenaInstrumentView({
  activeStrings,
  currentString,
  tunedStrings,
  statusColor,
  orbAnimatedStyle,
  onStringPress,
}: BegenaInstrumentViewProps) {
  const flash0 = useSharedValue(0);
  const flash1 = useSharedValue(0);
  const flash2 = useSharedValue(0);
  const flash3 = useSharedValue(0);
  const flash4 = useSharedValue(0);
  const pluckFlashes = [flash0, flash1, flash2, flash3, flash4];

  const handleStringPress = useCallback(
    (stringNum: number) => {
      const activeIndex = activeStrings.indexOf(stringNum);
      if (activeIndex >= 0 && activeIndex < pluckFlashes.length) {
        pluckFlashes[activeIndex].value = withSequence(
          withTiming(0.4, { duration: 60 }),
          withTiming(0, { duration: 300 }),
        );
      }
      onStringPress(stringNum);
    },
    [onStringPress, activeStrings, pluckFlashes],
  );

  return (
    <View style={styles.root}>
      {Array.from({ length: TOTAL_STRINGS }, (_, i) => {
        const stringNum = i + 1;
        const main = isMainString(stringNum);
        const isCurrent = stringNum === currentString;
        const isTuned = tunedStrings.includes(stringNum);
        const isActive = activeStrings.includes(stringNum);
        const activeIndex = activeStrings.indexOf(stringNum);

        return (
          <Pressable
            key={stringNum}
            style={[
              styles.stringColumn,
              main && styles.mainStringColumn,
            ]}
            onPress={() => main && handleStringPress(stringNum)}
            disabled={!main}
          >
            {/* The string line */}
            <View
              style={[
                styles.stringLine,
                {
                  width: main ? 3 : 1,
                  backgroundColor: isTuned
                    ? colors.success
                    : isCurrent
                      ? colors.goldBright
                      : main
                        ? colors.goldMuted
                        : colors.stringInactive,
                },
                isCurrent && styles.currentGlow,
              ]}
            >
              {/* Pluck flash overlay */}
              {main && activeIndex >= 0 && activeIndex < pluckFlashes.length && (
                <PluckFlash flash={pluckFlashes[activeIndex]} isMain={main} />
              )}
            </View>

            {/* Number label on the string (main strings only) */}
            {main && (
              <View
                style={[
                  styles.numberBadge,
                  isCurrent && styles.numberBadgeCurrent,
                  isTuned && styles.numberBadgeTuned,
                ]}
              >
                <Text
                  style={[
                    styles.numberText,
                    isCurrent && styles.numberTextCurrent,
                    isTuned && styles.numberTextTuned,
                  ]}
                >
                  {isTuned ? '✓' : MAIN_STRINGS.indexOf(stringNum) + 1}
                </Text>
              </View>
            )}

            {/* Tuner orb */}
            {isCurrent && (
              <Animated.View
                style={[
                  styles.orb,
                  { backgroundColor: statusColor },
                  orbAnimatedStyle,
                ]}
                pointerEvents="none"
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
  },
  stringColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainStringColumn: {
    flex: 2,
  },
  stringLine: {
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  currentGlow: {
    shadowColor: colors.goldBright,
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  },
  numberBadge: {
    position: 'absolute',
    top: '15%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberBadgeCurrent: {
    borderColor: colors.goldBright,
    backgroundColor: colors.surface,
  },
  numberBadgeTuned: {
    borderColor: colors.success,
    backgroundColor: colors.surface,
  },
  numberText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  numberTextCurrent: {
    color: colors.goldBright,
  },
  numberTextTuned: {
    color: colors.success,
  },
  orb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});
