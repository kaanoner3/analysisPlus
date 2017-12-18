import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

const MIN_PULL_DISTANCE = -60

class CustomRefreshControll extends Component {
   constructor() {
      super()
      this.state = { scrollY: new Animated.Value(0), scrollYAlternative: new Animated.Value(0), shouldTriggerRefresh: false, isScrollFree: true }

      this.onScrollTrigger = this.onScrollTrigger.bind(this)
      this.onScrollRelease = this.onScrollRelease.bind(this)
   }
   componentDidMount() {
      this.state.scrollY.addListener((value) => this.onScrollTrigger(value))
   }
   componentWillUnmount() {
      this.state.scrollY.removeAllListeners()
   }
   componentWillReceiveProps(nextProps) {
      //console.log(nextProps)
      if (this.props.isRefreshing !== nextProps.isRefreshing) {
         if (!nextProps.isRefreshing) {
           // this.refs.PTR_ScrollComponent.scrollToOffset({ x: 0, y: 0, animated: true })
            this.setState({ isScrollFree: true })
         }
      }
   }
   onScrollTrigger(distance) {
      if (distance.value <= -this.props.minPullDistance) {
         if (!this.state.shouldTriggerRefresh) {
            return this.setState({ shouldTriggerRefresh: true })
         }
      } else if (this.state.shouldTriggerRefresh) {
         return this.setState({ shouldTriggerRefresh: false })
      }
   }
   onScrollRelease() {
      console.log('onScroolRelease')
      if (!this.props.isRefreshing && this.state.shouldTriggerRefresh) {
         //this.refs.PTR_ScrollComponent.scrollToOffset({ y: -this.props.minPullDistance })
         this.setState({ isScrollFree: false })
         this.props.onRefresh()
      }
   }
   render() {
      //console.log('refs', this.refs.PTR_ScrollComponent.props.ListHeaderComponent)
      const onScroll = this.props.onScroll
      let onScrollEvent = (event) => {
         if (onScroll) {
            //console.log(event.nativeEvent.contentOffset.y)
            onScroll(event)
         }
         this.state.scrollY.setValue(event.nativeEvent.contentOffset.y)
      };
      let animateHeight = this.state.scrollY.interpolate({
         inputRange: [-this.props.minPullDistance, 0],
         outputRange: [0, 0]
      });
      if (this.refs !== {}) {
         return (
            <View style={{ flex: 1, zIndex: -100, backgroundColor: this.props.contentBackgroundColor }}>
               <Animated.View style={{ height: animateHeight, backgroundColor: this.props.PTRbackgroundColor }}>

               </Animated.View>
               <View style={styles.contentView}>
                  {React.cloneElement(this.props.contentComponent, {
                     scrollEnabled: this.state.isScrollFree,
                     onScroll: onScrollEvent,
                     scrollEventThrottle: 16,
                     onResponderRelease: this.onScrollRelease.bind(this),
                     ref: 'PTR_ScrollComponent'
                  })}
               </View>
            </View>
         )
      }
   }
}
CustomRefreshControll.propTypes = {
   isRefreshing: PropTypes.bool.isRequired,
   onRefresh: PropTypes.func.isRequired,
   onRefresh: PropTypes.func.isRequired,
   contenetComponent: PropTypes.object.isRequired,
   minPullDistance: PropTypes.number,
   onScroll: PropTypes.func,
   onScrollAlternative: PropTypes.func,
   contentBackgroundColor: PropTypes.string,
}
CustomRefreshControll.defaultProps = {
   minPullDistance: 60
}

export default CustomRefreshControll