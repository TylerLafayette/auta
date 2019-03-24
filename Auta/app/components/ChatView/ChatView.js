import React, { Component } from "react"
import { View, FlatList } from "react-native"
import ChatBubble from "../ChatBubble";

export default class ChatView extends Component {
    render() {
        return (
            <View>
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