import React, { Component } from "react"
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from "./styles"

import SpringButton from "../SpringButton"
import { pushMessages } from "../../actions/chatActions";

@connect(store => {
    return {
        chat: store.chat
    }
})
export default class ChatToolbar extends Component {
    constructor() {
        super()
        this.state = {
            value: ""
        }
    }
    _change(value) {
        this.setState({
            value
        })
    }
    _sendMessage() {
        const messageBody = this.state.value
        if((messageBody).length < 1) return
        this.props.dispatch(pushMessages([{
            id: Math.floor(Math.random*10000),
            timestamp: Date.now(),
            text: messageBody,
            receiving: false,
        }]))
        this.setState({
            value: ""
        })
    }
    _sendSuggestion(id) {
        const messageBody = this.props.chat.suggestions.filter(x => x.id == id)[0].label
        this.props.dispatch(pushMessages([{
            id: Math.floor(Math.random*10000),
            timestamp: Date.now(),
            text: messageBody,
            receiving: false,
        }]))
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.suggestionsWrapper}>
                    {this.props.chat.suggestions.map((item, i) => (
                        <SpringButton onPress={() => this._sendSuggestion(item.id)}>
                            <View style={styles.suggestion}>
                                <Text style={styles.suggestionText}>{item.label}</Text>
                            </View>
                        </SpringButton>
                    ))}
                </View>
                <View style={styles.textBoxWrapper}>
                    <TextInput
                        value={this.state.value}
                        placeholder="Say something..."
                        onChangeText={this._change.bind(this)}
                        style={styles.textInput} 
                    />
                    <SpringButton onPress={this._sendMessage.bind(this)}>
                        <View style={styles.sendButton}>
                            <Icon name="send"
                             style={styles.sendText}
                              />
                        </View>
                    </SpringButton>
                </View>
            </View>
        )
    }
}