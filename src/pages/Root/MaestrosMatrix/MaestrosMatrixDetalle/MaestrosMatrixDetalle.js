import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { map } from "lodash";
import { getDetalles } from "../../../../actions/root/maestrosMatrix";
import Nav from "../../../../components/Nav";
import SuperTable from "../../../../components/SuperTable";
import "./MaestrosMatrixDetalle.scss";
import { Button, Container, Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import NewForm from "../../../../components/Root/MaestrosMatrix/NewForm";
import ModalBasic from "../../../../components/Modal/ModalBasic";

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

  const handlerModal = (type) => {
    switch (type) {
      case "nuevo":
        setTitleModal("Crear nuevo registro");
        setChildrenModal(<NewForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;

      default:
        break;
    }
  };

  if (checking) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Nav titulo="Editar Datos Tabla" version="Abril-23-2022" />
      <Container className="maestros-matrix-detalle">
        <Grid>
          <Grid.Column width={8}>
            <Link to="/MaestrosMatrix">
              <Button>Atras</Button>
            </Link>
          </Grid.Column>
          <Grid.Column textAlign="right" width={8}>
            <Button onClick={() => handlerModal("nuevo")}>Nuevo</Button>
          </Grid.Column>
        </Grid>
      </Container>
      <SuperTable columns={columns(data)} datas={data.data} />
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
}

const Name = ({ column, detalle }) => (
  <>
    {detalle} <br />
    {column}
  </>
);

function columns(data) {
  const columns = [];
  if (data.permisos.Tabcvi === "*") {
    map(data.detalles, (detalle, index) => {
      columns.push({
        name: (
          <Name
            column={detalle.descripcion}
            detalle={data.descripciones[index].Dic_Descripcion}
          />
        ),
        selector: (row) => row[detalle.descripcion],
        sortable: true,
      });
    });
  } else {
    const permisos = data.permisos.Tabcvi.split(",");
    map(data.detalles, (detalle, index) => {
      if (permisos.includes(detalle.descripcion)) {
        columns.push({
          name: (
            <Name
              column={detalle.descripcion}
              detalle={data.descripciones[index].Dic_Descripcion}
            />
          ),
          selector: (row) => row[detalle.descripcion],
          sortable: true,
        });
      }
    });
  }
  columns.push(
    {
      name: "Editar",
      cell: (row) => (
        <Button
          positive
          size="mini"
          type="button"
          onClick={() => console.log(row)}
        >
          <Icon name="edit" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Elimnar",
      cell: (row) => (
        <Button negative size="mini" type="button">
          <Icon name="delete" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  );
  return columns;
}
