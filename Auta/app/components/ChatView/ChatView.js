import React, { Component } from "react"
import { View, FlatList } from "react-native"
import ChatBubble from "../ChatBubble"
import { connect } from "react-redux"

import styles from "./styles"

@connect(store => {
    return {
        chat: store.chat
    }
})
export default class ChatView extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <FlatList
                    data={this.props.chat.messages}
                    renderItem={({item}) => <ChatBubble receiving={item.receiving}>{item.text}</ChatBubble>}
                    inverted={true}
                />
            </View>
        )
    }
}