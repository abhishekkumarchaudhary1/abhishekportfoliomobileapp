import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { PortfolioScreen, ResumeBuilderScreen } from './src/screens';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.gray500,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray200,
          borderTopWidth: 1,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
          height: 60 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600' as const,
        },
      }}
    >
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>👤</Text>
          ),
        }}
      />
      <Tab.Screen
        name="ResumeBuilder"
        component={ResumeBuilderScreen}
        options={{
          tabBarLabel: 'Resume',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24 }}>📄</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
