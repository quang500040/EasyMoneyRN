import React from "react";
import {
  Dimensions,
  Button,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import ColorHelper from "../helpers/color";
import FormatHelper from "../helpers/format";
import Icon from "react-native-vector-icons/FontAwesome";

class ActivityItemContent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View
          style={[
            { borderBottomColor: this.props.item.dominateColor + "90" },
            styles.trapezoidStyle
          ]}
        />
        <Icon style={styles.icon} name="edit" size={25} />;
        <Text style={styles.money}>
          {FormatHelper.convertToVND(this.props.item.total)}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.name}>{this.props.item.name}</Text>
      </View>
    );
  }
}

export default class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.cell}>
        <View style={styles.wrapper}>
          {this.props.item.img != "" && (
            <ImageBackground source={this.props.item.img} style={styles.imgBG}>
              <ActivityItemContent item={this.props.item} />
            </ImageBackground>
          )}

          {this.props.item.img == "" && (
            <View style={styles.viewBG}>
              <ActivityItemContent item={this.props.item} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

var width = Dimensions.get("window").width;

let styles = StyleSheet.create({
  border: {
    // color: ColorHelper.randomColor()
  },
  icon: {
    top: 20,
    color: "#FFF",
    left: 20,
    position: "absolute"
  },
  separator: {
    width: 100,
    height: 2,
    bottom: 50,
    left: 20,
    position: "absolute",
    backgroundColor: "#FFF"
  },
  money: {
    bottom: 60,
    left: 20,
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF"
  },
  name: {
    bottom: 20,
    left: 20,
    position: "absolute",
    fontSize: 18,
    color: "#FFF"
  },
  cell: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 7,
    overflow: "hidden"
  },
  wrapper: {
    width: width,
    justifyContent: "center",
    alignItems: "center"
  },
  viewBG: {
    width: "100%",
    backgroundColor: "#233949",
    height: 170
  },
  imgBG: {
    width: "100%",
    height: 170
  },
  trapezoidStyle: {
    width: 160,
    height: 0,
    borderBottomWidth: 170,
    borderRightWidth: 50,
    borderRightColor: "transparent",
    borderLeftColor: "transparent"
  }
});
