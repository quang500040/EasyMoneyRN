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

let styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.default_blue
  },
  title: {
    fontSize: 16,
    color: "#fff"
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: styles.header,
    headerTitle: <Text style={styles.title}>Activities</Text>
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
      <Swiper
        horizontal={true}
        style={styles.wrapper}
        showsPagination={false}
        showsHorizontalScrollIndicator={false}
        showsButtons={false}
      >
        <View style={styles.slide1}>
          <ActivityList />
        </View>
        <View style={styles.slide2}>
          <ActivityList />
        </View>
        <View style={styles.slide3}>
          <ActivityList />
        </View>
      </Swiper>
    );
  }
}
