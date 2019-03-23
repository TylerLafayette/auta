import React, { Component } from "react"
import { View, Text } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

import styles from "./styles"

export default class Navbar extends Component {
    render() {
        return (
            <View style={styles.navbarWrapper}>
                <View style={styles.icon}>
                    <Icon name="menu" size={28}></Icon>
                </View>
                <Text style={styles.title}>AUTA</Text>
                <View style={styles.placeholder}>
                </View>
            </View>
        )
    }
}