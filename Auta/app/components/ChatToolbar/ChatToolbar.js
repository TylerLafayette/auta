import React, { Component } from "react"
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from "./styles"

import SpringButton from "../SpringButton"

@connect(store => {
    return {
        chat: store.chat
    }
})
export default class ChatToolbar extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.suggestionsWrapper}>
                    {this.props.chat.suggestions.map((item, i) => (
                        <SpringButton>
                            <View style={styles.suggestion}>
                                <Text style={styles.suggestionText}>{item.label}</Text>
                            </View>
                        </SpringButton>
                    ))}
                </View>
                <View style={styles.textBoxWrapper}>
                    <TextInput
                        placeholder="Say something..."
                        style={styles.textInput} 
                    />
                    <SpringButton>
                        <View style={styles.sendButton}>
                            <Icon name="send" style={styles.sendText} />
                        </View>
                    </SpringButton>
                </View>
            </View>
        )
    }
}