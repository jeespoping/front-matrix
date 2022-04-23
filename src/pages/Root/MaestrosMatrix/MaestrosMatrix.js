import React, { useEffect } from "react";
import Nav from "../../../components/Nav";
import TableBasic from "../../../components/TableBasic";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { getPermisos } from "../../../actions/root/maestrosMatrix";
import "./MaestrosMAtrix.scss";

export default function MaestrosMatrix() {
  const dispatch = useDispatch();
  const { checking, data } = useSelector((state) => state.maestrosMatrix);

  const columns = [
    {
      name: "#",
      selector: (_, index) => index,
      width: "60px",
    },
    {
      name: "Nombre de opcion",
      selector: (row) => row.Tabopc,
    },
    {
      name: "Tabla matrix",
      selector: (row) => row.Tabtab,
    },
    {
      name: "Ir",
      cell: (row) => (
        <Link to={`/MaestrosMatrixDetalle/${row.Tabtab}`}>
          <Button>IR</Button>
        </Link>
      ),
      width: "100px",
    },
  ];

  useEffect(() => {
    dispatch(getPermisos());
  }, [dispatch]);

  if (checking) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Nav titulo="Editar Datos Tabla" version="Abril-23-2022" />
      <TableBasic columns={columns} data={data} />
    </>
  );
}