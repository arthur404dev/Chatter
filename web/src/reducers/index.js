import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import errorReducer from "./error.reducer";
import chatReducer from "./chat.reducer";

export default combineReducers({

  auth: authReducer,
  errors: errorReducer,
  chat: chatReducer
});
