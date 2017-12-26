import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Animated } from 'react-native'
import { images } from 'resources'
import styles from './styles'
import { AnimatedHeader } from "components"
import InteractionContent from './interactionContent'

class InteractionScreen extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.setState({})
    }

    render() {
        return (
            <View style={styles.container}>
                <AnimatedHeader ref='animated_Header' title='Interactions' />
                <ScrollView
                    style={{ flex: 1, marginTop: 107 }}
                    scrollEventThrottle={1}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y:
                                        this.refs.animated_Header === undefined
                                            ? 0
                                            : this.refs.animated_Header.state.scrollY
                                }
                            }
                        }
                    ])}
                >
                    <View style={{ flex: 1 }} >
                        <Text style={styles.sectionText} >MY BEST FOLLOWERS</Text>
                        <View style={styles.sectionView}>
                            <InteractionContent style={styles.interactionStyle} contentText='Most Likes to Me' />
                            <InteractionContent style={styles.interactionStyle} contentText='Most Comments to Me' />
                            <InteractionContent style={styles.interactionStyle} contentText='Most Likes and Comments to Me' />
                        </View>
                        <Text style={styles.sectionText} >MY BEST FOLLOWERS</Text>
                        <View style={styles.sectionView}>
                            <InteractionContent style={styles.interactionStyle} contentText='Least Likes Given' />
                            <InteractionContent style={styles.interactionStyle} contentText='Least Comments Left' />
                            <InteractionContent style={styles.interactionStyle} contentText='No Comments or Likes' />
                        </View>
                        <Text style={styles.sectionText} >DISCOVER</Text>
                        <View style={styles.sectionView}>
                            <InteractionContent style={styles.interactionStyle} contentText='Least Likes Given' />
                            <InteractionContent style={styles.interactionStyle} contentText='Least Comments Left' />
                            <InteractionContent style={styles.interactionStyle} contentText='No Comments or Likes' />
                        </View>
                    </View>
                </ScrollView>

            </View>
        )
    }
}

export default InteractionScreen

