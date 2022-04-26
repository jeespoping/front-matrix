import { httpConToken } from "../../helpers/http";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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

export const getSelects = async (detalle) => {
  try {
    const { data } = await httpConToken.post(
      "/MaestrosMatrix/selects",
      detalle
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getRelations = async (detalle) => {
  try {
    const { data } = await httpConToken.post(
      "/MaestrosMatrix/relations",
      detalle
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const startNewData = (datas, setShowModal) => {
  return async (dispatch) => {
    try {
      const { data } = await httpConToken.post(
        "/MaestrosMatrix/agregar",
        datas
      );
      if (data.data) {
        dispatch(addMaestrosMatrix(datas.data));
        toast.success("Se grabaron con exito los datos");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudieron guardar los datos", "error");
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

export const addMaestrosMatrix = (data) => ({
  type: types.maestrosMAtrixDatosAdd,
  payload: data,
});
