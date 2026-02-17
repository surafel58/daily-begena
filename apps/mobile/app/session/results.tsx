import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Card, Button, colors, spacing, typography } from '../../src/shared/ui';

export default function ResultsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Placeholder data
  const accuracy = 85;
  const timingScore = 92;
  const streakBefore = 5;
  const streakAfter = 6;
  const consistencyMessage = 'Great Rhythm!';

  // Animations
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(20);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const streakScale = useSharedValue(0.5);
  const streakOpacity = useSharedValue(0);
  const streakNumberScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Staggered entrance
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    headerTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));

    cardOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));
    cardTranslateY.value = withDelay(500, withSpring(0, { damping: 15 }));

    streakOpacity.value = withDelay(1000, withTiming(1, { duration: 400 }));
    streakScale.value = withDelay(1000, withSpring(1, { damping: 10, stiffness: 150 }));

    // Streak number increment animation
    streakNumberScale.value = withDelay(
      1300,
      withSequence(
        withTiming(1.4, { duration: 200, easing: Easing.out(Easing.ease) }),
        withSpring(1, { damping: 8 }),
      ),
    );

    buttonOpacity.value = withDelay(1500, withTiming(1, { duration: 400 }));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const streakAnimatedStyle = useAnimatedStyle(() => ({
    opacity: streakOpacity.value,
    transform: [{ scale: streakScale.value }],
  }));

  const streakNumberStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakNumberScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + spacing.lg }]}>
      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Text style={styles.title}>Session Complete</Text>
      </Animated.View>

      {/* Score Card */}
      <Animated.View style={cardAnimatedStyle}>
        <Card style={styles.scoreCard} pressable={false}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreStat}>
              <Text style={styles.scoreValue}>{accuracy}%</Text>
              <Text style={styles.scoreLabel}>Accuracy</Text>
            </View>
            <View style={styles.scoreDivider} />
            <View style={styles.scoreStat}>
              <Text style={styles.scoreValue}>{timingScore}%</Text>
              <Text style={styles.scoreLabel}>Timing</Text>
            </View>
          </View>
          <View style={styles.consistencyRow}>
            <Text style={styles.consistencyText}>{consistencyMessage}</Text>
          </View>
        </Card>
      </Animated.View>

      {/* Streak */}
      <Animated.View style={[styles.streakArea, streakAnimatedStyle]}>
        <Text style={styles.streakFlame}>🔥</Text>
        <Animated.Text style={[styles.streakNumber, streakNumberStyle]}>
          {streakAfter}
        </Animated.Text>
        <Text style={styles.streakLabel}>Day Streak</Text>
      </Animated.View>

      {/* Actions */}
      <Animated.View style={[styles.actions, buttonAnimatedStyle]}>
        <Button
          label="Retry Drill"
          onPress={() => router.replace('/session/drill')}
          variant="outline"
          style={styles.retryButton}
        />
        <Button
          label="Finish"
          onPress={() => router.replace('/(tabs)')}
          variant="primary"
          style={styles.finishButton}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  scoreCard: {
    marginBottom: spacing['3xl'],
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreStat: {
    flex: 1,
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.goldBright,
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  scoreDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.surfaceLight,
  },
  consistencyRow: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceLight,
  },
  consistencyText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  streakArea: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  streakFlame: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.goldBright,
  },
  streakLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.md,
  },
  retryButton: {
    width: '100%',
  },
  finishButton: {
    width: '100%',
  },
});
