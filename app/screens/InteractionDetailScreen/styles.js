import { Dimensions } from "react-native";
const {height,width} = Dimensions.get('window')

const styles = {
  containerView: {
    height: 64,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#192A4F",
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
  bgImage: {
    height,
    width,
    marginLeft:20
  }
};

export default styles;
