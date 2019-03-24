export function initStudy() {
    return dispatch => {
        dispatch({
            type: "INIT_STUDY",
            payload: {
                startTime: Date.now(),
                events: []
            }
        })
    }
}

export function pushEvent(event) {
    return dispatch => {
        dispatch({
            type: "PUSH_EVENT",
            payload: event
        })
    }
}