import React, { Component } from "react"
import { AsyncStorage, View, Text, StatusBar, ActivityIndicator } from "react-native"
import { withRouter, NativeRouter, Switch, Route, AndroidBackButton, Alert, Link } from "react-router-native"

import Navbar from "./components/Navbar"

class App extends Component {
    constructor() {
        super()
        console.disableYellowBox = true;
        this.state = {

        }
    }
    componentDidMount = async () => {

    }
    render() {
        return (
            <View style={{
                backgroundColor: "#FFFFFF",
                flex: 1
            }}>
                <StatusBar backgroundColor={"#FFFFFF"} barStyle={"dark-content"} />
                <Navbar />
                <AndroidBackButton>
                    <Switch>
                        <Route exact path="/" component={() => <Text>Hello</Text>} />
                    </Switch>
                </AndroidBackButton>
            </View>
        )
    }
}

App = withRouter(App)

export default class Index extends Component {
    render() {
        return (
            <NativeRouter>
                <App></App>
            </NativeRouter>
        )
    }
}