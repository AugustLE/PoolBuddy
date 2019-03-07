import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PoolScreen from '../screens/PoolScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GlobalStyles from '../GlobalStyles';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
  navigationOptions: {
    headerTitle: 'Profile',
    headerStyle: {
      backgroundColor: GlobalStyles.themeColor
    },
    headerTintColor: 'white'
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PoolStack = createStackNavigator({
  Pool: PoolScreen,
}, {
  navigationOptions: {
    headerTitle: ''
  }
});

PoolStack.navigationOptions = {
  tabBarLabel: 'Pool',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
}, {
  navigationOptions: {
    headerTitle: 'Settings'
  }
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const MainTabNavigator = createBottomTabNavigator({
  Home: { screen: HomeStack },
  Pool: { screen: PoolStack },
  Settings: { screen: SettingsStack },
}, { tabBarOptions: {
    //activeTintColor: 'green',
    inactiveTintColor: 'gray',
  }
});

export default MainTabNavigator;
