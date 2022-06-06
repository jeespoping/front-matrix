import React, { useEffect } from "react";
import Nav from "../../../components/Nav";
import TableBasic from "../../../components/TableBasic";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { getPermisos } from "../../../actions/root/maestrosMatrix";
import "./MaestrosMAtrix.scss";
import Spinner from "../../../components/Spinner";

export default function MaestrosMatrix() {
  const dispatch = useDispatch();
  const { checking, data } = useSelector((state) => state.maestrosMatrix);

  const columns = [
    {
      name: "Nombre de opcion",
      selector: (row) => row.Tabopc,
      width: "45%",
      sortable: true,
    },
    {
      name: "Tabla matrix",
      selector: (row) => row.Tabtab,
      width: "35%",
      sortable: true,
    },
    {
      name: "Ir",
      cell: (row) => (
        <Link to={`/MaestrosMatrixDetalle/${row.Tabtab}`}>
          <Button>IR</Button>
        </Link>
      ),
      width: "20%",
    },
  ];

  useEffect(() => {
    dispatch(getPermisos());
  }, [dispatch]);

  if (checking) {
    return <Spinner />;
  }

  return (
    <>
      <Nav titulo="Editar Datos Tabla" version="Abril-23-2022" />
      <TableBasic columns={columns} data={data} />
    </>
  );
}
