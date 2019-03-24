import React, { Component } from "react"
import { View } from "react-native"

import ChatView from "../components/ChatView"
import ChatToolbar from "../components/ChatToolbar"

export default class Home extends Component {
    render() {
        return (
            <View style={{
                flexDirection: "column",
                flex: 1,
            }}>
                <ChatView />
                <ChatToolbar />
            </View>
        )
    }
}