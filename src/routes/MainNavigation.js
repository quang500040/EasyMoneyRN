import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import { StyleSheet } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddActivityScreen from "../screens/AddActivityScreen";
import CameraScreen from "../screens/CameraScreen";

import Colors from "../themes/Colors";
import Rn from "../routes/RouteName";

MainNavigation = StackNavigator(
  {
    [Rn.Home]: {
      screen: HomeScreen
    }
  },
  { initialRouteName: Rn.Home }
);

LoginNavigation = StackNavigator(
  {
    [Rn.Login]: {
      screen: LoginScreen
    }
  },
  { initialRouteName: Rn.Login }
);

export default (TabBar = TabNavigator(
  {
    [Rn.Home]: {
      screen: MainNavigation
    },
    [Rn.Add]: {
      screen: AddActivityScreen,
      mode: "modal"
    },
    [Rn.Camera]: {
      screen: CameraScreen
    },
    [Rn.Login]: {
      screen: LoginNavigation
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === Rn.Home) {
          iconName = `ios-cash${focused ? "" : "-outline"}`;
        } else if (routeName === Rn.Login) {
          iconName = `ios-contact${focused ? "" : "-outline"}`;
        } else if (routeName === Rn.Camera) {
          iconName = `ios-camera${focused ? "" : "-outline"}`;
        } else if (routeName === Rn.Add) {
          iconName = `ios-add${focused ? "" : "-outline"}`;
          return <Ionicons name={iconName} size={40} color={tintColor} />;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.default_blue,
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "#fff",
        height: 45,
        padding: 0,
        margin: 0
      },

      showLabel: false
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false
  }
));
