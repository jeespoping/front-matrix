import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Container,
  Dropdown,
  Grid,
  GridColumn,
  Input,
} from "semantic-ui-react";
import { filter } from "lodash";
import { useSelector } from "react-redux";
import "./SuperTable.scss";

export default function SuperTable({ columns, datas }) {
  const [filterText, setFilterText] = useState("");
  const { data } = useSelector((state) => state.maestrosMatrixDatos);

  const optionsFilter = data.detalles.map((e, index) => ({
    key: index,
    value: e.descripcion,
    text: e.descripcion,
  }));

  const [valueFilter, setValueFilter] = useState(optionsFilter[0].value);

  const filteredItems = filter(
    datas,
    (item) =>
      item[valueFilter] &&
      item[valueFilter].toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <>
        <Dropdown
          placeholder="Selecciona filtro"
          search
          selection
          defaultValue={optionsFilter[0].value}
          options={optionsFilter}
          onChange={(_, dato) => {
            setValueFilter(dato.value);
          }}
        />
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </>
    );
  }, [filterText, data, optionsFilter]);

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
        data={filteredItems}
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
