export default function(state={
    drawerOpen: false
}, action) {
    switch(action.type) {
        case "OPEN_DRAWER": {
            return {...state, drawerOpen: true}
        }
        case "CLOSE_DRAWER": {
            return {...state, drawerOpen: false}
        }
        default: {
            return {...state}
        }
    }
}