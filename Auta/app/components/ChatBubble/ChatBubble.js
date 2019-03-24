import React, { Component } from "react"
import { View, Text, Animated } from "react-native"

import styles from "./styles"

export default class ChatBubble extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.animatedValue = new Animated.Value(0)
    }
    componentDidMount() {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 5,
        }).start()
    }
    render() {
        const animStyle = {
            transform: [
                {
                    translateY: this.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0]
                    }),
                }
            ],
            opacity: this.animatedValue
        }
        return (
            <Animated.View style={[styles.wrapper, animStyle]}>
                <View style={[ styles.bubble, this.props.receiving ? styles.receivingBubble : styles.sendingBubble ]}>
                    <Text style={[ styles.text, this.props.receiving ? styles.receivingText : styles.sendingText ]}>{ this.props.children }</Text>
                </View>
            </Animated.View>
        )
    }
}