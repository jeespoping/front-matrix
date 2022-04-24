import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import {
  MaestrosMatrixDatosReducer,
  maestrosMatrixReducer,
} from "./root/maestrosMatrixReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  maestrosMatrix: maestrosMatrixReducer,
  maestrosMatrixDatos: MaestrosMatrixDatosReducer,
});
