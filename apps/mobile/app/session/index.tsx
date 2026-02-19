import { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { Button, colors, spacing, typography, radius } from '../../src/shared/ui';

// Step 1: Quick Tune — waveform bars
function QuickTuneIcon() {
  return (
    <View style={stepStyles.iconCircle}>
      <Svg width={18} height={20} viewBox="0 0 18 20" fill="none">
        <Path
          d="M4 16V4H6V16H4V16M8 20V0H10V20H8V20M0 12V8H2V12H0V12M12 16V4H14V16H12V12M16 12V8H18V12H16V12"
          fill={colors.goldMuted}
        />
      </Svg>
    </View>
  );
}

// Step 2: Finger Drill — hand icon
function FingerDrillIcon() {
  return (
    <View style={stepStyles.iconCircle}>
      <Svg width={17} height={22} viewBox="0 0 17 22" fill="none">
        <Path
          d="M8 11V1C8 0.716667 8.09583 0.479167 8.2875 0.2875C8.47917 0.0958333 8.71667 0 9 0C9.28333 0 9.52083 0.0958333 9.7125 0.2875C9.90417 0.479167 10 0.716667 10 1V11H8V11M4 11V2C4 1.71667 4.09583 1.47917 4.2875 1.2875C4.47917 1.09583 4.71667 1 5 1C5.28333 1 5.52083 1.09583 5.7125 1.2875C5.90417 1.47917 6 1.71667 6 2V11H4V11M8.5 22C6.13333 22 4.125 21.175 2.475 19.525C0.825 17.875 0 15.8667 0 13.5V4C0 3.71667 0.0958333 3.47917 0.2875 3.2875C0.479167 3.09583 0.716667 3 1 3C1.28333 3 1.52083 3.09583 1.7125 3.2875C1.90417 3.47917 2 3.71667 2 4V13.5C2 15.3167 2.62917 16.8542 3.8875 18.1125C5.14583 19.3708 6.68333 20 8.5 20C10.3167 20 11.8542 19.3708 13.1125 18.1125C14.3708 16.8542 15 15.3167 15 13.5V10V10C14.7167 10 14.4792 10.0958 14.2875 10.2875C14.0958 10.4792 14 10.7167 14 11V15H11C10.45 15 9.97917 15.1958 9.5875 15.5875C9.19583 15.9792 9 16.45 9 17V18H7V17C7 15.9 7.39167 14.9583 8.175 14.175C8.95833 13.3917 9.9 13 11 13H12V10.15V10.15V3C12 2.71667 12.0958 2.47917 12.2875 2.2875C12.4792 2.09583 12.7167 2 13 2C13.2833 2 13.5208 2.09583 13.7125 2.2875C13.9042 2.47917 14 2.71667 14 3V8.175C14.1667 8.125 14.3292 8.08333 14.4875 8.05C14.6458 8.01667 14.8167 8 15 8H17V13.5C17 15.8667 16.175 17.875 14.525 19.525C12.875 21.175 10.8667 22 8.5 22V22M9.5 14V14V14V14V14V14V14V14V14V14V14V14V14V14V14V14V14"
          fill={colors.goldMuted}
        />
      </Svg>
    </View>
  );
}

// Step 3: Ear Check — ear with sound wave
function EarCheckIcon() {
  return (
    <View style={stepStyles.iconCircle}>
      <Svg width={18} height={21} viewBox="0 0 18 21" fill="none">
        <Path
          d="M4 20.8C5.03333 20.8 5.87917 20.5417 6.5375 20.025C7.19583 19.5083 7.7 18.75 8.05 17.75C8.33333 16.9167 8.60417 16.3333 8.8625 16C9.12083 15.6667 9.71667 15.1333 10.65 14.4C11.6833 13.5667 12.5 12.625 13.1 11.575C13.7 10.525 14 9.26667 14 7.8C14 5.81667 13.3292 4.15417 11.9875 2.8125C10.6458 1.47083 8.98333 0.8 7 0.8C5.01667 0.8 3.35417 1.47083 2.0125 2.8125C0.670833 4.15417 0 5.81667 0 7.8H2C2 6.38333 2.47917 5.19583 3.4375 4.2375C4.39583 3.27917 5.58333 2.8 7 2.8C8.41667 2.8 9.60417 3.27917 10.5625 4.2375C11.5208 5.19583 12 6.38333 12 7.8C12 8.93333 11.775 9.9 11.325 10.7C10.875 11.5 10.2333 12.2167 9.4 12.85C8.53333 13.4833 7.85833 14.1 7.375 14.7C6.89167 15.3 6.53333 15.95 6.3 16.65C6.06667 17.3833 5.7875 17.925 5.4625 18.275C5.1375 18.625 4.65 18.8 4 18.8C3.45 18.8 2.97917 18.6042 2.5875 18.2125C2.19583 17.8208 2 17.35 2 16.8H0C0 17.9 0.391667 18.8417 1.175 19.625C1.95833 20.4083 2.9 20.8 4 20.8V20.8M14.8 15.55C15.7833 14.55 16.5625 13.3875 17.1375 12.0625C17.7125 10.7375 18 9.31667 18 7.8C18 6.26667 17.7125 4.83333 17.1375 3.5C16.5625 2.16667 15.7833 1 14.8 0L13.35 1.4C14.1833 2.23333 14.8333 3.19583 15.3 4.2875C15.7667 5.37917 16 6.55 16 7.8C16 9.03333 15.7667 10.1917 15.3 11.275C14.8333 12.3583 14.1833 13.3167 13.35 14.15L14.8 15.55V15.55M7 10.3C7.7 10.3 8.29167 10.0542 8.775 9.5625C9.25833 9.07083 9.5 8.48333 9.5 7.8C9.5 7.1 9.25833 6.50833 8.775 6.025C8.29167 5.54167 7.7 5.3 7 5.3C6.3 5.3 5.70833 5.54167 5.225 6.025C4.74167 6.50833 4.5 7.1 4.5 7.8C4.5 8.48333 4.74167 9.07083 5.225 9.5625C5.70833 10.0542 6.3 10.3 7 10.3V10.3"
          fill={colors.goldMuted}
        />
      </Svg>
    </View>
  );
}

const STEPS = [
  { number: 1, title: 'Quick Tune', Icon: QuickTuneIcon },
  { number: 2, title: 'Finger Drill', Icon: FingerDrillIcon },
  { number: 3, title: 'Ear Check', Icon: EarCheckIcon },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 150;
    translateY.value = withDelay(delay, withSpring(0, { damping: 15 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.stepCard, animatedStyle]}>
      <step.Icon />
      <View style={styles.stepContent}>
        <Text style={styles.stepLabel}>STEP {step.number}</Text>
        <Text style={styles.stepTitle}>{step.title}</Text>
      </View>
    </Animated.View>
  );
}

export default function SessionOverviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));
  }, []);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing['3xl'], paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Session Flow</Text>
        <Pressable onPress={() => router.back()} style={styles.infoButton}>
          <Text style={styles.infoText}>?</Text>
        </Pressable>
      </View>

      {/* Steps */}
      <View style={styles.stepsContainer}>
        {STEPS.map((step, index) => (
          <View key={step.number}>
            <StepCard step={step} index={index} />
            {index < STEPS.length - 1 && (
              <View style={styles.connector}>
                <Text style={styles.connectorArrow}>↓</Text>
              </View>
            )}
          </View>
        ))}

        {/* Motivational text */}
        <Text style={styles.motivationalText}>
          Prepare your mind and instrument for a focused Begena meditation
          session.
        </Text>
      </View>

      {/* Begin button */}
      <Animated.View style={buttonAnimatedStyle}>
        <Button
          label="Begin Practice  ▷"
          onPress={() => router.push('/session/tune')}
          variant="primary"
          style={styles.beginButton}
        />
      </Animated.View>
    </View>
  );
}

const stepStyles = StyleSheet.create({
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 163, 115, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  stepsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  stepContent: {
    flex: 1,
  },
  stepLabel: {
    ...typography.small,
    color: colors.goldMuted,
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  stepTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  connector: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  connectorArrow: {
    fontSize: 28,
    color: colors.goldMuted,
  },
  motivationalText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  beginButton: {
    width: '100%',
    shadowColor: colors.goldMuted,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
});
