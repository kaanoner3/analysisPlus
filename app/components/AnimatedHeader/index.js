import React, { Component } from "react";
import { Text, View, Image, Dimensions, Animated, TouchableOpacity } from "react-native";
import styles from './styles';
import { images } from 'resources';

const HEADER_MAX_HEIGHT = 107;
const HEADER_MIN_HEIGHT = 64;
const HEADERX_MIN_HEIGHT = 84
const HEADERX_MAX_HEIGHT = 131
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const screenHeight = Dimensions.get('window').height

class AnimatedHeader extends Component {
  constructor() {
    super();
    this.state = { scrollY: new Animated.Value(0), headerX: false };
  }
  componentWillMount() {
    if (screenHeight === 812) {
      this.setState({ headerX: true })
    } else {
      this.setState({ headerX: false })
    }

  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const headerXHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADERX_MAX_HEIGHT, HEADERX_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const textOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    const color = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ['#152341', '#192A4F'],
      extrapolate: "clamp"
    });
    return (
      <Animated.View style={this.state.headerX === false ? [styles.containerView, { height: headerHeight, backgroundColor: color }] : [styles.headerXContainer, { height: headerXHeight, backgroundColor: color }]}>
        <View style={this.state.headerX === false ? { flexDirection: 'column' } : { flexDirection: 'column', paddingTop: 24 }}>
          <TouchableOpacity style={{ width: 50, position: 'absolute', height: 50, marginLeft: 20, }} onPress={this.props.onPress}>
            <Image style={{ height: 16, width: 10, marginTop: 35, resizeMode: 'contain' }} source={images.headerBackButton} />
          </TouchableOpacity>
          <Animated.Text style={[styles.animatedText, { opacity: textOpacity, }]}>
            {this.props.title}
          </Animated.Text>
        </View>
        <View style={this.state.headerX === true ? styles.titleXView : styles.titleView}>
          <Text
            style={styles.titleTextStyle}
          >{this.props.title}</Text>
        </View>
      </Animated.View>
    );
  }
}
export default AnimatedHeader;

/*
*/