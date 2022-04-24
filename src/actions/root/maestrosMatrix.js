import { httpConToken } from "../../helpers/http";
import { types } from "../../types/types";
import Swal from "sweetalert2";

export const getPermisos = () => {
  return async (dispatch) => {
    try {
      const { data } = await httpConToken.get("/MaestrosMatrix/permisos");
      dispatch(permisos(data));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "Puede que hayas abierto el proyecto en login de react o haya un error en el servidor",
        "error"
      );
    }
  };
};

export const getDetalles = (tabla) => {
  return async (dispatch) => {
    try {
      const { data } = await httpConToken.post("/MaestrosMatrix/datos", tabla);
      dispatch(datos(data));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "Puede que hayas abierto el proyecto en login de react o haya un error en el servidor",
        "error"
      );
    }
  };
};

const permisos = (data) => ({
  type: types.maestrosMatrixPermisos,
  payload: data,
});

const datos = (data) => ({
  type: types.maestrosMatrixDatos,
  payload: data,
});
