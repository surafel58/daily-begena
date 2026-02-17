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

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + 96 }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>Daily Begena</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.flameIcon}>🔥</Text>
          <Text style={styles.streakText}>{streak} Days</Text>
        </View>
      </View>

      {/* Hero Card */}
      <View style={styles.heroArea}>
        {!sessionCompleted ? (
          <Card onPress={() => router.push('/session')} style={styles.heroCard}>
            {/* Pill Badge */}
            <View style={styles.pillRow}>
              <View style={styles.pill}>
                <View style={styles.pillDot} />
                <Text style={styles.pillText}>TODAY'S DRILL</Text>
              </View>
            </View>

            {/* Strings Info */}
            <View style={styles.stringsInfo}>
              <Text style={styles.stringsLabel}>Strings</Text>
              <Text style={styles.stringsValue}>{todayStrings}</Text>
              <Text style={styles.durationText}>{todayDuration}</Text>
            </View>

            {/* Motivational Text */}
            <Text style={styles.motivationText}>
              Focus on consistent rhythmic plucking of the outer strings.
            </Text>

            {/* Start Button */}
            <View style={styles.heroButtonContainer}>
              <Button
                label="▶  START PRACTICE"
                onPress={() => router.push('/session')}
                variant="primary"
                style={styles.heroButton}
              />
            </View>
          </Card>
        ) : (
          <Card style={styles.heroCard} pressable={false}>
            <View style={styles.pillRow}>
              <View style={styles.pill}>
                <View style={[styles.pillDot, { backgroundColor: colors.success }]} />
                <Text style={styles.pillText}>COMPLETED</Text>
              </View>
            </View>
            <Text style={styles.completeTitle}>Session Complete</Text>
            <Text style={styles.completeSubtitle}>Great work today!</Text>
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

      {/* Tuner Card */}
      <Pressable onPress={() => router.push('/session/tune')}>
        <Card style={styles.tunerCard} pressable={false}>
          <View style={styles.tunerRow}>
            <View style={styles.tunerIconContainer}>
              <View style={styles.waveformIcon}>
                <View style={[styles.waveBar, { height: 5 }]} />
                <View style={[styles.waveBar, { height: 14 }]} />
                <View style={[styles.waveBar, { height: 24 }]} />
                <View style={[styles.waveBar, { height: 14 }]} />
                <View style={[styles.waveBar, { height: 5 }]} />
              </View>
            </View>
            <View style={styles.tunerInfo}>
              <Text style={styles.tunerTitle}>Tuner</Text>
              <Text style={styles.tunerSubtitle}>INSTRUMENT ALIGNMENT</Text>
            </View>
            <Text style={styles.tunerArrow}>›</Text>
          </View>
        </Card>
      </Pressable>
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
    marginBottom: spacing['2xl'],
  },
  appTitle: {
    ...typography.title,
    color: colors.textPrimary,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 9999,
  },
  flameIcon: {
    fontSize: 16,
  },
  streakText: {
    ...typography.caption,
    color: colors.goldBright,
    fontWeight: 'bold',
  },
  heroArea: {
    flex: 1,
    justifyContent: 'center',
  },
  heroCard: {
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing['2xl'],
  },
  pillRow: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 9999,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.goldBright,
  },
  pillText: {
    ...typography.small,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  stringsInfo: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  stringsLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  stringsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  durationText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  motivationText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  heroButtonContainer: {
    alignItems: 'center',
  },
  heroButton: {
    width: '100%',
    shadowColor: colors.goldMuted,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  completeTitle: {
    ...typography.title,
    color: colors.goldMuted,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  completeSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.lg,
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
  tunerCard: {
    marginBottom: spacing.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  tunerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  tunerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212, 163, 115, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveBar: {
    width: 3,
    borderRadius: 1.5,
    backgroundColor: colors.goldMuted,
  },
  tunerInfo: {
    flex: 1,
  },
  tunerTitle: {
    ...typography.body,
    color: colors.goldMuted,
    fontWeight: '600',
  },
  tunerSubtitle: {
    ...typography.small,
    color: colors.goldMuted,
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
  tunerArrow: {
    fontSize: 28,
    color: colors.textSecondary,
    fontWeight: '300',
  },
});
