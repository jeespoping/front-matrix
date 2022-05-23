import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Grid, Input } from "semantic-ui-react";

import { filter } from "lodash";
import "./TableBasic.scss";

export default function TableBasic({ columns, data }) {
  const [filterText, setFilterText] = useState("");

  const filteredItems = filter(
    data,
    (item) =>
      item.Tabtab &&
      item.Tabtab.toLowerCase().includes(filterText.toLowerCase())
  );

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
        padding: "0px",
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
    <>
      <Grid columns={3} divided className="table-basic">
        <DataTable
          pagination
          columns={columns}
          data={filteredItems}
          customStyles={customStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
      </Grid>
    </>
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
