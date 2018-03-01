import React, { Component } from "react"
import {
    View,
    Text,
    Image,
    ScrollView,
    Animated,
    TouchableOpacity
} from "react-native"
import { images,languages } from "resources"
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
                           {languages.t("interaction_my_best_followers")}
                        </Text>
                        <View style={styles.sectionView}>
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_most_likes_to_me")}
                                contentIcon={images.ghost1}
                                navigator={this.props.navigator} 
                                serviceType="most_likes_to_me"                                                                                               
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_most_comments_to_me")}
                                contentIcon={images.ghost2}
                                navigator={this.props.navigator}
                                serviceType="most_comments_to_me"                                                                                                
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_most_likes_and_comments_to_me")}
                                contentIcon={images.ghost3}
                                navigator={this.props.navigator}
                                serviceType="most_likes_and_comments_to_me"                                                                                                                 
                            />
                        </View>
                        <Text style={styles.sectionText}>
                            {languages.t("interaction_ghost_followers")}
                        </Text>
                        <View style={styles.sectionView}>
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_least_likes_given")}
                                contentIcon={images.ghost1}                 
                                navigator={this.props.navigator} 
                                serviceType="least_likes_given"                                                                               
                            />
                            <InteractionContent
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_least_comments_left")}
                                contentIcon={images.ghost2}  
                                navigator={this.props.navigator}
                                serviceType="least_comments_left"                                                                               
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_no_comments_or_likes")}
                                contentIcon={images.ghost3}  
                                navigator={this.props.navigator} 
                                serviceType="no_comments_or_likes"                                                                                                                               
                            />
                        </View>
                        <Text style={styles.sectionText}>{languages.t("interaction_discover")}</Text>
                        <View style={styles.sectionView}>
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_my_favourite_users")}
                                contentIcon={images.discover1}
                                navigator={this.props.navigator} 
                                serviceType="my_recent_favourite_users"                                               
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_my_best_friends")}
                                contentIcon={images.discover2}
                                navigator={this.props.navigator}
                                serviceType="my_best_friends"                                                
                            />
                            <InteractionContent
                                onPress={this.showInteractionDetail}
                                style={styles.interactionStyle}
                                contentText={languages.t("interaction_users_i_like_butdont_follow")}
                                contentIcon={images.discover3}   
                                navigator={this.props.navigator}
                                serviceType="user_i_like_butdont_follow"                               
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default InteractionScreen
