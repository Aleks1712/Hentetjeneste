import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParentHomeScreen } from '../screens/ParentHomeScreen';
import { StaffChecklistScreen } from '../screens/StaffChecklistScreen';
import { DailyInfoEditorScreen } from '../screens/DailyInfoEditorScreen';

export type RootStackParamList = {
  ParentHome: undefined;
  StaffChecklist: undefined;
  DailyInfoEditor: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  // TODO: Implement role-based navigation
  // For now, we'll show both parent and staff screens
  const userRole = 'staff'; // Replace with actual user role from auth

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={userRole === 'staff' ? 'StaffChecklist' : 'ParentHome'}
      >
        {/* Parent screens */}
        <Stack.Screen name="ParentHome" component={ParentHomeScreen} />

        {/* Staff screens */}
        <Stack.Screen name="StaffChecklist" component={StaffChecklistScreen} />
        <Stack.Screen name="DailyInfoEditor" component={DailyInfoEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
