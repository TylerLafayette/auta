import { combineReducers } from "redux"
import ui from "./uiReducer"
import chat from "./chatReducer"
import study from "./studyReducer"
import history from "./historyReducer"

export default combineReducers({
    ui,
    chat,
    study,
    history
})