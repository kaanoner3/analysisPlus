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
                    style={{ flex: 1, paddingTop: 107 }}
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
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Most Comments to Me"
                                contentIcon={images.ghost2}                 
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Most Likes and Comments to Me"
                                contentIcon={images.ghost3}                 
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

                            />
                            <InteractionContent
                                style={styles.interactionStyle}
                                contentText="Least Comments Left"
                                contentIcon={images.ghost2}                 
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="No Comments or Likes"
                                contentIcon={images.ghost3}                 
                            />
                        </View>
                        <Text style={styles.sectionText}>DISCOVER</Text>
                        <View style={styles.sectionView}>
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Least Likes Given"
                                contentIcon={images.discover1}
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="Least Comments Left"
                                contentIcon={images.discover2}
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText="No Comments or Likes"
                                contentIcon={images.discover3}                 
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default InteractionScreen
