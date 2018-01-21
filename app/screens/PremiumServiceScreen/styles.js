import { Dimensions, Platform } from "react-native"
const sliderItemWidth = 200
const { height, width } = Dimensions.get("window")

const styles = {
    container: {
        flex: 1
    },
    logoStyle: {
        height: 50,
        width: 50,
        alignSelf: "center",
        marginTop: 68
    },
    logoXStyle: {
        height: 50,
        width: 50,
        alignSelf: "center",
        marginTop: 92
    },
    topContent: {
        flexDirection: "column",
        alignItems: "center"
    },
    swiperContainer: {
        height: 70,
        width: width,
        marginTop: 10
    },
    premiumText: {
        color: "#D1B54B",
        fontSize: 16,
        fontFamily: "Circular",
        marginTop: 20,
        fontWeight: "bold"
    },
    sliderTextStyle: {
        color: "rgba(255,255,255,0.4)",
        width: sliderItemWidth,
        textAlign: "center",
        fontFamily: "Circular",
        fontWeight: "bold",
        fontSize: 16
    },
    swiperDotView: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.2)",
        marginLeft: 4
    },
    swiperActiveDotView: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "white",
        marginLeft: 4
    },
    swiperTextView: {
        width: width,
        alignItems: "center"
    },
    purchaseButtonText: {
        fontSize: 16,
        color: "white",
        marginHorizontal: 39,
        alignSelf: "center"
    },
    purchaseButton: {
        width: width - 220,
        height: 44,
        backgroundColor: "#5AD24E",
        borderRadius: 100,
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20
    },
    subscriptionInfoText: {
        fontSize: 11,
        color: "rgba(255,255,255,0.3)",
        marginHorizontal: 15,
        marginTop: 30
    }
}

export default styles
