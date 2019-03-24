import React, { Component } from "react"
import { ScrollView, View, Text } from "react-native"
import { connect } from "react-redux"
import { closeDrawer } from "../actions/uiActions"
import { StackedBarChart } from "react-native-svg-charts"

import styles from "./History.styles.js"

@connect(store => {
    return {
        history: store.history
    }
})
export default class History extends Component {
    componentDidMount() {
        this.props.dispatch(closeDrawer())
    }
    render() {
        return (
            <ScrollView>
                {this.props.history.items.map(item => {
                    let stuff = {}
                    if(item.items) {
                        stuff = item.items.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
                    }
                    return (
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.type == "s" ? "Study session" : "Log"}</Text>
                        {item.type == "s" ? 
                            <View style={styles.studySession}>
                                <Text style={styles.dayText}>Good work studying!</Text>
                                {Object.entries(stuff).map(item => (
                                    <Text style={styles.dayText}>{item[0]} - {item[1]}</Text>
                                ))}
                            </View>
                        : 
                            <View style={styles.dayLog}>
                                <Text style={styles.dayText}>{item.info}</Text>
                            </View>
                        }
                    </View>
                )})}
            </ScrollView>
        )
    }
}