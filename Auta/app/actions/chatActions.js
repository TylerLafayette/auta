export function pushMessages(messages) {
    return dispatch => {
        dispatch({
            type: "PUSH_MESSAGES",
            payload: messages
        })
    }
}