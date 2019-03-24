import { StyleSheet } from "react-native"

export default StyleSheet.create({
    wrapper: {
        flexDirection: "column",
        padding: 20,
    },
    suggestionsWrapper: {
        flexDirection: "row",
        paddingBottom: 16,
    },
    suggestion: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 6,
        backgroundColor: "#EAEFF5",
        borderRadius: 20
    },
    suggestionText: {
        fontWeight: "bold",
        color: "#52566E",
        fontSize: 14
    },
    textBoxWrapper: {
        flexDirection: "row",
        backgroundColor: "#EAEFF5",
        borderRadius: 50,
        padding: 5
    },
    textInput: {
        backgroundColor: "transparent",
        paddingVertical: 4,
        paddingHorizontal: 10,
        flex: 1,
    },
    sendButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        backgroundColor: "#AFC2D9"
    }
})