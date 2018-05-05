import React from "react";
import { StatusBar, View } from "react-native";
import MainNavigation from "./src/routes/MainNavigation";
import NavigationService from "./src/routes/NavigationService";

export default class App extends React.Component {
  render() {
    return (
      <MainNavigation
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
