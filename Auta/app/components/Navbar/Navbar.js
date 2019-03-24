import React, { Component } from "react"
import { View, Text, TouchableWithoutFeedback } from "react-native"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from "./styles"

import { openDrawer } from "../../actions/uiActions"

@connect(store => {
    return {

    }
})
export default class Navbar extends Component {
    _openDrawer() {
        this.props.dispatch(openDrawer())
    }
    render() {
        return (
            <View style={styles.navbarWrapper}>
                <TouchableWithoutFeedback onPress={this._openDrawer.bind(this)} style={styles.icon}>
                    <Icon name="menu" size={28}></Icon>
                </TouchableWithoutFeedback>
                <Text style={styles.title}>AUTA</Text>
                <View style={styles.placeholder}>
                </View>
            </View>
        )
    }
}