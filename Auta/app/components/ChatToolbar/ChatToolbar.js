import React, { Component } from "react"
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from "./styles"

export default class ChatToolbar extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.suggestionsWrapper}>
                    {["Yes, please.", "No, thanks."].map((item, i) => (
                        <View style={styles.suggestion}>
                            <Text style={styles.suggestionText}>{item}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.textBoxWrapper}>
                    <TextInput
                        placeholder="Say something..."
                        style={styles.textInput} 
                    />
                    <TouchableWithoutFeedback>
                        <View style={styles.sendButton}>
                            <Icon name="send" style={styles.sendText} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}