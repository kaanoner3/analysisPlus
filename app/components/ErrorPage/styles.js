import { Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

const styles = {
   container: {
      flex: 1,
      backgroundColor: "#152341",
      alignItems:'center',
      marginTop:width/2
   },
   textOpps: {
      fontSize: 34,
      fontFamily: "Circular",
      fontWeight: "bold",
      color: "white",
      marginTop:5
   },
   errorText: {
      fontSize: 16,
      fontFamily: "Circular",
      fontWeight: "400",
      color: "rgba(255,255,255,0.4)",
      marginTop:5
   },
   image: {
      height: 100,
      width: 100
   }
}

export default styles
