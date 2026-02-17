import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../src/shared/ui/theme';

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconActive]}>
      <View style={styles.iconText}>
        <IconChar char={icon} focused={focused} />
      </View>
    </View>
  );
}

function IconChar({ char, focused }: { char: string; focused: boolean }) {
  const { Text } = require('react-native');
  return (
    <Text style={{
      fontSize: 22,
      color: focused ? colors.goldBright : colors.textSecondary,
    }}>
      {char}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.goldBright,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        headerStyle: styles.header,
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="⌂" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="drills"
        options={{
          title: 'Drills',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="♪" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="◉" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.surfaceLight,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  header: {
    backgroundColor: colors.bg,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  iconActive: {
    // Could add a subtle glow effect here
  },
  iconText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
