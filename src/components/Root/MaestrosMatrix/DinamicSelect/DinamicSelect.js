import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { getRelations, getSelects } from "../../../../actions/root/maestrosMatrix";
import "./DinamicSelect.scss";

export default function DinamicSelect({ formik, detalle, value = "", disabled = false }) {
  const [options, setOptions] = useState([]);
  const [placeholder, setPlaceholder] = useState("Seleccione una opción");

  // useEffect(() => {
  //   getSelects(detalle).then((value) => {
  //     setOptions(value.data);
  //   });
  // }, [detalle]);

  const select = () => {
    if(options.length == 0){
      setPlaceholder("Cargando...")
      getSelects(detalle).then((value) => {
        setOptions(value.data);
        setPlaceholder("Seleccione una opción")
      });
    }
  }

  return (
    <Dropdown
      placeholder={placeholder}
      width={12}
      clearable
      search
      selection
      disabled={disabled}
      options={options}
      defaultValue={value}
      onClick={select}
      onChange={(_, data) => {
        formik.setFieldValue(detalle.descripcion, data.value);
      }}
    />
  );
}
