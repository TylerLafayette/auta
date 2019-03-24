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
                    let seconds = 0
                    let minutes = 0
                    if(item.items) {
                        stuff = item.items.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
                        let secondsPassed = (item.endTime - item.startTime) / 1000
                        seconds = secondsPassed % 60
                        minutes = Math.floor(secondsPassed / 60)
                    }
                    return (
                    <View style={styles.row}>
                        <Text style={styles.title}>{item.type == "s" ? "Study session" : "Log"}</Text>
                        {item.type == "s" ? 
                            <View style={styles.studySession}>
                                <Text style={styles.dayText}>Good work studying!</Text>
                                <Text style={styles.dayText}>{minutes} minute{minutes != 1 ? "s" : ""} and {seconds} second{seconds != 1 ? "s" : ""}</Text>
                                {Object.entries(stuff).map(item => (
                                    <Text style={styles.dayText}>{item[0]} - approximately {Math.floor(item[1] * 1.5/60)} minute{Math.floor(item[1] * 1.5/60) != 1 ? "s" : ""} and {Math.floor(item[1] * 1.5%60)} second{Math.floor(item[1] * 1.5%60) != 1 ? "s" : ""}</Text>
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