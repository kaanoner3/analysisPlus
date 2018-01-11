import React, { Component } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from './styles';
import { images } from 'resources';
import { StaticHeader } from "components";

const height = Dimensions.get('window').height

class InteractionDetailScreen extends Component {
    constructor() {
        super()
        this.renderBackButton = this.renderBackButton.bind(this)
        this.backButtonPress = this.backButtonPress.bind(this)

        this.hideBackButton = false
        this.state = { headerX: false }
    }
    componentWillMount() {
        if (height === 812) {
            this.setState({ headerX: true })
        } else {
            this.setState({ headerX: false })
        }
    }
    backButtonPress() {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        })
    }
    renderBackButton() {
        return (
            <TouchableOpacity style={styles.button} onPress={() => this.backButtonPress()}>
                <Image style={styles.buttonImage} source={images.headerBackButton} />
            </TouchableOpacity>
        )

    }
    render() {
        return (
            <View style={{flex:1}}>
                <StaticHeader title="Most Likes to Me" navigator={this.props.navigator} />
                <Image source={images.bitmap} style={styles.bgImage}/>
            </View>
        );
    }
}

export default InteractionDetailScreen;