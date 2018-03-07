import {Dimensions} from 'react-native'

const {width,height} = Dimensions.get("window")

const styles = {
   itemSepStyle: {
      height: 1,
      backgroundColor: "white",
      opacity: 0.05,
      marginLeft: 20
   },
   absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
   },
   upgradeButton: {
    width: width-124,
    height:50,
    backgroundColor:'#D1B54B',
    borderRadius :100,
    alignItems: 'center'
   },
   buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontFamily:'Circular',
        fontSize: 16,
        marginLeft:15
   }
}

export default styles
