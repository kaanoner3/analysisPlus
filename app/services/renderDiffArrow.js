import {View,Text,Image} from 'react-native'
import React from 'react'
import styles from '../screens/HomeScreen/styles'
import { images } from "resources"
function renderDiffArrow(diffValue) {
    if (diffValue < 0) {
        return (
           <View style={styles.arrowView}>
              <Image source={images.gainArrow} />
              <Text style={styles.gainText}>
                 {diffValue + (diffValue * -2)}
              </Text>
           </View>
        )
     } else if (diffValue > 0) {
        return (
           <View style={styles.arrowView}>
              <Image source={images.lostArrow} />
              <Text style={styles.lostText}>{diffValue}</Text>
           </View>
        )
     } else {
       return <View></View>
     }
}

export default renderDiffArrow