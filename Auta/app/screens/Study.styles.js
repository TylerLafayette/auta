import { StyleSheet } from "react-native"

export default StyleSheet.create({
    timerWrapper: {
        alignItems: "center",
        padding: 48
    },
    clock: {
        fontSize: 48,
        color: "#ffffff"
    },
    badge: {
        backgroundColor: "#030F21",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 30,
        marginTop: 30,
    },
    badgeText: {
        color: "#6F83FF",
        fontWeight: "bold"
    },
    aiBadge: {
        backgroundColor: "#030F21",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 30,
        marginTop: 30,
    },
    aiBadgeText: {
        color: "#6F83FF",
        fontWeight: "bold"
    },
    exitButton: {
        alignSelf: "flex-end",
        marginTop: 300,
        backgroundColor: "#0F1C2C",
        borderRadius: 20,
        width: "100%",
        padding: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    exitText: {
        color: "#6F83FF"
    }
})