import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import ReservesScreen from "../screens/ReservesScreen";
import OrdersScreen from "../screens/OrdersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Icon } from "expo";

/* const activeColor = "#4775f2";
const inactiveColor = "#b8bece"; */

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen
  },
  {
    mode: "modal"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Section") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Inicio",
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        name="ios-home"
        size={26}
        color={focused ? "#fff" : "#5d5749"}
      />
    )
  };
};

const ReservesStack = createStackNavigator({
  Reserves: ReservesScreen
});

ReservesStack.navigationOptions = {
  tabBarLabel: "Solicitudes",
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-chatboxes"
      size={26}
      color={focused ? "#fff" : "#5d5749"}
    />
  )
};

const OrdersStack = createStackNavigator({
  Orders: OrdersScreen
});

OrdersStack.navigationOptions = {
  tabBarLabel: "Ordenes",
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-cart"
      size={26}
      color={focused ? "#fff" : "#5d5749"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Ajustes",
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      name="ios-settings"
      size={26}
      color={focused ? "#fff" : "#5d5749"}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    ReservesStack,
    OrdersStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      inactiveTintColor: "#5d5749",
      style: {
        backgroundColor: "#000"
      }
    }
  }
);

export default TabNavigator;
