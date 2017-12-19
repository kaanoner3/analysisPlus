import { Dimensions } from 'react-native'
const styles = {
  containerView: {
    height: 64,
    width: Dimensions.get('window').width,
    flexDirection: "row",
    justifyContent: 'space-between',
    backgroundColor: "#192A4F",

    paddingLeft: 20,
    paddingTop: 20,
   // marginTop: 44
  },
  headerXcontainer: {
    height: 88,
    width: Dimensions.get('window').width,
    flexDirection: "row",
    justifyContent: 'space-between',
    backgroundColor: "#192A4F",
    paddingLeft: 20,
    paddingTop:44
  },
  titleView: {
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },

  titleTextStyle: {
    color: 'white',
    fontSize: 17,
//  fontFamily: 'Circular',
    fontWeight: 'bold'
  },
};

export default styles;