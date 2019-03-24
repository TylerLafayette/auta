import React, { Component } from "react"
import { View, FlatList } from "react-native"
import ChatBubble from "../ChatBubble"

import styles from "./styles"

export default class ChatView extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <FlatList
                    data={[
                        {
                            text: "Hello world",
                            receiving: false
                        },
                        {
                            text: "Goodbye world",
                            receiving: true
                        }
                    ]}
                    renderItem={({item}) => <ChatBubble receiving={item.receiving}>{item.text}</ChatBubble>}
                    inverted={true}
                />
            </View>
        )
    }
}