import React, {Component} from 'react'
import  {View,Text, Image} from 'react-native'
import styles from "./styles"
import { connect } from "react-redux"

class SettingScreen extends Component {

    render() {
        return (
            <View style={styles.containerView} >
                <Text>akspkasp</Text>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
       //   token: state.token
    }
 }
 
 export default connect(mapStateToProps, {})(SettingScreen)