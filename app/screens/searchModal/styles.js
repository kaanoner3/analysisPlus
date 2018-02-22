import { Dimensions, Platform } from "react-native"
const { height, width } = Dimensions.get("window")

const styles = {
   container: {
       flex:1
   },
   textInput: {
    marginLeft: 10,
    flex:1,
    color:'white'
   },
   textInputContainer: {
       height: 80,
       //backgroundColor: 'red'
   },
   searchIcon:{
       height:14,
       width:14,
       marginLeft: 20,
       tintColor: 'rgba(255,255,255,0.4)'
   },
   inputView: {
       backgroundColor:'rgba(255,255,255,0.1)',
       flex:1,
       borderRadius: 11,
       marginHorizontal:20,
       alignItems:'center',
       flexDirection: 'row',
       height:36
   }
}

export default styles
