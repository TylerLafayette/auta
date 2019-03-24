import React, { Component } from "react"
import { View, Text } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { RNCamera } from "react-native-camera"
import { Link } from "react-router-native"

import styles from "./Study.styles.js"

import Classifier from "../modules/Classifier"
import { connect } from "react-redux"
import { initStudy, pushEvent } from "../actions/studyActions"
import { closeDrawer } from "../actions/uiActions.js"
import { pushMessages } from "../actions/chatActions.js"
import { pushHistory } from "../actions/historyActions.js"

@connect(store => {
    return {
        study: store.study
    }
})
export default class Study extends Component {
    constructor() {
        super()
        this.state = {
            currentTime: 0
        }
    }
    componentDidMount() {
        this.props.dispatch(closeDrawer())
        this.setState({
            currentTime: Date.now()
        })
        this.props.dispatch(initStudy())
        this.interval1 = setInterval(this.asyncTakePic.bind(this), 1500)
        this.interval2 = setInterval(this.updateTime.bind(this), 1000)
    }
    updateTime() {
        this.setState({
            currentTime: Date.now()
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval1)
        clearInterval(this.interval2)
        let secondsPassed = (this.state.currentTime - this.props.study.startTime) / 1000
        let seconds = secondsPassed % 60
        let minutes = Math.floor(secondsPassed / 60)
        if(secondsPassed < 5)
            return
        this.props.dispatch(pushMessages([{
            id: Math.floor(Math.random*10000),
            timestamp: Date.now(),
            text: `Great work! You studied for ${minutes > 0 ? minutes + " minutes and " : ""}${Math.floor(seconds)} seconds! Be sure to check your progress in the history tab.`,
            receiving: true,
        }]))
        this.props.dispatch(pushHistory({
            type: "s",
            items: this.props.study.events.map(x => x.mood)
        }))
    }
    asyncTakePic = async () => {
        console.log("taking a picture")
        const options = { quality: 0.5, base64: true }
        const data = await this.camera.takePictureAsync(options)
        Classifier.classify(data.base64,
            console.log, 
            i => this.props.dispatch(pushEvent({
                mood: i,
                timestamp: Date.now()
            }))
        )
        this.props.dispatch(closeDrawer())
    }
    render() {
        let secondsPassed = (this.state.currentTime - this.props.study.startTime) / 1000
        let seconds = secondsPassed % 60
        let minutes = Math.floor(secondsPassed / 60)
        return (
            <View style={{
                flex: 1
            }}>
                <LinearGradient style={{
                    flex: 1,
                }} colors={["#2A283B", "#000000"]}>
                    <View>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={{
                                width: 1,
                                height: 1,
                            }}
                            type={RNCamera.Constants.Type.front}
                            flashMode={RNCamera.Constants.FlashMode.off}
                            permissionDialogTitle={'Give me permission please!'}
                            permissionDialogMessage={'I need permission to use your camera in order to track your studying.'}
                        />
                    </View>
                    <View style={styles.timerWrapper}>
                        <Text style={styles.clock}>
                            {minutes}:{("0" + Math.floor(seconds)).slice(-2)}
                        </Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Study mode is enabled.</Text>
                        </View>
                        <View style={styles.aiBadge}>
                            <Text style={styles.aiBadgeText}>{this.props.study.events[0] ? this.props.study.events[0].mood : "Loading"}</Text>
                        </View>
                    </View>

                    <Link to="/" style={styles.exitButton}>
                        <Text style={styles.exitText}>Exit</Text>
                    </Link>
                </LinearGradient>
            </View>
        )
    }
}