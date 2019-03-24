import React, { Component } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { closeDrawer } from "../actions/uiActions"

import ChatView from "../components/ChatView"
import ChatToolbar from "../components/ChatToolbar"

@connect(store => {
    return {

    }
})
export default class Home extends Component {
    componentDidMount() {
        this.props.dispatch(closeDrawer())
    }
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