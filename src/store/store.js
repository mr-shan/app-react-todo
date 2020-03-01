import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const logger = store => {
    return next => {
        return action => {
            console.log("[Middleware] dispatching: ", action);
            return next(action);
        }
    }
}

export default createStore(reducer, applyMiddleware(logger, thunk));