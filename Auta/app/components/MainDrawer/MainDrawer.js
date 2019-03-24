import React, { Component } from "react"
import { View, Text, TouchableWithoutFeedback } from "react-native"
import { connect } from "react-redux"
import { Link } from "react-router-native"

import styles from "./styles"

import Navbar from "../Navbar"
import { closeDrawer } from "../../actions/uiActions"

@connect(store => {
    return {

    }
})
export default class MainDrawer extends Component {
    render() {
        return (
            <View
                style={styles.wrapper}
            >
                <Navbar icon={"close"} onPress={() => this.props.dispatch(closeDrawer())} />
                <View style={styles.links}>
                    {["CHAT", "STUDY", "HISTORY"].map((item, i) => (
                        <Link component={TouchableWithoutFeedback} style={styles.link} to={`/${item == "CHAT" ? "" : item.toLowerCase()}`}>
                            <Text style={styles.link}>{item}</Text>
                        </Link>
                    ))}
                </View>
            </View>
        )
    }
}