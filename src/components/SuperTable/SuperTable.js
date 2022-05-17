import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  Button,
  Container,
  Dropdown,
  Input,
  Pagination,
  Select,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import "./SuperTable.scss";
import { getDetalles } from "../../actions/root/maestrosMatrix";

export default function SuperTable({ columns, datas }) {
  const [filterText, setFilterText] = useState("");
  const { data } = useSelector((state) => state.maestrosMatrixDatos);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const optionsFilter = data.detalles.map((e, index) => ({
    key: index,
    value: e.descripcion,
    text: e.descripcion,
  }));

  const [valueFilter, setValueFilter] = useState(optionsFilter[0]?.value);
  const [condicionFilter, setCondicionFilter] = useState("=");

  const subHeaderComponentMemo = useMemo(() => {
    const selectFilter = [
      { key: "=", value: "=", text: "=" },
      { key: "like", value: "like", text: "like" },
      { key: "!=", value: "!=", text: "!=" },
    ];

    const handleFilter = () => {
      dispatch(
        getDetalles(
          {
            tabla: data.permisos.Tabtab,
            valueFilter,
            filterText,
            condicionFilter,
          },
          1,
          setIsLoading
        )
      );
    };

    return (
      <>
        <Dropdown
          placeholder="Selecciona filtro"
          search
          selection
          defaultValue={optionsFilter[0]?.value}
          options={optionsFilter}
          onChange={(_, dato) => {
            setValueFilter(dato.value);
          }}
        />
        <Select
          options={selectFilter}
          selection
          defaultValue={selectFilter[0].value}
          onChange={(_, dato) => {
            setCondicionFilter(dato.value);
          }}
        />
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
        <Button onClick={handleFilter} primary>
          Buscar
        </Button>
      </>
    );
  }, [filterText, optionsFilter]);

  const pagination = () => {
    return (
      <div className="pagination_div">
        <Pagination
          totalPages={data.datas.last_page}
          onPageChange={(_, { activePage }) =>
            dispatch(
              getDetalles(
                {
                  tabla: data.permisos.Tabtab,
                  valueFilter,
                  filterText,
                  condicionFilter,
                },
                activePage,
                setIsLoading
              )
            )
          }
          activePage={data.datas.current_page}
        />
      </div>
    );
  };

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
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationComponent={pagination}
        progressPending={isLoading}
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
