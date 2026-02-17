import { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { colors, radius, spacing } from './theme';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  pressable?: boolean;
}

export function Card({ children, style, onPress, pressable = true }: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const gesture = Gesture.Tap()
    .onBegin(() => {
      if (pressable) {
        scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
      }
    })
    .onFinalize(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    })
    .onEnd(() => {
      if (onPress) {
        onPress();
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.card, style, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },
});
