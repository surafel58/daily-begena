import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { BegenaInstrumentView, colors, spacing, typography } from '../../src/shared/ui';

const TODAY_STRINGS = [1, 4, 6, 8, 10]; // Beginner preset: 5 strings

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

  const advanceString = useCallback(() => {
    const newTuned = [...tunedStrings, TODAY_STRINGS[currentStringIndex]];
    setTunedStrings(newTuned);

    if (currentStringIndex < TODAY_STRINGS.length - 1) {
      setCurrentStringIndex(currentStringIndex + 1);
      setStatus('waiting');
      orbOpacity.value = withTiming(0, { duration: 200 });
      orbY.value = 0;
    } else {
      router.replace('/session/drill');
    }
  }, [currentStringIndex, tunedStrings]);

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
    }, 2500);

    setTimeout(() => {
      advanceString();
    }, 3500);
  }, [status, currentStringIndex, advanceString]);

  const orbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: orbY.value },
      { scale: orbScale.value },
    ],
    opacity: orbOpacity.value,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Progress */}
      <View style={styles.progressBar}>
        <Text style={styles.progressText}>
          String {currentStringIndex + 1} of {TODAY_STRINGS.length}
        </Text>
      </View>

      {/* Begena instrument with interactive strings */}
      <BegenaInstrumentView
        activeStrings={TODAY_STRINGS}
        currentString={currentString}
        tunedStrings={tunedStrings}
        statusColor={statusColors[status]}
        orbAnimatedStyle={orbAnimatedStyle}
        onStringPress={simulateTuning}
      />

      {/* Status Text */}
      <View style={styles.statusArea}>
        <Text style={[styles.statusText, { color: statusColors[status] }]}>
          {statusMessages[status]}
        </Text>
        {status === 'waiting' && (
          <Text style={styles.hintText}>Tap the string to simulate</Text>
        )}
      </View>

      {/* Footer */}
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
