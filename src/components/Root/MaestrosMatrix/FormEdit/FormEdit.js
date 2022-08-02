import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map, filter, find } from "lodash";
import * as Yup from "yup";
import "./FormEdit.scss";
import DinamicSelect from "../DinamicSelect";
import DinamicRelation from "../DinamicRelation";
import { Button, Checkbox, Form, Grid } from "semantic-ui-react";
import { startUpdatedata } from "../../../../actions/root/maestrosMatrix";

export default function FormEdit({ setShowModal, row }) {
  const { data } = useSelector((state) => state.maestrosMatrixDatos);
  const detallesF = detalles(data);
  const [isLoading, setIsLoading] = useState(false);
console.log("Daata", data)
console.log("detallesF", detallesF)
console.log("rowrow", row)


  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValueForm(detallesF, row),
    validationSchema: Yup.object(validation(detallesF)),
    onSubmit: (formValue) => {
      const state = {
        row: row.id,
        data: formValue,
        permisos: data.permisos,
      };
      dispatch(startUpdatedata(state, setShowModal, setIsLoading));
    },
  });

  const disabled = (descripcion) => {
    if(data.permisos.Tabcam == "*") return false;

    const array = data.permisos.Tabcam.split(",");
    let find = array.some(elem => trimString(elem) == trimString(descripcion))
    if(find) return false;
    return true;
  }

  return (
    <div className="new-form">
      <Form onSubmit={formik.handleSubmit}>
        {map(detallesF, (detalle, index) => (
          <Grid key={index}>
            <Grid.Column textAlign="center" width={8}>
              <p>
                (
                {
                  find(data.descripciones, (a) => a.Dic_Campo === detalle.campo)
                    ?.Dic_Descripcion
                }
                )
              </p>
              <p>{detalle.descripcion}</p>
            </Grid.Column>
            <Grid.Column width={8}>
              {{
                0: (
                  <Form.Input
                    width={12}
                    type="text"
                    autocomplet="off"
                    placeholder="Inserte un dato"
                    name={detalle.descripcion}
                    disabled={disabled(detalle.descripcion)}
                    value={formik.values[detalle.descripcion]}
                    onChange={!disabled(detalle.descripcion) && formik.handleChange}
                    error={formik.errors[detalle.descripcion] && true}
                  />
                ),
                1: (
                  <Form.Input
                    width={12}
                    type="number"
                    placeholder="Inserte un dato"
                    name={detalle.descripcion}
                    disabled={disabled(detalle.descripcion)}
                    value={formik.values[detalle.descripcion]}
                                        onChange={!disabled(detalle.descripcion) && formik.handleChange}

                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                2: (
                  <Form.Input
                    width={12}
                    type="number"
                    placeholder="Inserte un dato"
                    name={detalle.descripcion}
                    disabled={disabled(detalle.descripcion)}
                    value={formik.values[detalle.descripcion]}
                                        onChange={!disabled(detalle.descripcion) && formik.handleChange}

                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                3: (
                  <Form.Input
                    width={12}
                    type="text"
                    placeholder="Inserte la fecha"
                    name={detalle.descripcion}
                    disabled={disabled(detalle.descripcion)}
                    value={formik.values[detalle.descripcion]}
                                        onChange={!disabled(detalle.descripcion) && formik.handleChange}

                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                11: (
                  <Form.Input
                    width={12}
                    type="text"
                    placeholder="Inserte la hora"
                    name={detalle.descripcion}
                    disabled={disabled(detalle.descripcion)}
                    value={formik.values[detalle.descripcion]}
                                        onChange={!disabled(detalle.descripcion) && formik.handleChange}

                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                10: (
                  <Checkbox
                    toggle
                    disabled={disabled(detalle.descripcion)}
                    checked={
                      formik.values[detalle.descripcion] === "off"
                        ? false
                        : true
                    }
                    onChange={(_, data) => {
                      data.checked
                        ? formik.setFieldValue(detalle.descripcion, "on")
                        : formik.setFieldValue(detalle.descripcion, "off");
                    }}
                  />
                ),
                5: (
                  <DinamicSelect
                    value={formik.values[detalle.descripcion]}
                    formik={formik}
                    disabled={disabled(detalle.descripcion)}
                    detalle={detalle}
                  />
                ),
                9: (
                  <DinamicRelation
                    value={formik.values[detalle.descripcion]}
                    formik={formik}
                    disabled={disabled(detalle.descripcion)}
                    detalle={detalle}
                  />
                ),
                18: (
                  <DinamicRelation
                    value={formik.values[detalle.descripcion]}
                    formik={formik}
                    disabled={disabled(detalle.descripcion)}
                    detalle={detalle}
                  />
                ),
              }[detalle.tipo] || <Form.Input width={12} type="text" disabled />}
            </Grid.Column>
          </Grid>
        ))}
        <Grid className="group-button">
          <Grid.Column width={8}>
            <Button negative type="button" onClick={() => setShowModal(false)}>
              Salir
            </Button>
          </Grid.Column>
          <Grid.Column textAlign="right" width={8}>
            <Button
              loading={isLoading}
              disabled={isLoading}
              positive
              type="submit"
            >
              Grabar
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
}

function initialValueForm(datas, row) {
  const columns = {};
  map(datas, (data) => {
    ["0", "1", "2", "3", "4", "5", "9", "10", "11", "18"].includes(trimString(data.tipo))
      ? (columns[trimString(data.descripcion)] = row[trimString(data.descripcion)])
      : (columns[data.descripcion] = ".");
  });
  return columns;
}

function validation(datas) {
  const values = {};
  map(datas, (data) => {
    switch (data.tipo) {
      case "0":
        values[data.descripcion] = Yup.string(
          "El valor debe ser un String"
        ).required("El campo debe estar lleno");
        break;
      case "1":
        values[data.descripcion] = Yup.number("Debe ser un numero")
          .integer("debe ser entero")
          .positive("debe ser positivo")
          .required("El campo debe estar lleno");
        break;
      case "2":
        values[data.descripcion] = Yup.number(
          "Debe ser un numero Real"
        ).required("El campo debe estar lleno");
        break;
      case "3":
        values[data.descripcion] = Yup.string()
          .matches(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
            "Debe estar en formato YYYY-MM-DD"
          )
          .required("El campo debe estar lleno");
        break;
        case "4":
            values[data.descripcion] = Yup.string(
            "El valor debe ser un String"
          ).required("El campo debe estar lleno");
          break;
      case "11":
        values[data.descripcion] = Yup.string()
          .matches(
            /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
            "Debe estar en formato hh:mm:ss"
          )
          .required("El campo debe estar lleno");
        break;

      case "9":
        values[data.descripcion] = Yup.string(
          "El valor debe ser un String"
        ).required("El campo debe estar lleno");
        break;
      case "18":
        values[data.descripcion] = Yup.string(
          "El valor debe ser un String"
        ).required("El campo debe estar lleno");
        break;

      default:
        break;
    }
  });
  return values;
}

function trimString(word){
  return word.toString().trim()
}

function detalles(datas) {
  if(datas.permisos.Tabcvi === "*"){
  //if(datas.permisos.Tabcvi === "*" || datas.permisos.Tabcam === "*"){
    return datas.detalles;
  }else {
    //mostrar informacion que esta en Tabcvi
    const array = datas.permisos.Tabcvi.split(",");
    let data = filter(
      datas.detalles,
      (item) => array.includes(trimString(item.descripcion) && trimString(item.descripcion))
    );

    //mostrar informacion que esta en Tabcam
    const arrayTabcam = datas.permisos.Tabcam.split(",");
    arrayTabcam.forEach(elem => {
      let find = data.some(elemTabcvi => trimString(elemTabcvi.descripcion) === trimString(elem))
      if(!find){
        let elementNew = datas.detalles.find(elemDetalle => trimString(elemDetalle.descripcion) === trimString(elem))
        data.push(elementNew)
      }
    })

    return data
  }
}
