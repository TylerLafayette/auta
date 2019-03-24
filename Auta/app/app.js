import React, { Component } from "react"
import { AsyncStorage, View, Text, StatusBar, ActivityIndicator } from "react-native"
import { withRouter, NativeRouter, Switch, Route, AndroidBackButton, Alert, Link } from "react-router-native"

import Classifier from "./modules/Classifier"

import Navbar from "./components/Navbar"

class App extends Component {
    constructor() {
        super()
        console.disableYellowBox = true;
        this.state = {

        }
    }
    componentDidMount = async () => {
        console.log("image loading")
        const image = "data:image/jpeg;base64,/9j/4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCABaAFoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDwrUPEVjpEZmv7lEUergfzPvXBeMfiTbXd35sF38gHypvHt71l+Pb6/wBYyn2llTPAVyO4/wAK5uz8K3epyb5ZWCjpya8+hhVLWR9fVrLuP1jx9cyXg8iXao64b3PvVLUPiZ/Z6rI90cY5+Yf41oXPwpu79QtvMQzN1yf8KpX3wP1RflvAXU9//wBYr06UIQPFre0qS0Mm6/aAW3ysE7Z9iP8A4qls/wBpySVBZ2yPHNGQfMcYB/HfWZq37OGrSztNBMVX+EAn29qxr74I6zpMbSOpLY6itm6b0JVKtT1Z6PaftU6vFEnyK0iAA8khsf8AAq67Qf2irbxLbKs7rb3GPuswUH82zXzpaeF7+xujFKzMQejHPer8stzYSokQZHHdTioqQpKA3UnTdz6d0zx7bTjdNdqSf+mg/wAa37TWoLuIOJgR1B3D/Gvm7SPFl5HCu64OR6sfX6112g/EuaNkt3uD2GNx/wAa8ytThJWR7eGxMZR1PY5NVgJ2+YM9Oo/xo+0qeciuM0rxEL1llaTI69a2RrSgABh0rzHQd9D1ITglqVL/AMLLLJjZn05/+vVnSfCUcbbWXAz/AJ710r6evmhgeKkjjijfJAzXpwq2seLUotlOz8P20OFKZx0q2dJWVCjxAjtVi1mDz4x04/Wtm0sHuFBro9rF6GdOhyu7OQuvDSKCPJx6c/8A1657XPDcbW7M0Y4Hf/8AXXp95pcka4deK5vXtORYyuM5rnq1JR1TO2FOM1ZniOueDLZrtp4oAGYnPPufeub13wNOrFkQZxweP8a9f1ewiiLSbehORmub1CCO4YrIOK5ni5S0uRWwCcbpHkcej3sLGOXII6dP8antY3trlWLEEH+teg3+ixtGRDGGB6YJrEufCbCYSkc7hxVwqN7mEMNOnK9i14Z1e9eVVz8owOv0rsFvn2jntWBovh7yYVkVcEckfgK1RFIAAUPHtRZnowcOXU9cmkIY/N0qubkCTqDUd/OUJyazrm/WI73fAqOZIyjCTW50OmmJpd24fn9K6fSJY0Tlx+deaDxVbWCiaecKueSasf8AC6vA+lxf8TDxDHHt653f4UU5ty0Kaio6Hpd7Pbzr94YFcf4juoFDIrDj3rktU/aw+B2jjff+KlIPZXYen+z71x/iT9rP4L30m7Ttdzk8fO3P/jtOvK0AoRk5anTa7LGY3PmDknjP1rktQuCGwPWuS8RftR+AZLgWlvejcRnOT6kelR6N8UPD/iV82uoJuPQYP+FeK/aqVz1oJOOp11terGNmAfrVtNNW9YNgZ9R3rFgcSMoJwe3vXTeGf38yRP8A3h/MV3Yas27MwqRXMaGleHJJogqR/wCePatceFOB+47en/1q6DQdGUhNo4IBP6V0yaFDtH7vt6CvQV2eXXaUtDmdY01ooHfknHHHuK8f8b+KNZQy/YImKxjrwO3uK+htQ02GRPLYZBrltW+GtjqUUkHlYVxyB34rmjKCj7xVM+KviD8UfF2m3kq6hcsYzny1UL746L9a8u17xv4i8U3uxbiRV3Ebfp+Ar7a8bfsh6JritcxXHzBtwQ4Hr/jXH63+xfbSaeH09Y45weu6uqjUo3NKjXLZHydrfgnX3037TbyM7EZ2bh6j/ari5L+6gJhuQ6un8JbpX2TrP7MfibRrVJbCdCy53EP9Pb3Nee+JP2TZdX1T+1NSnCljlwpz/SuqdWirHG6eJkrxf5Hzgb5rqcK0jAngHJrq/D11/Ztntjv5EbHDBSa9ksP2UfDtm4dLd5H9ShruvBP7Mfg8FV1LSPMB+9uU/wCNc08Rh2rWNaNDGRfM3+Rn/spfEfUPiA8nhDVYHaS2GY7llxkHzH6bR6Ada+jPB3hkvKHx90jP6e9N8G/DjwT4Q0/yvD3h6K2cjmRS2TyfU+5rs/DWlixg3gcHmuXmpOV4o73JqJoaNbi02JtxjFdAt3EFA29qxI3bzflPGasiV8dDXQ6iSOb2Epas0I7VCQM7vTNSTWEaoWWPn6VLaw+YQV61c8gFMN1rFqMlsdEYpqxgz6bAQxkTk1lajZxKjBV6GukvLUxozdeDiuf1Nj5Z9c1UYciIcE9DkdWsTKWiVjjsM1zNx4Tt52PmgH2IH+FdrdRh3JC81lTWjRzYA6+9c1W7ejOiFKSWiMCHwvYQKoFqhx/sj/CtfSvDsJZWjhA9cAf4Vo6fp8crbnX8K1rbTvLAaMAe1Y2ad2W+dKzIk0yRtqbOPati3hEMYiYEADmnWcY6OAD24qy8asPuZreKckZtJkMcSqdwNS7z6VE7+Wdp4FH2tB/D+lacqGk0dBZXcSYGc4q2lwr/ADrWHbk561pQEheDXbRhF7nM5vYk1KVPszbzz/8AWNcvfAyB+OM8Vu6qT9nPP+cGsabpis6qs3YqnLUwZR5cvz8U14UZhkdelWr8Dg4rS+HP/JQNC/7DNr/6NWvKzHEfU8FUxFr8kZStteyva5pmOY/2ZlFfGcnN7KEp2va/LFytezte1r2duwifDT4gIPl8C6yOf+gZL/8AE1Zh+H3j6MgHwPrGP+wXL/8AE19T0V/LH/Ewmc/9AVP/AMCkf54y+m7xTJWeUUf/AAOZ8zWvgLxxvy/gvVgPfTpf/iasXHgzxui4i8F6seO2nS//ABNfSNFaL6Q+cpf7jT/8CkYf8Tr8UXv/AGTR/wDA5nzG3gbx7NICfBWr499Nl/8AiaP+Fe+O/wDoTNV/8F0v/wATX05RS/4mHzr/AKAqf/gUi/8Aidrin/oU0f8AwOZ//9k="
        Classifier.classify(image,
            console.log, 
            console.log
        )
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