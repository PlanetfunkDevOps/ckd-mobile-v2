import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import ReservesScreen from '../screens/ReservesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ProposalsScreen from '../screens/ProposalsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import * as Icon from '@expo/vector-icons';
import VideoScreen from '../screens/VideoScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
    Video: VideoScreen
  },
  {
    mode: 'modal'
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'Section' || routeName == 'Video') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Inicio',
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        name='ios-home'
        size={26}
        color={focused ? '#fff' : '#5d5749'}
      />
    )
  };
};

const ReservesStack = createStackNavigator({
  Reserves: ReservesScreen
});

ReservesStack.navigationOptions = {
  tabBarLabel: 'Solicitudes',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name='ios-chatboxes'
      size={26}
      color={focused ? '#fff' : '#5d5749'}
    />
  )
};

const OrdersStack = createStackNavigator(
  {
    Orders: OrdersScreen,
    OrderDetail: OrderDetailScreen,
    Proposals: ProposalsScreen
  },
  {
    mode: 'modal'
  }
);

OrdersStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == 'OrderDetail' || routeName == 'Proposals') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Ordenes',
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        name='ios-cart'
        size={26}
        color={focused ? '#fff' : '#5d5749'}
      />
    )
  };
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Ajustes',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name='ios-settings'
      size={26}
      color={focused ? '#fff' : '#5d5749'}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    ReservesStack,
    HomeStack,
    OrdersStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#5d5749',
      style: {
        backgroundColor: '#000'
      }
    }
  }
);

export default TabNavigator;
