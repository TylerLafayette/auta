import { StyleSheet } from "react-native"

import { PRIMARY_TEXT } from "../../styles/common"

export default StyleSheet.create({
    navbarWrapper: {
        padding: 30,
        flexDirection: "row",
        height: 100,
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        letterSpacing: 2,
        color: PRIMARY_TEXT
    },
    placeholder: {
        width: 28
    }
})