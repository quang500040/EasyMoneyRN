import React from "react";
import {
  Button,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

export default class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 125,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ImageBackground
            source={this.props.item.img}
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>{this.props.item.name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}
