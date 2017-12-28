import { Dimensions } from "react-native";

const styles = {
  container: {
    backgroundColor: "#152341",
    flex: 1
  },
  profileDetailContainer: {
    marginTop: 84
  },
  countsView: {
    flexDirection: "column",
    alignItems: "center"
    //  backgroundColor: 'yellow'
  },
  countsTextStyle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  profileDetailView: {
    flexDirection: "row",
    backgroundColor: "#152341",
    paddingLeft: 20
  },
  countStaticStyle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.7,
    marginTop: 3
  },
  statusText: {
    fontFamily: "Circular",
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginTop: 5,
    marginLeft: 5
  },
  usernameText: { fontFamily: "Circular", fontSize: 16, color: "white" },
  profile_picture: { height: 64, width: 64, borderRadius: 32 },
  followButtonTextStyle: {
    fontFamily: "Circular",
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 8
  },
  followButtonViewStyle: {
    backgroundColor: "#059ED9",
    alignItems: "center",
    borderRadius: 100,
    height: 31
  },
  relationshipContainer: {
    flexDirection: "row",
    marginRight: 20,
    backgroundColor: "transparent",
    marginTop: 5
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
  youFollowView: {
    borderRadius: 100,
    borderColor: "#5AD24E",
    marginLeft: 10,
    flexDirection: "row"
  },
  followsYouView: {
    borderRadius: 100,
    borderColor: "#059ED9",
    flexDirection: "row"
  },
  profilIstatistic: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20
  }
};

export default styles;
