export function pushHistory(item) {
    return dispatch => dispatch({
        type: "PUSH_HISTORY",
        payload: item
    })
}