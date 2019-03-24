export default function(state={
    startTime: 0,
    events: [],
}, action) {
    switch(action.type) {
        case "INIT_STUDY": {
            return {...state, ...action.payload}
        }
        case "PUSH_EVENT": {
            return {...state, events: [action.payload, ...state.events]}
        }
        default: {
            return {...state}
        }
    }
}