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

  onPressItem = item => {};

  renderItem = ({ item }) => (
    <ActivityItem onPressItem={this.onPressItem} item={item} />
  );

  render() {
    var items = [
      { name: "Hiển thị tất cả", img: LocalImage.listImg1 },
      { name: "Tìm kiếm theo Hero", img: LocalImage.listImg2 },
      { name: "Tìm kiếm theo tên", img: LocalImage.listImg3 },
      { name: "Tìm kiếm theo Quality", img: LocalImage.listImg4 },
      { name: "Tìm kiếm theo giá", img: LocalImage.listImg5 }
    ];

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}
