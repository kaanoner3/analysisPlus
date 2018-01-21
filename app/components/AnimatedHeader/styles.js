import { Dimensions } from "react-native"
const styles = {
    animatedText: {
        fontSize: 17,
        fontWeight: "bold",
        alignSelf: "center",
        color: "white",
        position: "absolute",
        marginTop: 30,
        fontFamily: "Circular"
    },
    containerView: {
        height: 107,
        flexDirection: "column",
        justifyContent: "flex-start",
        position: "absolute",
        zIndex: 1,
        overflow: "hidden",
        backgroundColor: "#152341",
        width: Dimensions.get("window").width
    },
    headerXtitleView: {
        marginTop: 90,
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    headerXContainer: {
        height: 127,
        paddingTop: 24,
        flexDirection: "column",
        justifyContent: "flex-start",
        position: "absolute",
        zIndex: 1,
        overflow: "hidden",
        backgroundColor: "#151515",
        width: Dimensions.get("window").width
    },
    titleView: {
        marginTop: 66,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    titleXView: {
        marginTop: 46,
        flexDirection: "row",
        justifyContent: "flex-start"
    },

    titleTextStyle: {
        color: "white",
        fontWeight: "bold",
        //fontFamily: 'Circular',
        marginLeft: 20,
        fontSize: 34,
        letterSpacing: -1,
        fontFamily: "Circular"
    }
}

export default styles
