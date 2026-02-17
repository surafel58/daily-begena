import { StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors, radius, spacing, typography } from './theme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    })
    .onEnd(() => {
      onPress();
    })
    .runOnJS(true);

  const variantStyles = variantMap[variant];

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.base, variantStyles.container, style, animatedStyle]}>
        <Text style={[styles.label, variantStyles.label, textStyle]}>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const variantMap = {
  primary: {
    container: {
      backgroundColor: colors.goldMuted,
      shadowColor: colors.goldMuted,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    } as ViewStyle,
    label: {
      color: colors.bg,
      fontWeight: 'bold',
    } as TextStyle,
  },
  outline: {
    container: {
      backgroundColor: colors.transparent,
      borderWidth: 1.5,
      borderColor: colors.goldMuted,
    } as ViewStyle,
    label: {
      color: colors.goldMuted,
      fontWeight: '600',
    } as TextStyle,
  },
  secondary: {
    container: {
      backgroundColor: colors.teal,
    } as ViewStyle,
    label: {
      color: colors.textPrimary,
      fontWeight: '600',
    } as TextStyle,
  },
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['3xl'],
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.body,
  },
});
