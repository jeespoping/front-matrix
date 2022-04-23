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
      Swal.fire("Error", "Al parecer hay un problema", "error");
    }
  };
};

const permisos = (data) => ({
  type: types.maestrosMatrixPermisos,
  payload: data,
});
