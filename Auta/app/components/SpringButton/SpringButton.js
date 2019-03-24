import React, { Component } from "react"
import { TouchableWithoutFeedback, Animated } from "react-native"

export default class SpringButton extends Component {
	constructor() {
		super()
		this.animatedValue = new Animated.Value(1)
	}
	getSpringPrefs() {
		return {
			friction: 7,
			tension: 100,
			duration: 100
		}
	}
	handlePressIn() {
		Animated.spring(this.animatedValue, {
			toValue: 0.9,
			...this.getSpringPrefs()
		}).start()
	}
	handlePressOut() {
		Animated.spring(this.animatedValue, {
			toValue: 1,
			...this.getSpringPrefs()
		}).start()
	}
	render() {
		const pressStyle = {
			transform: [{
				scale: this.animatedValue
			}]
		}
		return (
			<TouchableWithoutFeedback
				onPress={this.props.onPress || null}
				onPressIn={this.handlePressIn.bind(this)}
				onPressOut={this.handlePressOut.bind(this)}
			>
				<Animated.View style={[pressStyle, this.props.style || {}]}>
					{this.props.children}
				</Animated.View>
			</TouchableWithoutFeedback>
		)
	}
}
