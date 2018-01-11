import { Dimensions } from "react-native";

const styles = {
  containerView: {
    //height: 64,
    //  width: Dimensions.get('window').width,
    backgroundColor: "#152341"
    //  marginBottom: 15,
    //  marginTop: 15,
  },
  dataView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textView: {
    flexDirection: "column",
    marginLeft: 15,
    marginRight: 19,
    flex: 2
  },
  nameText: {
    fontFamily: "Circular",
    fontSize: 16,
    color: "white",
    marginBottom: 5
  },
  usernameText: {
    fontFamily: "Circular",
    fontSize: 14,
    opacity: 0.7,
    color: "white"
  },
  imageStyle: {
    height: 48,
    width: 48,
    borderRadius: 24
  },
  buttonStyle: {
    width: 125,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 100
    //   backgroundColor:'#4CAF50'
  },
  buttonStyleClicked: {
    width: 145,
    backgroundColor: "#4CAF50",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 100
  },
  indexFirstText: {
    fontFamily: "Circular",
    color: "#4CAF50",
    alignSelf: "center",
    marginTop: 6
    // marginVertical: 8
  },
  indexSecondText: {
    fontFamily: "Circular",
    color: "white",
    alignSelf: "center",
    marginTop: 6
    //flexDrection: 'up'
  },
  youFollow: {
    marginLeft: 4,
    color: "#059ED9",
    alignSelf: "center",
    backgroundColor: "transparent",
    fontFamily: "Circular"
  },
  followsYou: {
    marginLeft: 4,
    color: "#5AD24E",
    alignSelf: "center",
    backgroundColor: "transparent",
    fontFamily: "Circular"
  },
  relationshipContainer: {
    flexDirection: "row",
    marginRight: 20,
    backgroundColor: "transparent",
    marginTop: 5
  }
};
export default styles;
