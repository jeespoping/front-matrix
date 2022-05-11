import React from "react";
import DataTable from "react-data-table-component";
import "./TableBasic.scss";

export default function TableBasic({ columns, data }) {
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
    <>
      <div className="table-basic">
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
    </>
  );
}
