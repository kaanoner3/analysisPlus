import { Dimensions } from 'react-native';
const sliderItemWidth = 200

const styles = {
    sliderTextStyle: 
    { color: 'white', width: sliderItemWidth, textAlign: 'center', fontFamily: 'Circular', fontWeight: 'bold', fontSize: 16 },
    linearGradient: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
    appLogo:{
        alignSelf: "center",
        top: 96,
        position: "absolute",
        resizeMode: "contain"
      },
      loginScreenBg:{
        height: 400,
        top: 0,
        left: 0,
        right: 0,
        position: "absolute"
      },
      buttonContent:{
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "transparent",
        bottom: 70,
        left: 20
      },
      upText: {
        fontFamily: "Circular",
        color: "white",
        fontSize: 16,
        paddingBottom: 20
      },
      buttonView:{
        height: 54,
        width: 335,
        backgroundColor: "white",
        borderRadius: 100,
        alignItems: "center",
        flexDirection: "row",
        alignSelf:'center',
        paddingLeft: 62
      },
      loginText:{
        fontFamily: "Circular",
        color: "#059ED9",
        backgroundColor: "transparent",
        marginVertical: 20,
        marginLeft: 10,
        fontWeight: "bold",
        fontSize:18,
      },
      botText:{
        fontFamily: "Circular",
        color: "rgba(255,255,255,0.4)",
        fontSize: 13,
        marginTop: 20
      }
};

export default styles