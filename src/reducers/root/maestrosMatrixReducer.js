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

export const MaestrosMatrixDatosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.maestrosMatrixDatos:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    case types.maestrosMAtrixDatosAdd:
      return {
        ...state,
        data: {
          ...state.data,
          data: [...state.data.data, action.payload],
        },
      };
    case types.maestrosMatrixDatosUpdate:
      return {
        ...state,
        data: {
          ...state.data,
          datas: {
            ...state.data.datas,
            data: state.data.datas.data.map((e) =>
              e.id === action.payload.row ? { ...e, ...action.payload.data } : e
            ),
          },
        },
      };
    case types.maestrosMatrixDatosLogout:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
