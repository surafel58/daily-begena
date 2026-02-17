import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { colors, spacing, typography } from '../../src/shared/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL_STRINGS = 10;
const TODAY_STRINGS = [1, 3]; // Match today's string count for rounds

type RoundState = 'listening' | 'answered' | 'transitioning';

export default function EarCheckScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentRound, setCurrentRound] = useState(0);
  const [roundState, setRoundState] = useState<RoundState>('listening');
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedString, setSelectedString] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalRounds = TODAY_STRINGS.length;
  const targetString = TODAY_STRINGS[currentRound];

  // Animation values per string for feedback
  const feedbackOpacity = useSharedValue(0);

  const playSound = useCallback(() => {
    setIsPlaying(true);
    // Simulate playing a reference tone
    setTimeout(() => setIsPlaying(false), 1500);
  }, []);

  const handleStringPress = useCallback((stringNum: number) => {
    if (roundState !== 'listening') return;

    setSelectedString(stringNum);
    setRoundState('answered');

    const isCorrect = stringNum === targetString;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    // After feedback delay, advance
    setTimeout(() => {
      if (currentRound < totalRounds - 1) {
        setCurrentRound((prev) => prev + 1);
        setRoundState('listening');
        setSelectedString(null);
      } else {
        // All rounds complete
        router.replace('/session/results');
      }
    }, 2000);
  }, [roundState, currentRound, totalRounds, targetString]);

  const getStringColor = (stringNum: number) => {
    if (roundState !== 'answered' || selectedString === null) {
      return colors.stringInactive;
    }
    if (stringNum === targetString) return colors.success;
    if (stringNum === selectedString && selectedString !== targetString) return colors.error;
    return colors.stringInactive;
  };

  const getStringWidth = (stringNum: number) => {
    if (roundState === 'answered') {
      if (stringNum === targetString) return 4;
      if (stringNum === selectedString) return 3;
    }
    return 1.5;
  };

  const stringSpacing = SCREEN_WIDTH / (TOTAL_STRINGS + 1);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Progress */}
      <View style={styles.header}>
        <Text style={styles.roundText}>
          Round {currentRound + 1} of {totalRounds}
        </Text>
        <Text style={styles.scoreText}>
          {correctCount}/{currentRound + (roundState === 'answered' ? 1 : 0)} correct
        </Text>
      </View>

      {/* Instruction */}
      <View style={styles.instruction}>
        {roundState === 'listening' && !isPlaying && (
          <Pressable onPress={playSound} style={styles.listenButton}>
            <Text style={styles.listenIcon}>▶</Text>
            <Text style={styles.listenText}>Listen</Text>
          </Pressable>
        )}
        {roundState === 'listening' && isPlaying && (
          <Text style={styles.playingText}>Playing...</Text>
        )}
        {roundState === 'listening' && !isPlaying && (
          <Text style={styles.promptText}>Which string was that?</Text>
        )}
        {roundState === 'answered' && selectedString === targetString && (
          <Text style={[styles.feedbackText, { color: colors.success }]}>Correct!</Text>
        )}
        {roundState === 'answered' && selectedString !== targetString && (
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, { color: colors.error }]}>
              Not quite
            </Text>
            <Text style={styles.correctAnswer}>
              It was String {targetString}
            </Text>
          </View>
        )}
      </View>

      {/* Strings */}
      <View style={styles.stringsArea}>
        {Array.from({ length: TOTAL_STRINGS }, (_, i) => {
          const stringNum = i + 1;
          const stringColor = getStringColor(stringNum);
          const stringWidth = getStringWidth(stringNum);
          const showCheckmark = roundState === 'answered' && stringNum === targetString;

          return (
            <Pressable
              key={stringNum}
              style={[
                styles.stringTouchArea,
                { left: stringSpacing * stringNum - 20 },
              ]}
              onPress={() => handleStringPress(stringNum)}
              disabled={roundState !== 'listening'}
            >
              <View
                style={[
                  styles.string,
                  {
                    width: stringWidth,
                    backgroundColor: stringColor,
                    shadowColor: stringColor !== colors.stringInactive ? stringColor : 'transparent',
                    shadowOpacity: stringColor !== colors.stringInactive ? 0.8 : 0,
                    shadowRadius: stringColor !== colors.stringInactive ? 10 : 0,
                  },
                ]}
              />
              {/* String number label */}
              <View style={styles.stringLabel}>
                <Text style={[
                  styles.stringLabelText,
                  { color: stringColor !== colors.stringInactive ? stringColor : colors.textSecondary },
                ]}>
                  {stringNum}
                </Text>
              </View>
              {/* Checkmark */}
              {showCheckmark && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Skip */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Pressable onPress={() => router.replace('/session/results')}>
          <Text style={styles.skipText}>Skip</Text>
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
  header: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  scoreText: {
    ...typography.caption,
    color: colors.goldBright,
  },
  instruction: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    minHeight: 120,
    justifyContent: 'center',
  },
  listenButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.teal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  listenIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  listenText: {
    ...typography.small,
    color: colors.textPrimary,
    marginTop: 2,
  },
  playingText: {
    ...typography.subtitle,
    color: colors.tealLight,
  },
  promptText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  feedbackText: {
    ...typography.title,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  correctAnswer: {
    ...typography.body,
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
  },
  string: {
    height: '100%',
    borderRadius: 1,
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  stringLabel: {
    position: 'absolute',
    bottom: 20,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
  stringLabelText: {
    ...typography.small,
    fontWeight: 'bold',
  },
  checkmark: {
    position: 'absolute',
    top: '40%',
    backgroundColor: colors.success,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  skipText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
