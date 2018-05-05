import React from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import Colors from "../themes/Colors";
import Swiper from "react-native-swiper";
import ActivityList from "../components/ActivitiyList";

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: styles.header,
    headerTitle: <Text style={styles.title}>Activities</Text>,
    tabBarOnPress: (tab, jumpToIndex) => {
      if (!tab.focused) {
        tab.jumpToIndex(tab.scene.index);
        console.log(tab);
      }
    }
  });

  constructor(props) {
    super(props);
    console.disableYellowBox = true;

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  loadData() {
    const url = `https://randomuser.me/api/?seed=1&page=1&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Swiper
          horizontal={true}
          style={styles.wrapper}
          showsPagination={false}
          showsHorizontalScrollIndicator={false}
          showsButtons={false}
        >
          <View style={styles.slide}>

            <ActivityList style={styles.flatList} />
          </View>
        </Swiper>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.default_blue
  },
  topPanel: {
    height: 100
  },
  title: {
    fontSize: 16,
    color: "#fff"
  },
  wrapper: {},
  slide: {
    paddingTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  flatList: {}
});
