import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { maestrosMatrixReducer } from "./root/maestrosMatrixReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  maestrosMatrix: maestrosMatrixReducer,
});
