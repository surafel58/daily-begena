import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Button, colors, spacing, typography } from '../../src/shared/ui';

// Placeholder data
const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const weekCompleted = [true, true, false, true, true, false, false];
const pastSessions = [
  { id: 1, date: 'Feb 14', strings: '1 & 3', score: 85, band: 'high' as const },
  { id: 2, date: 'Feb 13', strings: '2 & 4', score: 72, band: 'medium' as const },
  { id: 3, date: 'Feb 11', strings: '1 & 3', score: 90, band: 'high' as const },
  { id: 4, date: 'Feb 10', strings: '1 & 2', score: 65, band: 'low' as const },
];

const bandColor = {
  high: colors.success,
  medium: colors.warning,
  low: colors.error,
};

export default function DrillsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + spacing.lg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Drills</Text>

      {/* Start Practice Card */}
      <Card onPress={() => router.push('/session')} style={styles.practiceCard}>
        <View style={styles.practiceRow}>
          <View style={styles.practiceInfo}>
            <Text style={styles.practiceLabel}>TODAY'S SESSION</Text>
            <Text style={styles.practiceStrings}>Strings 1 & 3</Text>
            <Text style={styles.practiceDuration}>10 Minutes</Text>
          </View>
          <Button
            label="Start"
            onPress={() => router.push('/session')}
            variant="primary"
            style={styles.practiceButton}
          />
        </View>
      </Card>

      {/* Streak Banner */}
      <Card style={styles.streakCard} pressable={false}>
        <View style={styles.streakRow}>
          <View style={styles.streakStat}>
            <Text style={styles.streakValue}>5</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
          </View>
          <View style={styles.streakDivider} />
          <View style={styles.streakStat}>
            <Text style={styles.streakValue}>12</Text>
            <Text style={styles.streakLabel}>Best Streak</Text>
          </View>
        </View>
      </Card>

      {/* Week View */}
      <View style={styles.weekContainer}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.weekDots}>
          {weekDays.map((day, i) => (
            <View key={i} style={styles.dayColumn}>
              <View
                style={[
                  styles.dot,
                  weekCompleted[i] ? styles.dotFilled : styles.dotEmpty,
                ]}
              />
              <Text style={styles.dayLabel}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Past Sessions */}
      <Text style={styles.sectionTitle}>Recent Sessions</Text>
      {pastSessions.map((session) => (
        <Card key={session.id} style={styles.sessionCard} pressable={false}>
          <View style={styles.sessionRow}>
            <View>
              <Text style={styles.sessionDate}>{session.date}</Text>
              <Text style={styles.sessionStrings}>Strings {session.strings}</Text>
            </View>
            <View style={styles.sessionScore}>
              <Text style={styles.sessionScoreValue}>{session.score}%</Text>
              <View
                style={[
                  styles.bandDot,
                  { backgroundColor: bandColor[session.band] },
                ]}
              />
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  practiceCard: {
    marginBottom: spacing.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  practiceInfo: {
    flex: 1,
  },
  practiceLabel: {
    ...typography.small,
    color: colors.goldMuted,
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  practiceStrings: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  practiceDuration: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  practiceButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  streakCard: {
    marginBottom: spacing.xl,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakStat: {
    flex: 1,
    alignItems: 'center',
  },
  streakValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.goldBright,
  },
  streakLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  streakDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.surfaceLight,
  },
  weekContainer: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  weekDots: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  dayColumn: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  dotFilled: {
    backgroundColor: colors.goldBright,
  },
  dotEmpty: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.stringInactive,
  },
  dayLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  sessionCard: {
    marginBottom: spacing.md,
  },
  sessionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionDate: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  sessionStrings: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sessionScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sessionScoreValue: {
    ...typography.subtitle,
    color: colors.goldBright,
    fontWeight: 'bold',
  },
  bandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
