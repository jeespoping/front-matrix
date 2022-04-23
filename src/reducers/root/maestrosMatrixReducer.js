import { types } from "../../types/types";

const initialState = {
  checking: true,
};

export const maestrosMatrixReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.maestrosMatrixPermisos:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    default:
      return state;
  }
};