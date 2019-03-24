
import { applyMiddleware, createStore } from "redux"

import { createLogger } from "redux-logger"
import * as thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const middleware = applyMiddleware(thunk.default, createLogger())

export default createStore(reducer, middleware)