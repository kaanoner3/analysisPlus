import React, { Component } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import styles from './styles';
import { images } from 'resources';

const height = Dimensions.get('window').height

class StaticHeader extends Component {
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
            <TouchableOpacity style={{
                alignSelf: 'center',
                width: 35, height: 35,
            }} onPress={() => this.backButtonPress()}>
                <Image style={{ height: 35, width: 10, resizeMode: 'contain', }} source={images.headerBackButton} />
            </TouchableOpacity>
        )

    }
    render() {
        return (
            <View style={this.state.headerX === false ? styles.containerView : styles.headerXcontainer}>
                {this.renderBackButton()}
                <View style={styles.titleView}>
                    <Text style={styles.titleTextStyle}>{this.props.title}</Text>
                </View>
                <View style={{ height: 35, width: 35 }}></View>
            </View>
        );
    }
}

export default StaticHeader;