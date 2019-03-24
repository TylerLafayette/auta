import { StyleSheet } from "react-native"

export default StyleSheet.create({
    wrapper: {
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    bubble: {
        paddingHorizontal: 18,
        paddingVertical: 14,
        borderRadius: 32,
        backgroundColor: "#656D77",
    },
    receivingBubble: {
        alignSelf: "flex-start",
        backgroundColor: "#EAEFF5"
    },
    sendingBubble: {
        alignSelf: "flex-end",
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFFFFF"
    },
    receivingText: {
        color: "#52566E"
    }

})