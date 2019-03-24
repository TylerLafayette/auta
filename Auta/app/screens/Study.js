import React, { Component } from "react"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { RNCamera } from "react-native-camera"


import Classifier from "../modules/Classifier"

export default class Study extends Component {
    componentDidMount() {
        setTimeout(this.asyncTakePic.bind(this), 5000)
    }
    asyncTakePic = async () => {
        console.log("taking a picture")
        const options = { quality: 0.5, base64: true }
        const data = await this.camera.takePictureAsync(options)
        Classifier.classify(data.base64,
            console.log, 
            console.log
        )
    }
    render() {
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
                </LinearGradient>
            </View>
        )
    }
}