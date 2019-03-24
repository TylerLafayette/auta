import React, { Component } from "react"
import { View } from "react-native"

import ChatView from "../components/ChatView"

export default class Home extends Component {
    render() {
        return (
            <View>
                <ChatView />
            </View>
        )
    }
}