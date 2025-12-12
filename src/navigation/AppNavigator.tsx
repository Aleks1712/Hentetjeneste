import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../context-native/ThemeContext';
import { useTranslation } from '../translations-native/translations';
import { ParentHomeScreen } from '../screens-native/ParentHomeScreen';
import { StaffChecklistScreen } from '../screens-native/StaffChecklistScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors, role, language } = useTheme();
  const t = useTranslation(language);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  if (!isLoggedIn) {
    return null; // This will be handled by App.tsx
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {role === 'parent' ? (
        <>
          <Tab.Screen
            name="Home"
            component={ParentHomeScreen}
            options={{
              tabBarLabel: t.home,
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              tabBarLabel: t.notifications,
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="bell" color={color} size={size} />
              ),
              tabBarBadge: 2,
            }}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: t.profile,
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="user" color={color} size={size} />
              ),
            }}
          >
            {() => <ProfileScreen onLogout={() => setIsLoggedIn(false)} />}
          </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen
            name="Checklist"
            component={StaffChecklistScreen}
            options={{
              tabBarLabel: t.checklist,
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="checklist" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              tabBarLabel: t.notifications,
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="bell" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: t.profile,
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="user" color={color} size={size} />
              ),
            }}
          >
            {() => <ProfileScreen onLogout={() => setIsLoggedIn(false)} />}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
}

// Simple icon component (using text emojis for simplicity)
function TabIcon({ name, color, size }: { name: string; color: string; size: number }) {
  const icons: { [key: string]: string } = {
    home: '🏠',
    bell: '🔔',
    user: '👤',
    checklist: '✓',
    stats: '📊',
  };

  return (
    <Text style={{ fontSize: size }}>
      {icons[name] || '•'}
    </Text>
  );
}