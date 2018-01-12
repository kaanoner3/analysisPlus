import { Dimensions, Platform } from "react-native";
const sliderItemWidth = 200;
const { height, width } = Dimensions.get("window");

const styles = {
  container: {
    borderRadius: 10,
    height: 71,
    width:width-100,
    backgroundColor: "#1E3056",
    marginTop: 10
  },
  activeContainer: {
    borderRadius: 10,
    height: 71,
    width:width-100,
    backgroundColor: "#D1B54B",
    marginTop: 10
  },
  buttonStyle: {
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",

  },
  topText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginTop: 15,
    fontFamily: "Circular"
  },
  topActiveText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
    marginTop: 15,
    fontFamily: "Circular"
  },
  botActiveText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "rgba(0,0,0,0.4)",
    fontFamily: "Circular"
  },
  textView: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 20
  },
  bottomText: {
    marginTop: 5,
    fontSize: 13,
    fontFamily: "Circular",
    color: "rgba(255,255,255,0.2)"
  }
};

export default styles;
