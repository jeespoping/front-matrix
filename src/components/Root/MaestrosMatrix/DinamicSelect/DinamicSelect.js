import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { getSelects } from "../../../../actions/root/maestrosMatrix";
import "./DinamicSelect.scss";

export default function DinamicSelect({ formik, detalle, value = "" }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getSelects(detalle).then((value) => {
      setOptions(value.data);
    });
  }, [detalle]);

  return (
    <Dropdown
      placeholder="Seleccione una opción"
      width={12}
      clearable
      search
      selection
      options={options}
      defaultValue={value}
      onChange={(_, data) => {
        formik.setFieldValue(detalle.descripcion, data.value);
      }}
    />
  );
}
