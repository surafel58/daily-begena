import { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { colors, spacing, typography } from '../../src/shared/ui';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const TOTAL_STRINGS = 10;
const TODAY_STRINGS = [1, 3]; // Placeholder: today's strings to tune

type TuneStatus = 'waiting' | 'listening' | 'low' | 'close' | 'high' | 'tuned';

export default function TuneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [status, setStatus] = useState<TuneStatus>('waiting');
  const [tunedStrings, setTunedStrings] = useState<number[]>([]);

  const currentString = TODAY_STRINGS[currentStringIndex];
  const orbY = useSharedValue(0);
  const orbScale = useSharedValue(1);
  const orbOpacity = useSharedValue(0);
  const flashOpacity = useSharedValue(0);

  const statusMessages: Record<TuneStatus, string> = {
    waiting: `Pluck String ${currentString}`,
    listening: 'Listening...',
    low: 'Too Low — Tighten',
    close: 'Almost there...',
    high: 'Too High — Loosen',
    tuned: 'In Tune!',
  };

  const statusColors: Record<TuneStatus, string> = {
    waiting: colors.textSecondary,
    listening: colors.textPrimary,
    low: colors.error,
    close: colors.warning,
    high: colors.error,
    tuned: colors.success,
  };

  // Simulate tuning flow on string tap
  const simulateTuning = useCallback(() => {
    if (status !== 'waiting') return;

    setStatus('listening');
    orbOpacity.value = withTiming(1, { duration: 300 });

    // Simulate: low → close → tuned
    setTimeout(() => {
      setStatus('low');
      orbY.value = withSpring(40, { damping: 12 });
    }, 600);

    setTimeout(() => {
      setStatus('close');
      orbY.value = withSpring(8, { damping: 12 });
    }, 1500);

    setTimeout(() => {
      setStatus('tuned');
      orbY.value = withSpring(0, { damping: 15 });
      orbScale.value = withSequence(
        withTiming(1.3, { duration: 200 }),
        withSpring(1, { damping: 10 }),
      );
      // Flash the string gold
      flashOpacity.value = withSequence(
        withTiming(1, { duration: 150 }),
        withTiming(0, { duration: 400 }),
      );
    }, 2500);

    setTimeout(() => {
      advanceString();
    }, 3500);
  }, [status, currentStringIndex]);

  const advanceString = useCallback(() => {
    const newTuned = [...tunedStrings, TODAY_STRINGS[currentStringIndex]];
    setTunedStrings(newTuned);

    if (currentStringIndex < TODAY_STRINGS.length - 1) {
      setCurrentStringIndex(currentStringIndex + 1);
      setStatus('waiting');
      orbOpacity.value = withTiming(0, { duration: 200 });
      orbY.value = 0;
    } else {
      // All strings tuned — navigate to drill
      router.replace('/session/drill');
    }
  }, [currentStringIndex, tunedStrings]);

  const orbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: orbY.value },
      { scale: orbScale.value },
    ],
    opacity: orbOpacity.value,
  }));

  const stringSpacing = SCREEN_WIDTH / (TOTAL_STRINGS + 1);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Progress */}
      <View style={styles.progressBar}>
        <Text style={styles.progressText}>
          String {currentStringIndex + 1} of {TODAY_STRINGS.length}
        </Text>
      </View>

      {/* Strings */}
      <View style={styles.stringsArea}>
        {Array.from({ length: TOTAL_STRINGS }, (_, i) => {
          const stringNum = i + 1;
          const isTarget = TODAY_STRINGS.includes(stringNum);
          const isCurrent = stringNum === currentString;
          const isTuned = tunedStrings.includes(stringNum);

          return (
            <Pressable
              key={stringNum}
              style={[
                styles.stringTouchArea,
                { left: stringSpacing * stringNum - 20 },
              ]}
              onPress={isCurrent ? simulateTuning : undefined}
            >
              <View
                style={[
                  styles.string,
                  {
                    width: isTarget ? 3 : 1.5,
                    backgroundColor: isTuned
                      ? colors.success
                      : isCurrent
                        ? colors.goldMuted
                        : isTarget
                          ? colors.goldMuted
                          : colors.stringInactive,
                    shadowColor: isCurrent ? colors.goldMuted : 'transparent',
                    shadowOpacity: isCurrent ? 0.8 : 0,
                    shadowRadius: isCurrent ? 10 : 0,
                  },
                ]}
              />
              {/* Tuner Orb - only on current string */}
              {isCurrent && (
                <Animated.View
                  style={[
                    styles.orb,
                    {
                      backgroundColor: statusColors[status],
                    },
                    orbAnimatedStyle,
                  ]}
                />
              )}
              {/* Tuned checkmark */}
              {isTuned && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Status Text */}
      <View style={styles.statusArea}>
        <Text style={[styles.statusText, { color: statusColors[status] }]}>
          {statusMessages[status]}
        </Text>
        {status === 'waiting' && (
          <Text style={styles.hintText}>Tap the string to simulate</Text>
        )}
      </View>

      {/* Skip / Back */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable onPress={() => router.back()} style={styles.skipButton}>
          <Text style={styles.skipText}>Back</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace('/session/drill')}
          style={styles.skipButton}
        >
          <Text style={styles.skipText}>Skip Tuning</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  progressBar: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  stringsArea: {
    flex: 1,
    position: 'relative',
  },
  stringTouchArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  string: {
    height: '100%',
    borderRadius: 1,
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  orb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    top: '50%',
    marginTop: -10,
  },
  checkmark: {
    position: 'absolute',
    top: '30%',
    backgroundColor: colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.bg,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusArea: {
    paddingVertical: spacing['3xl'],
    alignItems: 'center',
  },
  statusText: {
    ...typography.title,
    fontWeight: 'bold',
  },
  hintText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  skipButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  skipText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
