import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../src/shared/ui/theme';

const TAB_MARGIN = spacing.xl; // 20px — matches dashboard content edges

function TabIcon({ name, focused }: { name: keyof typeof Ionicons.glyphMap; focused: boolean }) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={name}
        size={22}
        color={focused ? colors.goldBright : colors.textSecondary}
      />
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: [styles.tabBar, { bottom: Math.max(insets.bottom, 16) }],
        tabBarActiveTintColor: colors.goldBright,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="drills"
        options={{
          title: 'DRILLS',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'musical-notes' : 'musical-notes-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    marginHorizontal: TAB_MARGIN,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.surfaceLight,
    overflow: 'hidden',
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 0,
    height: 64,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
});
