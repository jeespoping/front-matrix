import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Container, Input } from "semantic-ui-react";
import { filter } from "lodash";
import { useSelector } from "react-redux";
import "./SuperTable.scss";

export default function SuperTable({ columns, datas }) {
  const [filterText, setFilterText] = useState("");
  const { data } = useSelector((state) => state.maestrosMatrixDatos);

  /* const filteredItems = filter(
    datas,
    (item) =>
      item[data?.detalles[0].descripcion] &&
      item[data?.detalles[0].descripcion]
        .toLowerCase()
        .includes(filterText.toLowerCase())
  ); */

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const customStyles = {
    header: {
      style: {
        Height: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "gray",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "gray",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "gray",
          fontSize: "11px",
          fontWeight: "bold",
        },
      },
    },
  };

  return (
    <Container className="super-table">
      <DataTable
        columns={columns}
        data={datas}
        customStyles={customStyles}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    </Container>
  );
}

const FilterComponent = ({ filterText, onFilter }) => (
  <>
    <Input
      icon="search"
      onChange={onFilter}
      value={filterText}
      palceholder="Buscar..."
    />
  </>
);
