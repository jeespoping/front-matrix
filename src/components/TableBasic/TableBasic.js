import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Grid } from "semantic-ui-react";
import "./TableBasic.scss";
import { divideArray } from "../../helpers/utils";

export default function TableBasic({ columns, data }) {
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    let new_data = divideArray(data);
    setNewData(new_data);
  }, [data]);

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
        {newData &&
          newData.map((array, key) => (
            <Grid.Column
              mobile={16}
              tablet={16}
              computer={8}
              largeScreen={8}
              widescreen={5}
              key={key}
              style={{ padding: "25px" }}
            >
              <DataTable
                columns={columns}
                data={array}
                customStyles={customStyles}
              />
            </Grid.Column>
          ))}
      </Grid>
    </>
  );
}
