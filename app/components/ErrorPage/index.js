import React, { Component } from "react"
import { View, Image, Text } from "react-native"
import { images, languages } from "resources"
import styles from "./styles"

class ErrorPage extends Component {
   constructor() {
      super()
   }

   render() {
      return (
         <View style={styles.container} >
            <Image style={styles.image} source={images.errorImage} />
            <Text style={styles.textOpps}>Oops</Text>
            <Text style={styles.errorText}>beklenmedik bir hata olustu</Text>
         </View>
      )
   }
}

export default ErrorPage
