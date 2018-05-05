import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import { StyleSheet, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import SimpleScreen from "../screens//AddActivityScreens/SimpleScreen";

import Colors from "../themes/Colors";
import Rn from "../routes/RouteName";
import ActionSheet from "../helpers/actionsheet";

HomeNavigation = StackNavigator(
  {
    [Rn.Home]: {
      screen: HomeScreen
    }
  },
  { initialRouteName: Rn.Home }
);

CameraNavigation = StackNavigator(
  {
    [Rn.Camera]: {
      screen: CameraScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

TabBar = TabNavigator(
  {
    [Rn.Login]: {
      screen: LoginScreen
    },
    [Rn.Add]: {
      screen: SimpleScreen
    },

    [Rn.Home]: {
      screen: HomeScreen
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
      },
      tabBarOnPress: (tab, jumpToIndex) => {
        if (!tab.focused) {
          if (tab.scene.index == 1) {
            ActionSheet.showMenuAddActivity(navigation);
          } else {
            tab.jumpToIndex(tab.scene.index);
          }
        }
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
      onTabPress: tab => {
        // onTabPress stuff here..
      },
      showLabel: false
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false
  }
);
export default (MainNavigation = StackNavigator(
  {
    [Rn.Login]: {
      screen: TabBar
    },
    [Rn.Camera]: {
      screen: CameraNavigation
    },
    [Rn.Simple]: {
      screen: SimpleScreen
    }
  },
  { initialRouteName: Rn.Login }
));
