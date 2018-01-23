import { Dimensions } from "react-native";
const sliderItemWidth = 200;

const styles = {
  sliderTextStyle: {
    color: "white",
    width: sliderItemWidth,
    textAlign: "center",
    fontFamily: "Circular",
    fontWeight: "bold",
    fontSize: 16
  },
  linearGradient: {
    position: "absolute",
    width: Dimensions.get('window').width,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get('window').height
  },
  appLogo: {
    alignSelf: "center",
    top: 96,
    position: "absolute",
    resizeMode: "contain"
  },
  appXLogo: {
    alignSelf: "center",
    top: 128,
    position: "absolute",
    resizeMode: "contain"
  },
  loginScreenBg: {
    height: Dimensions.get('window').height/2+150,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    top: 0,
    left: 0,
    right: 0,
    position: "absolute"
    
  },
  buttonContent: {
//flex: 1,
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 70,
    left: 20,
    right:20
    
  },
  upText: {
    fontFamily: "Circular",
    color: "white",
    fontSize: 16,
    paddingBottom: 20
  },
  buttonView: {
    height: 54,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 62,
    
  },
  loginText: {
    fontFamily: "Circular",
    color: "#059ED9",
    backgroundColor: "transparent",
    marginVertical: 20,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18
  },
  botText: {
    fontFamily: "Circular",
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    marginTop: 20
  }
};

export default styles;
