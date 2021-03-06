import React, { Component } from "react"
import { AsyncStorage, View, Text, StatusBar, ActivityIndicator } from "react-native"
import { withRouter, NativeRouter, Switch, Route, AndroidBackButton, Alert, Link } from "react-router-native"
import Drawer from "react-native-drawer"
import tweenFunctions from "tween-functions"
import { Provider, connect } from "react-redux"
import store from "./store"

import Classifier from "./modules/Classifier"

import Navbar from "./components/Navbar"
import MainDrawer from "./components/MainDrawer"
import Home from "./screens/Home"
import Study from "./screens/Study"
import History from "./screens/History"

@connect(store => {
    return {
        ui: store.ui
    }
})
class App extends Component {
    constructor() {
        super()
        console.disableYellowBox = true;
        this.state = {

        }
    }
    componentDidMount = async () => {
        console.log("image loading")
        const image = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAMVGlDQ1BEaXNwbGF5AABIiZVXd1RT9/t+7khCwghLFAQJG0EUUZAhM0xBQDa4CEmAMEK8JIi4lVIF6xYRUCtad9E6AKkDUeuse9bxRSmOSi0O3MrvjwRq7ff8fuf3nnPvfc/zPu/zjntPTj4Av1akUOSR+kC+XMnEhQUJUlLTBJx2ENBGf3DgIRIXKgJjY6MAoPf5T3t9HQQAXHERKRR5/47/r2YgkRaKASIWQIakUJwPEPsAulSsYJQA2xOAzVSlQgmwJwAwZlJS0wC2AoBxltovBWCcofarABgzCXFCgL0T0NIRiZgsQK8JgKBInKUE9G4CcJVLZHKArwXAT5wtkgD8cABD8vMLJABfCcAx4wudrH9oZvRpikRZfb56FgCAVrCsUJEnmvb/XMf/bfl5qt4a9gB0spnwOADGAHEztyAyDoAOQHTKM6JjABgCxFuZBFD7JC9bFZ6o5pPm4kJhGgATgHSViIIjAZgDZKg8LzpKg2dkykIjAOgDZLFMGZGgyV0gLQyJ12jWMgVxMb1+JiMM1OTWixhAwz+uyk0M1OjfzJZG9Oq/KslOSFb3TPGKZEnRAPQAyqQwNz5SzaFsS7KF0b0cRhWXCMAWoLyl8rAgtT41KZMJjdPwmfzC3nmpBdmyiGiNX63MTgjX6OwUi0LiAQwAqCapPDCxV0damBLVO4tEGhyinp26KJUnaual2hTKoDhN7gtFXqyGT/OkeWFxAKwB2rywKF6TS/spmQTNO6KjFcrYBHWfdEaOaEysuh+6GFEQIhgCqCBABgqQA9n5zsZOCDSRUIjAIAtSuGiQ3oxkiMBADhHiUYI/IYcUhX15QRCBgRRFkONTH6q+uyATIjAoghSFyMVDMMhHJPIghQoMpJD3VUvC72Ag+1d1MQqQhwIwkP0XLBBCRGkQVa+ugN/LZIewg9nh7FD2YNqM9qN96Cjajw6g/Wg32pP26u32bz7rIesS6wHrGquNdWuybB7z1TwCjEUbVJpdSZHx5cy0Pe1Gu9NBtC/tR3tBQJvQZnChR9KedCDtT/vQ7rQXhJrOVfi39j9m+GLrGh7XlUty+3MDuI5fZ+o56bn3qUgh/8eG1L1m9O1V2Bf5ur7wi01LUIDIr5nUAmovdZI6Sp2mDlKNEFBHqCbqHHWIavziK/odDLL6qsVBCjlykQfZv+qJNDUZSFHousP1ietHdUwpLVYCgLBAMY2RZWUrBYEKRZ5UECEXDx0icHMd7gWkpKYJ1D9TL01AACBMzvyNzZ8C+K7v6en5+W8sig/siwd47X9jDkmAHh84tUSsYorUGA0ALPDAhzFMMQg2cIQL3OABHwQgBGMQgwSkYhLEyEY+GEzFDMxFGSqwFKtQjfXYiK34EXvQiIM4il9wFhdxDbfRhg48RRde4wNBEBxClzAiTAlLwo5wJtwIT8KPCCGiiDgilUgnsgg5oSJmEPOJCmI5UU1sILYRPxEHiKPEaeIScYu4TzwhXhDvSYrUIY1JC9KeHEZ6koFkJJlATiSzyClkCVlKLiaryDpyJ9lAHiXPktfINvIp2U2B0qZMKCvKhfKkhFQMlUZlUgw1iyqnKqk6qp5qpk5SV6g2qpN6R7NpI1pAu9A+dDidSIvpKfQsehFdTW+lG+jj9BX6Pt1Ff2bpssxZzixvVgQrhZXFmsoqY1WyNrP2s06wrrE6WK/ZbLYJ24E9ih3OTmXnsKezF7HXsnexW9iX2O3sbg6HY8px5vhyYjgijpJTxlnD2ck5wrnM6eC81dLWstRy0wrVStOSa83TqtTarnVY67LWI60PXH2uHdebG8OVcKdxl3A3cZu5F7gd3A88A54Dz5eXwMvhzeVV8ep5J3h3eC+1tbWttb20x2nLtOdoV2nv1j6lfV/7nY6hjpOOUGeCjkpnsc4WnRadWzovdXV17XUDdNN0lbqLdbfpHtO9p/tWz0hvqF6EnkRvtl6NXoPeZb1nfC7fjh/In8Qv4Vfy9/Iv8Dv1ufr2+kJ9kf4s/Rr9A/o39LsNjAyGG8QY5BssMthucNrgsSHH0N4wxFBiWGq40fCYYbsRZWRjJDQSG8032mR0wqjDmG3sYBxhnGNcYfyj8Xnjrn6G/Ub2S+pX3K+m36F+bSaUib1JhEmeyRKTPSbXTd73t+gf2F/af2H/+v6X+78ZMHBAwADpgPIBuwZcG/DeVGAaYpprusy00fSuGW3mZDbObKrZOrMTZp0DjQf6DBQPLB+4Z+Bv5qS5k3mc+XTzjebnzLstBlmEWSgs1lgcs+gcZDIoYFDOoJWDDg96Ymlk6Wcps1xpecTyD0E/QaAgT1AlOC7osjK3CrdSWW2wOm/1wdrBOtF6nvUu67s2PBtPm0yblTatNl22lrZjbWfY7rD9zY5r52mXbbfa7qTdG3sH+2T7b+0b7R87DHCIcChx2OFwx1HX0d9ximOd49XB7MGeg3MHrx180Yl0cnfKdqpxuuBMOns4y5zXOl8awhriNUQ+pG7IDRcdl0CXIpcdLveHmgyNGjpvaOPQZ8Nsh6UNWzbs5LDPru6uea6bXG8PNxw+Zvi84c3DX7g5uYndatyujtAdETpi9oimEc9HOo+Ujlw38qa7kftY92/dW90/eYzyYDzqPZ6Msh2VPqp21A1PY89Yz0Wep7xYXkFes70Oer3z9vBWeu/x/svHxSfXZ7vP49EOo6WjN41u97X2Fflu8G3zE/il+33v1+Zv5S/yr/N/EGATIAnYHPAocHBgTuDOwGdBrkFM0P6gN0Jv4UxhSzAVHBZcHnw+xDAkMaQ65F6odWhW6I7QrjD3sOlhLeGs8MjwZeE3IiwixBHbIrrGjBozc8zxSJ3I+MjqyAdRTlFMVPNYcuyYsSvG3om2i5ZHN8YgJiJmRczdWIfYKbE/j2OPix1XM+5h3PC4GXEn443iJ8dvj3+dEJSwJOF2omOiKrE1iZ80IWlb0pvk4OTlyW0pw1JmppxNNUuVpTalcdKS0jandY8PGb9qfMcE9wllE65PdJhYPPH0JLNJeZMOTeZPFk3em85KT07fnv5RFCOqE3VnRGTUZnSJheLV4qeSAMlKyROpr3S59FGmb+byzMdZvlkrsp5k+2dXZnfKhLJq2fOc8Jz1OW9yY3K35PbkJeftytfKT88/IDeU58qPFwwqKC64pHBWlCnapnhPWTWli4lkNhcShRMLm5TGSoXynMpR9Y3qfpFfUU3R26lJU/cWGxTLi89Nc5q2cNqjktCSH6bT08XTW2dYzZg74/7MwJkbZhGzMma1zraZXTq7Y07YnK1zeXNz5/46z3Xe8nmv5ifPby61KJ1T2v5N2Dc7yvTKmLIb3/p8u34BvUC24PzCEQvXLPxcLik/U+FaUVnxcZF40Znvhn9X9V3P4szF55d4LFm3lL1UvvT6Mv9lW5cbLC9Z3r5i7IqGlYKV5StfrZq86nTlyMr1q3mrVavbqqKqmtbYrlm65mN1dvW1mqCaXbXmtQtr36yVrL28LmBd/XqL9RXr338v+/7mhrANDXX2dZUb2RuLNj7clLTp5A+eP2zbbLa5YvOnLfItbVvjth7fNmrbtu3m25fsIHeodjzZOWHnxR+Df2yqd6nfsMtkV8Vu7Fbt/uOn9J+u74nc07rXc2/9Prt9tfuN9pc3EA3TGroasxvbmlKbLh0Yc6C12ad5/89Df95y0OpgzaF+h5Yc5h0uPdxzpORId4uipfNo1tH21smtt4+lHLt6fNzx8yciT5z6JfSXYycDTx455Xvq4Gnv0wfOeJ5pPOtxtuGc+7n9v7r/uv+8x/mGC6MuNF30uth8afSlw5f9Lx+9Enzll6sRV89ei7526Xri9Zs3Jtxouym5+fhW3q3nvxX99uH2nDusO+V39e9W3jO/V/efwf/Z1ebRduh+8P1zD+If3G4Xtz/9vfD3jx2lD3UfVj6yfLTtsdvjg09Cn1z8Y/wfHU8VTz90lv1p8GftM8dn+/4K+OtcV0pXx3Pmec+LRS9NX255NfJVa3ds973X+a8/vCl/a/p26zvPdyffJ79/9GHqR87Hqk+DPzV/jvx8pye/p0chYkQAAAoAmZkJvNgC6KYCRhcB3nj1OQ8AQKjPpoD6P8h/99VnQQCAB1APIA6AsAXY3QLYBwC6AUAsgIQAkCNG9F0aK8wc4abW0mEA1tuenpcWAKcZ+MT09HxY29PzaRNA3QJapqjPlwDA1ge+dwWAy5Z78bX9Dz0PfgIgx4nqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF9mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTktMDMtMjNUMTc6MjU6MDEtMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAzLTIzVDE3OjI2OjUyLTA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTAzLTIzVDE3OjI2OjUyLTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IkRpc3BsYXkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MWUwODJmYmEtMWU3YS00OGQxLWE1ZDItYjNmZmM3NzZiMDRhIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NGY0NTRiZjItYzY5Zi0zYTQ0LTg5ZDMtOWE2MjllOWNjOTY4IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjViODZkNDktMWUyZS00MzJhLWEyMmUtNzlhNzBkNzE0NDY1Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNWI4NmQ0OS0xZTJlLTQzMmEtYTIyZS03OWE3MGQ3MTQ0NjUiIHN0RXZ0OndoZW49IjIwMTktMDMtMjNUMTc6MjU6MDEtMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJ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"
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
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    open={this.props.ui.drawerOpen}
                    content={<MainDrawer />}
                    type="overlay"
                    tapToClose={true}
                    openDrawerOffset={0.2}
                    panCloseMask={0.2}
                    closedDrawerOffset={-3}
                    tweenHandler={(ratio) => ({
                        main: { opacity:(2-ratio)/2 }
                    })}
                    tweenEasing={"easeInOutQuad"}
                >
                    <StatusBar backgroundColor={"#FFFFFF"} barStyle={"dark-content"} />
                    <Navbar />
                    <AndroidBackButton>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/study" component={Study} />
                            <Route exact path="/history" component={History} />
                        </Switch>
                    </AndroidBackButton>
                </Drawer>
            </View>
        )
    }
}

App = withRouter(App)

export default class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <NativeRouter>
                    <App></App>
                </NativeRouter>
            </Provider>
        )
    }
}