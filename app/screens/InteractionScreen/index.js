import React, { Component } from 'react'
import {View,Text,Image} from 'react-native'
import {images} from 'resources'
import styles from './styles'
import { AnimatedHeader } from "components"

class InteractionScreen extends Component {


   render() {
      return (
         <View style={{flex: 1}}>
            <AnimatedHeader title='Interactions' />
         </View>
      )
   }
}

export default InteractionScreen