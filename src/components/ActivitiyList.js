import React from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import ActivityItem from "./ActivityItem";
import LocalImage from "../images/local";

export default class ActivityList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.ShowAlertWithDelay();
    // this.loadData();
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

  ShowAlertWithDelay() {
    setTimeout(() => {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      var items = [
        {
          name: "Morning1",
          img: "",
          total: "200000",
          dominateColor: "#DCCCCE"
        },
        {
          name: "Morning2",
          img: LocalImage.listImg2,
          total: "150000",
          dominateColor: "#233949"
        },
        {
          name: "Afternoon",
          img: LocalImage.listImg3,
          total: "210000",
          dominateColor: "#BEBEBE"
        },
        {
          name: "Evening",
          img: LocalImage.listImg4,
          total: "90000",
          dominateColor: "#ADCAD4"
        },
        {
          name: "Midnight",
          img: LocalImage.listImg5,
          total: "230000",
          dominateColor: "#926A5F"
        }
      ];

      this.setState({ data: items });
    }, 0.5);
  }

  onPressItem = item => { };

  renderItem = ({ item }) => (
    <ActivityItem onPressItem={this.onPressItem} item={item} />
  );

  render() {
    const { loading, data, page, seed, error, refreshing } = this.state;

    var items = [
      { name: "Morning", img: "", total: "200000" },
      { name: "Morning", img: LocalImage.listImg2, total: "150000" },
      { name: "Afternoon", img: LocalImage.listImg3, total: "210000" },
      {
        name: "Evening",
        img: LocalImage.listImg4,
        total: "90000"
      },
      { name: "Midnight", img: LocalImage.listImg5, total: "230000" }
    ];

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}
