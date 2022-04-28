import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { getRelations } from "../../../../actions/root/maestrosMatrix";
import "./DinamicRelation.scss";

export default function DinamicRelation({ formik, detalle, value = "" }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getRelations(detalle).then((value) => {
      setOptions(value.data);
    });
  }, [detalle]);

  if (options.length === 0) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Dropdown
      placeholder="Seleccione una opción"
      width={12}
      clearable
      search
      value={value}
      selection
      options={options}
      onChange={(_, data) => {
        formik.setFieldValue(detalle.descripcion, data.value);
      }}
      error={formik.errors[detalle.descripcion] && true}
    />
  );
}
