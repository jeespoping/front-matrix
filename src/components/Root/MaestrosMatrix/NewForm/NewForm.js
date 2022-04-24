import React, { useState } from "react";
import { Button, Checkbox, Form, Grid } from "semantic-ui-react";
import { map } from "lodash";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./NewForm.scss";

export default function NewForm({ setShowModal }) {
  const { data } = useSelector((state) => state.maestrosMatrixDatos);
  const [formData, setFormData] = useState(initialValueForm(data.detalles));
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValueForm(data.detalles),
    validationSchema: Yup.object(validation(data.detalles)),
    onSubmit: (formValue) => {
      const state = {
        ...formData,
        ...formValue,
      };
      console.log(state);
    },
  });

  return (
    <div className="new-form">
      <Form onSubmit={formik.handleSubmit}>
        {map(data.detalles, (detalle, index) => (
          <Grid key={index}>
            <Grid.Column textAlign="center" width={8}>
              <p>({data.descripciones[index].Dic_Descripcion})</p>
              <p>{detalle.descripcion}</p>
            </Grid.Column>
            <Grid.Column width={8}>
              {{
                0: (
                  <Form.Input
                    width={12}
                    type="text"
                    placeholder="Inserte un dato"
                    name={detalle.descripcion}
                    onChange={formik.handleChange}
                    error={formik.errors[detalle.descripcion] && true}
                  />
                ),
                1: (
                  <Form.Input
                    type="number"
                    placeholder="Inserte un dato"
                    name={detalle.descripcion}
                    onChange={formik.handleChange}
                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                2: (
                  <Form.Input
                    type="number"
                    placeholder="Inserte un dato"
                    name={detalle.descripcion}
                    onChange={formik.handleChange}
                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                3: (
                  <Form.Input
                    type="text"
                    placeholder="Inserte la fecha"
                    name={detalle.descripcion}
                    onChange={formik.handleChange}
                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                11: (
                  <Form.Input
                    type="text"
                    placeholder="Inserte la hora"
                    name={detalle.descripcion}
                    onChange={formik.handleChange}
                    error={formik.errors[detalle.descripcion]}
                  />
                ),
                10: (
                  <Checkbox
                    toggle
                    onChange={(_, data) => {
                      data.checked
                        ? formik.setFieldValue(detalle.descripcion, "on")
                        : formik.setFieldValue(detalle.descripcion, "off");
                      setFormData(formData);
                    }}
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
            <Button positive type="submit">
              Grabar
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
}

function initialValueForm(datas) {
  const columns = {};
  map(datas, (data) => {
    data.tipo === "10"
      ? (columns[data.descripcion] = "off")
      : (columns[data.descripcion] = "");
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
      case "11":
        values[data.descripcion] = Yup.string()
          .matches(
            /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
            "Debe estar en formato hh:mm:ss"
          )
          .required("El campo debe estar lleno");
        break;

      default:
        break;
    }
  });
  return values;
}
