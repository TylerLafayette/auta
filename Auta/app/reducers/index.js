import { combineReducers } from "redux"
import ui from "./uiReducer"
import chat from "./chatReducer"

export default combineReducers({
    ui,
    chat
})