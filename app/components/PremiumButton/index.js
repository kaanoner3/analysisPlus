import React, { Component } from "react"
import { View, Image, TouchableOpacity, Text, Dimensions } from "react-native"
import styles from "./styles"
import PropTypes from "prop-types"

const { height, width } = Dimensions.get("window")

class PremiumButton extends Component {
    constructor() {
        super()

        this.state = { isActive: false }

        this.buttonPress = this.buttonPress.bind(this)
    }
    componentWillMount() {
        this.setState({ isActive: this.props.activeButton })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.activeButton === true) {
            this.setState({ isActive: true })
        }
    }
    buttonPress() {
        if (this.state.isActive === false) {
            this.setState({ isActive: true })
        } else {
            this.setState({ isActive: false })
        }
    }
    render() {
        return (
            <View
                style={
                    this.state.isActive
                        ? styles.activeContainer
                        : styles.container
                }
            >
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.buttonPress}
                >
                    <View style={styles.textView}>
                        <Text
                            style={
                                this.state.isActive === false
                                    ? styles.topText
                                    : styles.topActiveText
                            }
                        >
                            {this.props.premiumDuration}
                        </Text>
                        <Text
                            style={
                                this.state.isActive === false
                                    ? styles.bottomText
                                    : styles.botActiveText
                            }
                        >
                            save 20%
                        </Text>
                    </View>
                    <View style={[styles.textView]}>
                        <Text
                            style={
                                this.state.isActive === false
                                    ? styles.topText
                                    : styles.topActiveText
                            }
                        >
                            {this.props.premiumCost}
                        </Text>
                        <Text
                            style={
                                this.state.isActive === false
                                    ? styles.bottomText
                                    : styles.botActiveText
                            }
                        >
                            Per Week
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default PremiumButton

PremiumButton.propTypes = {
    activeButton: PropTypes.bool.isRequired,
    premiumCost: PropTypes.string.isRequired,
    premiumDuration: PropTypes.string.isRequired
}
PremiumButton.defaultProps = {
    activeButton: false
}
