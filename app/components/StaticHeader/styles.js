import { Dimensions } from "react-native";
const styles = {
  containerView: {
    height: 64,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#192A4F",

    // paddingLeft: 20,
    paddingTop: 20
    // marginTop: 44
  },
  headerXcontainer: {
    height: 88,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#192A4F",
    paddingLeft: 20,
    paddingTop: 44
  },
  titleView: {
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },

  titleTextStyle: {
    color: "white",
    fontSize: 17,
    fontFamily: "Circular",
    fontWeight: "bold"
  },
  button: {
    alignSelf: "center",
    width: 35,
    height: 35,
    paddingLeft: 20
  },
  buttonImage: { height: 35, width: 10, resizeMode: "contain" }
};

export default styles;
