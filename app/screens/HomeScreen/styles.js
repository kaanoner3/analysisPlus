import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#152341"
    },
    imageStyle: {
        width: Dimensions.get("window").width
    },
    contentLeftItem: {
        flex: 1,
        backgroundColor: "#192A4F",
        height: 96,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        borderRadius: 5
    },
    contentRightItem: {
        flex: 1,
        backgroundColor: "#192A4F",
        height: 96,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 5,
        borderRadius: 5
    },
    statisticText: {
        color: "white",
        alignSelf: "center",
        fontSize: 32,
        marginLeft: 15,
        //  marginTop: 15,
        fontFamily: "Circular"
    },
    arrowView: {
        flexDirection: "row",
        alignItems: "center",
        //  paddingTop: 12,
        marginLeft: 9
    },
    gainText: {
        color: "#5AD24E",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5,
        fontFamily: "Circular"
    },
    lostText: {
        color: "#F44336",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 5,
        fontFamily: "Circular"
    },
    statisticView: {
        flexDirection: "row",
        height: 96 / 2,
        paddingBottom: 15
    },
    infoText: {
        fontSize: 12,
        color: "rgba(255,255,255,0.4)",
        fontWeight: "bold",
        marginTop: 15,
        marginLeft: 15,
        fontFamily: "Circular"
    },
    linearGradient: {
        flex: 1,
        opacity: 0.9,
        overflow: "visible"
    },
    flatlist: {
        flex: 1,
        marginTop: 20
    },
    headerButtonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 28,
        paddingHorizontal: 15,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 99
    },
    headerButtonXView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 52,
        paddingHorizontal: 10,
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 99
    },
    backgroundUserImage: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height:500,
        width,
        resizeMode: "cover",
    },
    absolute: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    bottomView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#152341",
        zIndex: 1,
        height: height * 0.4
    },
    imageBackgound: {
        height: height,
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
    },
    flatlistContainerView:{
        backgroundColor: "#152341",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        flex: 1
     }
}

export default styles
