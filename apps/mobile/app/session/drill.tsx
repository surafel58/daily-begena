import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { colors, spacing, typography } from '../../src/shared/ui';

const DRILL_DURATION_SEC = 30; // Short for demo
const BPM = 60;

type DrillPhase = 'countdown' | 'playing' | 'done';

export default function DrillScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<DrillPhase>('countdown');
  const [countdownNum, setCountdownNum] = useState(3);
  const [elapsed, setElapsed] = useState(0);
  const [currentString, setCurrentString] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const pulseScale = useSharedValue(1);
  const countdownOpacity = useSharedValue(1);
  const countdownScale = useSharedValue(0.5);
  const progressWidth = useSharedValue(0);
  const vignette = useSharedValue(0);
  const numberGlow = useSharedValue(0);

  // Countdown
  useEffect(() => {
    if (phase !== 'countdown') return;

    countdownScale.value = withSpring(1, { damping: 8, stiffness: 200 });
    countdownOpacity.value = withTiming(1, { duration: 200 });

    const interval = setInterval(() => {
      setCountdownNum((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase('playing');
          return 0;
        }
        countdownScale.value = 0.5;
        countdownScale.value = withSpring(1, { damping: 8, stiffness: 200 });
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Playing phase
  useEffect(() => {
    if (phase !== 'playing' || isPaused) return;

    // Metronome pulse: breathing circle in deep teal
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: (60 / BPM) * 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: (60 / BPM) * 500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    progressWidth.value = withTiming(1, {
      duration: (DRILL_DURATION_SEC - elapsed) * 1000,
      easing: Easing.linear,
    });

    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev >= DRILL_DURATION_SEC - 1) {
          clearInterval(timerRef.current);
          setPhase('done');
          return DRILL_DURATION_SEC;
        }
        return prev + 1;
      });

      // Alternate between today's strings
      setCurrentString((prev) => (prev === 1 ? 3 : 1));

      // Simulate hit/miss feedback
      if (Math.random() > 0.3) {
        // Hit: gold glow + ripple
        numberGlow.value = withSequence(
          withTiming(1, { duration: 100 }),
          withTiming(0, { duration: 300 }),
        );
      } else {
        // Miss: red vignette at edges
        vignette.value = withSequence(
          withTiming(0.4, { duration: 100 }),
          withTiming(0, { duration: 400 }),
        );
      }
    }, (60 / BPM) * 1000);

    return () => {
      clearInterval(timerRef.current);
      cancelAnimation(pulseScale);
    };
  }, [phase, isPaused]);

  // Auto-advance on done
  useEffect(() => {
    if (phase === 'done') {
      cancelAnimation(pulseScale);
      const timeout = setTimeout(() => {
        router.replace('/session/ear-check');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
      clearInterval(timerRef.current);
      cancelAnimation(pulseScale);
      pulseScale.value = 1;
    }
  }, [isPaused]);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const countdownAnimatedStyle = useAnimatedStyle(() => ({
    opacity: countdownOpacity.value,
    transform: [{ scale: countdownScale.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%` as any,
  }));

  const vignetteAnimatedStyle = useAnimatedStyle(() => ({
    opacity: vignette.value,
  }));

  const numberGlowStyle = useAnimatedStyle(() => ({
    textShadowColor: colors.goldBright,
    textShadowRadius: numberGlow.value * 20,
  }));

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Progress Bar — thin gold line at top */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, progressAnimatedStyle]} />
      </View>

      {/* Red vignette for miss feedback */}
      <Animated.View style={[styles.vignette, vignetteAnimatedStyle]} pointerEvents="none" />

      {/* Count-in overlay */}
      {phase === 'countdown' && (
        <View style={styles.countdownOverlay}>
          <Animated.Text style={[styles.countdownText, countdownAnimatedStyle]}>
            {countdownNum}
          </Animated.Text>
        </View>
      )}

      {/* Main drill view */}
      {phase !== 'countdown' && (
        <View style={styles.drillArea}>
          <Text style={styles.tempoText}>{BPM} BPM</Text>

          {/* Metronome pulse circle + string number */}
          <View style={styles.pulseContainer}>
            <Animated.View style={[styles.pulseCircle, pulseAnimatedStyle]} />
            <Animated.Text style={[styles.stringNumber, numberGlowStyle]}>
              {currentString}
            </Animated.Text>
          </View>

          <View style={styles.recordingRow}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingTime}>{formatTime(elapsed)}</Text>
          </View>
        </View>
      )}

      {/* Pause control */}
      {phase === 'playing' && (
        <View style={styles.controls}>
          <Pressable onPress={togglePause} style={styles.pauseButton}>
            <Text style={styles.pauseIcon}>{isPaused ? '▶' : '❚❚'}</Text>
          </Pressable>
        </View>
      )}

      {phase === 'done' && (
        <View style={styles.controls}>
          <Text style={styles.doneText}>Complete!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  progressTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.surfaceLight,
    zIndex: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.goldMuted,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 40,
    borderColor: colors.error,
    zIndex: 5,
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  countdownText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  drillArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempoText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing['4xl'],
  },
  pulseContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    backgroundColor: colors.teal,
    opacity: 0.3,
  },
  stringNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textShadowOffset: { width: 0, height: 0 },
  },
  recordingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing['4xl'],
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  recordingTime: {
    ...typography.body,
    color: colors.textSecondary,
    fontVariant: ['tabular-nums'],
  },
  controls: {
    alignItems: 'center',
    paddingBottom: spacing['5xl'],
  },
  pauseButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  pauseIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  doneText: {
    ...typography.title,
    color: colors.success,
  },
});
