import { Dimensions } from "react-native"
const { height, width } = Dimensions.get("window")

const styles = {
    containerView: {
        height: 64,
        width: Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#192A4F"
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
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 64
        //marginLeft:20
    },
    buttonStyle: {
        height: 50,
        flexDirection: "row",
        backgroundColor: "#D1B54B",
        borderRadius: 100,
        alignItems: "center",
        paddingHorizontal: 30
    },
    upgradeText: {
        fontSize: 16,
        fontWeight: "bold",
        backgroundColor: "transparent",
        marginLeft: 15
    },
    buttonView: {
        width: width - 124,
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        top: "50%"
    },
    lockStyle: {
        //marginLeft: 30,
        resizeMode: "stretch"
    }
}

export default styles
