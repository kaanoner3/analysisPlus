

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl, Animated, ImageBackground, Dimensions, ScrollView, Image
} from 'react-native';
import { HomeScreenHeader, CustomRefreshControll } from "components"
import { images } from 'resources'

const statistic_data =
  [
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
  ];
const width = Dimensions.get('window').width
class HomeScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  constructor() {
    super()
    this.renderList = this.renderList.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)

    this.state = { loading: true, scrollY: new Animated.Value(0) }
    this.state.scrollY.addListener((scrolly) => {
      // console.log("listener", scrolly.value)
    })
  }
  renderList({ item }) {
    return (
      <View style={{ flex: 1, backgroundColor: '#192A4F', width: 162, height: 96, marginTop: 10, marginLeft: 10, marginRight: 10 }} >
        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 30, marginVertical: 24 }} >{item.text1}</Text>
      </View>
    )
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.setState({})
    this.handleRefresh()
  }
  handleRefresh() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1500)
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 240],
      outputRange: [280, 76]
    })

    // console.log(this.state.scrollY)
    return (
      <View style={styles.container}>
        <Image source={images.backgroundImage} style={{ height: 280, position: 'absolute' }} />
        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
          <CustomRefreshControll
            isRefreshing={this.state.loading}
            onRefresh={this.handleRefresh}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    y:
                    this.refs.header === undefined
                      ? 0
                      : this.refs.header.state.scrollY
                  }
                }
              }
            ])}
            contentComponent={
              <FlatList
                ListHeaderComponent={
                  <HomeScreenHeader ref='header' loading={this.state.loading} />
                }
                style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: -20, }}
                data={statistic_data}
                renderItem={this.renderList}
                numColumns={2}
                scrollEventThrottle={16}
              />
            }
          />

        </View>
      </View>
    );
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152341',
  },
  imageStyle: { width: width }
});
/*
        <Animated.Image style={[styles.imageStyle, { height: 280, }]} source={images.backgroundImage} >
        </Animated.Image>
*/