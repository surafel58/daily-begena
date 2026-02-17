import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Button, colors, spacing, typography } from '../../src/shared/ui';

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Placeholder data — will be replaced with DB reads
  const streak = 5;
  const todayStrings = '1 & 3';
  const todayDuration = '10 Minutes';
  const sessionCompleted = false;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.flameIcon}>🔥</Text>
          <Text style={styles.streakText}>{streak} Days</Text>
        </View>
      </View>

      {/* Hero Card */}
      <View style={styles.heroArea}>
        {!sessionCompleted ? (
          <Card onPress={() => router.push('/session')} style={styles.heroCard}>
            <Text style={styles.heroTitle}>Today's Drill</Text>
            <Text style={styles.heroSubtitle}>
              Strings {todayStrings} · {todayDuration}
            </Text>
            <View style={styles.heroButtonContainer}>
              <Button
                label="Start Practice"
                onPress={() => router.push('/session')}
                variant="primary"
                style={styles.heroButton}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.heroCard} pressable={false}>
            <Text style={styles.heroTitle}>Session Complete</Text>
            <Text style={styles.heroSubtitle}>
              Great work today!
            </Text>
            <View style={styles.scoreRow}>
              <View style={styles.scoreStat}>
                <Text style={styles.scoreValue}>85%</Text>
                <Text style={styles.scoreLabel}>Accuracy</Text>
              </View>
              <View style={styles.scoreStat}>
                <Text style={styles.scoreValue}>92%</Text>
                <Text style={styles.scoreLabel}>Timing</Text>
              </View>
            </View>
          </Card>
        )}
      </View>

      {/* Tuner Shortcut */}
      <View style={styles.bottomArea}>
        <Pressable
          style={styles.tunerButton}
          onPress={() => router.push('/session/tune')}
        >
          <Text style={styles.tunerIcon}>🎵</Text>
          <Text style={styles.tunerLabel}>Tuner</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.xl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  greeting: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  flameIcon: {
    fontSize: 20,
  },
  streakText: {
    ...typography.body,
    color: colors.goldBright,
    fontWeight: 'bold',
  },
  heroArea: {
    flex: 1,
    justifyContent: 'center',
  },
  heroCard: {
    paddingVertical: spacing['4xl'],
    paddingHorizontal: spacing['3xl'],
  },
  heroTitle: {
    ...typography.title,
    color: colors.goldMuted,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing['3xl'],
  },
  heroButtonContainer: {
    alignItems: 'center',
  },
  heroButton: {
    width: '100%',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xl,
  },
  scoreStat: {
    alignItems: 'center',
  },
  scoreValue: {
    ...typography.title,
    color: colors.goldBright,
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  bottomArea: {
    alignItems: 'center',
    paddingBottom: spacing['3xl'],
  },
  tunerButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tunerIcon: {
    fontSize: 24,
  },
  tunerLabel: {
    ...typography.small,
    color: colors.textPrimary,
    marginTop: 2,
  },
});
