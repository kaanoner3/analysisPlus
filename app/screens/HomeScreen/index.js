

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl, Animated, ImageBackground, Dimensions, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import { HomeScreenHeader, CustomRefreshControll } from "components"
import { images } from 'resources'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';

const statistic_data =
  [
    { text1: 12, text2: 'GAINED FOLLOWERS' },
    { text1: 29, text2: 'LOSTED FOLLOWERS' },
    { text1: 245, text2: 'PROFILE VISITORS' },
    { text1: 4, text2: 'USER BLOCKING ME' },
    { text1: 57, text2: 'STALKERS' },
    { text1: 7, text2: 'DELETED COMMENT' },
    { text1: 33, text2: 'USERS NOT FOLLOWING ME' },
    { text1: 33, text2: 'USERS NOT FOLLOWED BY ME' },
    { text1: 33, text2: 'DENEME 1' },
    { text1: 33, text2: 'DENEME 2' },

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
    })
  }
  renderList({ item, index }) {
    if (index % 2 === 0) {
      return (
        <View style={index === 0 ? { backgroundColor: '#152341', borderTopLeftRadius: 15, paddingTop: 10 } : { backgroundColor: '#152341' }} >
          <View style={styles.contentLeftItem} >
            <Text style={styles.infoText} >{item.text2}</Text>
            <View style={styles.statisticView}>
              <Text style={styles.statisticText} >{item.text1}</Text>
              <View style={styles.arrowView}>
                <Image source={images.gainArrow} />
                <Text style={styles.gainText}>2</Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View style={index === 1 ? { backgroundColor: '#152341', borderTopRightRadius: 15, paddingTop: 10 } : { backgroundColor: '#152341' }} >
          <View style={styles.contentRightItem} >
            <Text style={styles.infoText} >{item.text2}</Text>
            <View style={styles.statisticView}>
              <Text style={styles.statisticText} >{item.text1}</Text>
              <View style={styles.arrowView}>
                <Image source={images.lostArrow} />
                <Text style={styles.lostText}>2</Text>
              </View>
            </View>
          </View>
        </View>

      )
    }

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
    return (
      <View style={styles.container}>
        <ImageBackground source={images.bgTest} style={{ height: 300, backgroundColor: 'transparent',position:'absolute', top:0,left:0,right:0 }} >
          <LinearGradient colors={['#5D4ED3','#059ED9' ,'#059ED9']} style={styles.linearGradient}>
          </LinearGradient>
        </ImageBackground>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginTop: 28, paddingHorizontal: 20 }} >
          <TouchableOpacity>
            <Image source={images.headerSettingsIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.headerSearchIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
          <View style={{ marginTop: 20, flex: 1 }} >
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
                  //  contentContainerStyle={{backgroundColor:'red'}}
                  renderItem={this.renderList}
                  numColumns={2}
                  scrollEventThrottle={1}
                />
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen


/*
        <Animated.Image style={[styles.imageStyle, { height: 280, }]} source={images.backgroundImage} >
        </Animated.Image>
*/