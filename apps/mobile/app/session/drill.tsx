import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
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

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const DRILL_DURATION_SEC = 30;
const BPM = 60;
const ORB_SIZE = 200;

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
  const pulseOpacity = useSharedValue(0.25);
  const countdownOpacity = useSharedValue(1);
  const countdownScale = useSharedValue(0.5);
  const progressWidth = useSharedValue(0);
  const vignetteOpacity = useSharedValue(0);
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

    // Breathing metronome pulse
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: (60 / BPM) * 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: (60 / BPM) * 500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: (60 / BPM) * 500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.2, { duration: (60 / BPM) * 500, easing: Easing.inOut(Easing.ease) }),
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

      setCurrentString((prev) => (prev === 1 ? 3 : 1));

      if (Math.random() > 0.3) {
        numberGlow.value = withSequence(
          withTiming(1, { duration: 100 }),
          withTiming(0, { duration: 300 }),
        );
      } else {
        vignetteOpacity.value = withSequence(
          withTiming(0.6, { duration: 100 }),
          withTiming(0, { duration: 400 }),
        );
      }
    }, (60 / BPM) * 1000);

    return () => {
      clearInterval(timerRef.current);
      cancelAnimation(pulseScale);
      cancelAnimation(pulseOpacity);
    };
  }, [phase, isPaused]);

  // Auto-advance
  useEffect(() => {
    if (phase === 'done') {
      cancelAnimation(pulseScale);
      cancelAnimation(pulseOpacity);
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
      cancelAnimation(pulseOpacity);
      cancelAnimation(progressWidth);
      pulseScale.value = 1;
      pulseOpacity.value = 0.25;
    }
  }, [isPaused]);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const countdownAnimatedStyle = useAnimatedStyle(() => ({
    opacity: countdownOpacity.value,
    transform: [{ scale: countdownScale.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%` as any,
  }));

  const vignetteAnimatedStyle = useAnimatedStyle(() => ({
    opacity: vignetteOpacity.value,
  }));

  const numberGlowStyle = useAnimatedStyle(() => ({
    textShadowColor: colors.goldBright,
    textShadowRadius: numberGlow.value * 30,
  }));

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Progress bar + timer at top */}
      {phase !== 'countdown' && (
        <View style={[styles.topSection, { top: insets.top + spacing.sm }]}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, progressAnimatedStyle]} />
          </View>
          <View style={styles.timerRow}>
            <View style={styles.recordDot} />
            <Text style={styles.timerText}>{formatTime(elapsed)}</Text>
            <Text style={styles.bpmText}>{BPM} BPM</Text>
          </View>
        </View>
      )}

      {/* Edge lighting — E76F51 gradient glow along screen edges */}
      <View style={styles.edgeLightTop} pointerEvents="none">
        <View style={styles.edgeGlowInnerH} />
      </View>
      <View style={styles.edgeLightBottom} pointerEvents="none">
        <View style={styles.edgeGlowInnerH} />
      </View>
      <View style={styles.edgeLightLeft} pointerEvents="none">
        <View style={styles.edgeGlowInnerV} />
      </View>
      <View style={styles.edgeLightRight} pointerEvents="none">
        <View style={styles.edgeGlowInnerV} />
      </View>

      {/* Miss feedback — edge lighting flashes red */}
      <Animated.View style={[styles.missEdgeTop, vignetteAnimatedStyle]} pointerEvents="none" />
      <Animated.View style={[styles.missEdgeBottom, vignetteAnimatedStyle]} pointerEvents="none" />
      <Animated.View style={[styles.missEdgeLeft, vignetteAnimatedStyle]} pointerEvents="none" />
      <Animated.View style={[styles.missEdgeRight, vignetteAnimatedStyle]} pointerEvents="none" />

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
          {/* Glowing teal orb + string number */}
          <View style={styles.orbContainer}>
            {/* Outer blur halo */}
            <Animated.View style={[styles.orbBlurOuter, pulseAnimatedStyle]} />
            {/* 200x200 #2A4D69 circle with layer blur */}
            <Animated.View style={[styles.orbGlow, pulseAnimatedStyle]} />
            {/* Circle outline */}
            <View style={styles.orbRing} />
            {/* String number */}
            <Animated.Text style={[styles.stringNumber, numberGlowStyle]}>
              {currentString}
            </Animated.Text>
          </View>
        </View>
      )}

      {/* Pause button */}
      {phase === 'playing' && (
        <View style={[styles.controls, { paddingBottom: insets.bottom + spacing['3xl'] }]}>
          <Pressable onPress={togglePause} style={styles.pauseButton}>
            <Text style={styles.pauseIcon}>{isPaused ? '▶' : '❚❚'}</Text>
          </Pressable>
        </View>
      )}

      {phase === 'done' && (
        <View style={[styles.controls, { paddingBottom: insets.bottom + spacing['3xl'] }]}>
          <Text style={styles.doneText}>Complete!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  topSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.goldBright,
    borderRadius: 2,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  recordDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E76F51',
    shadowColor: '#E76F51',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    fontVariant: ['tabular-nums'] as any,
  },
  bpmText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.35)',
  },

  // Edge lighting — #E76F51 glow with gradient fade inward
  edgeLightTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 4,
    overflow: 'hidden',
  },
  edgeLightBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 4,
    overflow: 'hidden',
    transform: [{ rotate: '180deg' }],
  },
  edgeLightLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 20,
    zIndex: 4,
    overflow: 'hidden',
  },
  edgeLightRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 20,
    zIndex: 4,
    overflow: 'hidden',
    transform: [{ rotate: '180deg' }],
  },
  // Simulated gradient: thin bright line at edge, soft glow fading inward
  edgeGlowInnerH: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(231, 111, 81, 0.5)',
    shadowColor: '#E76F51',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 10,
  },
  edgeGlowInnerV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 2,
    backgroundColor: 'rgba(231, 111, 81, 0.4)',
    shadowColor: '#E76F51',
    shadowOffset: { width: 8, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },

  // Miss feedback — edge lighting flashes red
  missEdgeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 12,
    zIndex: 5,
  },
  missEdgeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 12,
    zIndex: 5,
  },
  missEdgeLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 3,
    backgroundColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 12,
    zIndex: 5,
  },
  missEdgeRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 3,
    backgroundColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: { width: -6, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 12,
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

  // Centered orb
  orbContainer: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 200x200 #2A4D69 circle with layer blur (simulated via stacked soft shadows)
  orbGlow: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: 9999,
    backgroundColor: colors.teal,
    shadowColor: colors.teal,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 30,
  },
  // Outer soft halo to simulate layer blur spreading beyond the circle
  orbBlurOuter: {
    position: 'absolute',
    width: ORB_SIZE * 1.6,
    height: ORB_SIZE * 1.6,
    borderRadius: 9999,
    backgroundColor: 'rgba(42, 77, 105, 0.25)',
  },
  orbRing: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: 'rgba(224, 224, 224, 0.2)',
  },
  stringNumber: {
    fontSize: 130,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textShadowOffset: { width: 0, height: 0 },
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 140,
  },

  controls: {
    alignItems: 'center',
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
