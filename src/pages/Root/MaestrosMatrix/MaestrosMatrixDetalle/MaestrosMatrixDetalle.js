import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { map, find } from "lodash";
import {
  dataLogout,
  getDetalles,
} from "../../../../actions/root/maestrosMatrix";
import Nav from "../../../../components/Nav";
import SuperTable from "../../../../components/SuperTable";
import "./MaestrosMatrixDetalle.scss";
import { Button, Container, Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NewForm from "../../../../components/Root/MaestrosMatrix/NewForm";
import ModalBasic from "../../../../components/Modal/ModalBasic";
import FormEdit from "../../../../components/Root/MaestrosMatrix/FormEdit";
import Spinner from "../../../../components/Spinner/Spinner";

export default function MaestrosMatrixDetalle() {
  const { tabla } = useParams();
  const { checking, data } = useSelector((state) => state.maestrosMatrixDatos);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  useEffect(() => {
    dispatch(getDetalles({ tabla: tabla }));
  }, [dispatch, tabla]);

  const handlerModal = (type, row) => {
    switch (type) {
      case "nuevo":
        setTitleModal("Crear nuevo registro");
        setChildrenModal(<NewForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;

      case "editar":
        setTitleModal("Editar registros");
        setChildrenModal(<FormEdit setShowModal={setShowModal} row={row} />);
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  if (checking) {
    return <Spinner />;
  }

  return (
    <>
      <Nav titulo="Editar Datos Tabla" version="Abril-23-2022" />
      <Container className="maestros-matrix-detalle">
        <Grid>
          <Grid.Column width={8}>
            <Link to="/MaestrosMatrix">
              <Button
                onClick={() => {
                  dispatch(dataLogout());
                }}
              >
                Atras
              </Button>
            </Link>
          </Grid.Column>
          <Grid.Column textAlign="right" width={8}>
            {data.permisos.Tabpgr === "on" && (
              <Button onClick={() => handlerModal("nuevo")}>Nuevo</Button>
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <SuperTable
        columns={columns(data, handlerModal)}
        datas={data.datas.data}
      />
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}

const Name = ({ column, detalle }) => (
  <>
    ({detalle}) <br />
    {column}
  </>
);

const CustomTitle = ({ row, column }) => (
  <div
    data-tag="allowRowEvents"
    style={{ overflow: "hidden", whiteSpace: "wrap", textOverflow: "ellipses" }}
  >
    {row[column]}
  </div>
);

function columns(data, handlerModal) {
  const columns = [];
  if (data.permisos.Tabcvi === "*") {
    map(data.detalles, (detalle) => {
      columns.push({
        name: (
          <Name
            column={detalle.descripcion}
            detalle={
              find(data.descripciones, (a) => a.Dic_Campo === detalle.campo)
                ?.Dic_Descripcion
            }
          />
        ),
        selector: (row) => row[detalle.descripcion],
        sortable: true,
        cell: (row) => <CustomTitle row={row} column={detalle.descripcion} />,
      });
    });
  } else {
    const permisos = data.permisos.Tabcvi.split(",");
    map(data.detalles, (detalle) => {
      if (permisos.includes(detalle.descripcion)) {
        columns.push({
          name: (
            <Name
              column={detalle.descripcion}
              detalle={
                find(data.descripciones, (a) => a.Dic_Campo === detalle.campo)
                  ?.Dic_Descripcion
              }
            />
          ),
          selector: (row) => row[detalle.descripcion],
          sortable: true,
          cell: (row) => <CustomTitle row={row} column={detalle.descripcion} />,
        });
      }
    });
  }
  if (data.permisos.Tabcam !== "") {
    columns.push({
      name: "Editar",
      cell: (row) => (
        <Button
          positive
          size="mini"
          type="button"
          onClick={() => handlerModal("editar", row)}
        >
          <Icon name="edit" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  return columns;
}
