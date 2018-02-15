import React, { Component } from "react"
import {
    View,
    Text,
    Image,
    ScrollView,
    Animated,
    TouchableOpacity
} from "react-native"
import { images } from "resources"
import styles from "./styles"
import { AnimatedHeader } from "components"
import InteractionContent from "./interactionContent"

class InteractionScreen extends Component {
    constructor() {
        super()

        this.state = {
            test: true
        }

        this.showInteractionDetail = this.showInteractionDetail.bind(this)
    }
    componentDidMount() {
        this.setState({})
    }
    showInteractionDetail() {
        this.props.navigator.push({
            screen: "InteractionDetailScreen",
            backButtonTitle: "Back",
            backButtonHidden: false,
            passProps: {}
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <AnimatedHeader ref="animated_Header" title="Interactions" />
                <ScrollView
                    style={{ flex: 1, paddingTop: 20 }}
                    scrollEventThrottle={1}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y:
                                        this.refs.animated_Header === undefined
                                            ? 0
                                            : this.refs.animated_Header.state
                                                  .scrollY
                                }
                            }
                        }
                    ])}
                >
                    <View style={{ flex: 1, paddingBottom: 120 }}>
                        <Text style={styles.sectionText}>
                            MY BEST FOLLOWERS
                        </Text>
                        <View style={styles.sectionView}>
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Most Likes to Me"
                                contentIcon={images.ghost1}
                                navigator={this.props.navigator} 
                                serviceType="most-likes-to-me"                                                                                               
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Most Comments to Me"
                                contentIcon={images.ghost2}
                                navigator={this.props.navigator}
                                serviceType="most-comments-to-me"                                                                                                
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Most Likes and Comments to Me"
                                contentIcon={images.ghost3}
                                navigator={this.props.navigator}
                                serviceType="most-likes-and-comments-to-me"                                                                                                                 
                            />
                        </View>
                        <Text style={styles.sectionText}>
                            MY BEST FOLLOWERS
                        </Text>
                        <View style={styles.sectionView}>
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Least Likes Given"
                                contentIcon={images.ghost1}                 
                                navigator={this.props.navigator} 
                                serviceType="least-likes-given"                                                                               
                            />
                            <InteractionContent
                                style={styles.interactionStyle}
                                contentText="Least Comments Left"
                                contentIcon={images.ghost2}  
                                navigator={this.props.navigator}
                                serviceType="least-comments-left"                                                                               
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="No Comments or Likes"
                                contentIcon={images.ghost3}  
                                navigator={this.props.navigator} 
                                serviceType="no-comments-or-likes"                                                                                                                               
                            />
                        </View>
                        <Text style={styles.sectionText}>DISCOVER</Text>
                        <View style={styles.sectionView}>
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="My Recent Favourite Users"
                                contentIcon={images.discover1}
                                navigator={this.props.navigator} 
                                serviceType="my-recent-favourite-users"                                               
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="My Best Friends"
                                contentIcon={images.discover2}
                                navigator={this.props.navigator}
                                serviceType="my-best-friends"                                                
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Users I Like But Don't Follow"
                                contentIcon={images.discover3}   
                                navigator={this.props.navigator}
                                serviceType="user-i-like-but-dont-follow"                               
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default InteractionScreen
