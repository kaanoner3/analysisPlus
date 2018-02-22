import { Dimensions } from "react-native"

const styles = {
   containerView: {
      flex: 1,
      backgroundColor: "#152341"
   },
   accContainer: {
      backgroundColor: "#192A4F",
      flexDirection: "column",
      marginTop: 10
   },
   sectionHeaderText: {
      color: "rgba(255,255,255,0.4)",
      fontFamily: "Circular",
      fontWeight: "bold",
      fontSize: 12,
      marginLeft: 20,
      marginTop: 20
   },
   notificationView: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      height: 55,
      alignItems: "center",
      borderBottomWidth: 1,
      borderColor: "rgba(255,255,255,0.05)"
   },
   accComponent: {
      backgroundColor: "#192A4F",
      flexDirection: "row",
      paddingLeft: 20,
      alignItems: "center",
      height: 53,
      
      borderBottomWidth: 1,
      borderColor: "rgba(255,255,255,0.05)"
   },
   addAccButton: {
      backgroundColor: "#192A4F",
      flexDirection: "row",
      paddingLeft: 20,
      alignItems: "center",
      height: 55,
      borderBottomWidth: 1,
      borderColor: "rgba(255,255,255,0.05)"
   },
   addAccText: {
      color: "white",
      fontFamily: "Circular",
      fontSize: 16,
      marginLeft: 10,
      fontWeight: "300"
   },
   addAccImage: {
      height: 24,
      width: 24
   },
   accountsView: {
      marginTop: 15,
      borderBottomWidth: 1,
      borderColor: "rgba(255,255,255,0.5)"
   },
   logoutText: {
      fontFamily: "Circular",
      color: "rgba(255,255,255,0.4)",
      fontSize: 16,
      position:'absolute',
      right: 20
   },
   logoutButton: {
       flex:1,
       flexDirection:'row',
       alignItems:'center'
   }
}

export default styles
