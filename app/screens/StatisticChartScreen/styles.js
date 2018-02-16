import { Dimensions } from "react-native"

const styles = {
   chartContainer: {
      flex: 1,
      paddingLeft: 20,
      marginTop: 20,
      backgroundColor: "#192A4F"
   },
   typeButtonText: {
      backgroundColor: "transparent",
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "Circular",
      color: "rgba(255,255,255,0.2)",
      marginHorizontal: 12,
      marginVertical: 8
   },
   infoView:{ flexDirection: "column", marginTop: 20 },
   infoText:{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "Circular" },
   infoValue:{ fontSize: 28, color: "white", fontFamily: "Circular" },
   buttonStyle: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.2)",
      marginLeft: 10,
      height: 31,
      alignItems: "center",
      marginBottom: 20
   },
   activeButtonStyle: {
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#059ED9",
      marginLeft: 10,
      height: 31,
      alignItems: "center",
      marginBottom: 20
   },
   activeTextStyle: {
      backgroundColor: "transparent",
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "Circular",
      color: "#059ED9",
      marginHorizontal: 12,
      marginVertical: 8
   }
}
export default styles
