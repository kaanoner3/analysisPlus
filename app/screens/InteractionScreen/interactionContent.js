import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity,Dimensions } from 'react-native'
import { images } from 'resources'
import styles from './styles'
import { AnimatedHeader } from "components"
import PropTypes from 'prop-types'

class InteractionContent extends Component {


    render() {
        return (
            <View style={[{  flexDirection: 'column', alignItems: 'flex-start', },this.props.style]}>
                <TouchableOpacity style={{ flexDirection: 'row'}}>
                    <Image style={contentStyles.contentIcon} source={this.props.contentIcon} />
                    <Text style={contentStyles.contentText} >{this.props.contentText}</Text>
                </TouchableOpacity>
                <View style={contentStyles.itemSepStyle} />
            </View>
        )
    }
}

export default InteractionContent

InteractionContent.propTypes = {
    contentIcon: PropTypes.func.isRequired,
    contentText: PropTypes.string.isRequired
}
InteractionContent.defaultProps = {
    contentIcon: require("../../resources/images/headerSearchIcon.png"),
    contentText: ''
}

const contentStyles = {
    contentText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
        fontFamily: 'Circular'

    },
    contentIcon: {
        marginLeft: 20,
        height: 24,
        width: 24,
        alignSelf: 'center'
    },
    itemSepStyle: {
        height: 1,
        backgroundColor: "white",
        opacity: 0.05,
        marginLeft: 20,
        width: Dimensions.get('window').width,marginTop:15
    }
}
