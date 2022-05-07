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

export const getDetalles = (tabla, pageNumber = 1, setIsLoading = null) => {
  return async (dispatch) => {
    if (setIsLoading) setIsLoading(true);
    try {
      const { data } = await httpConToken.post(
        `/MaestrosMatrix/datos?page=${pageNumber}`,
        tabla
      );
      dispatch(datos(data));
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "Puede que hayas abierto el proyecto en login de react o haya un error en el servidor",
        "error"
      );
    } finally {
      if (setIsLoading) setIsLoading(false);
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

export const startNewData = (datas, setShowModal, last_page, setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await httpConToken.post(
        "/MaestrosMatrix/agregar",
        datas
      );
      if (data.data) {
        await dispatch(
          getDetalles({ tabla: datas.permisos.Tabtab }, last_page)
        );
        toast.success("Se grabaron con exito los datos");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudieron guardar los datos", "error");
    } finally {
      setIsLoading(false);
    }
  };
};

export const startUpdatedata = (datas, setShowModal, setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    try {
      const { data } = await httpConToken.post(
        "/MaestrosMatrix/actualizar",
        datas
      );
      if (data.data === 1) {
        dispatch(updateMaestrosMatrix(datas));
        toast.success("Se actualizaron correctamente los datos");
        setShowModal(false);
      } else {
        toast.warning("No haz modificado ningun dato");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No se pudieron actualizar los datos", "error");
    } finally {
      setIsLoading(false);
    }
  };
};

export const dataLogout = () => ({ type: types.maestrosMatrixDatosLogout });

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

export const updateMaestrosMatrix = (data) => ({
  type: types.maestrosMatrixDatosUpdate,
  payload: data,
});
