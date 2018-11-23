import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import helperReducer from "./helperReducer";

export default combineReducers({
    LoginReducer,
    helperReducer
});
