import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Colors from "../themes/Colors";

let styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.default_blue
  },
  title: {
    fontSize: 16,
    color: "#fff"
  }
});

export default class CameraScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: styles.header,
    headerTitle: <Text style={styles.title}>Camera</Text>
  });

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Camera Screen</Text>
      </View>
    );
  }
}
