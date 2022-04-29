import React, { useEffect, useState } from "react";
import { Search } from "semantic-ui-react";
import { escapeRegExp, filter } from "lodash";
import { getRelations } from "../../../../actions/root/maestrosMatrix";
import { PacmanLoader } from "react-spinners";
import "./DinamicRelation.scss";

export default function DinamicRelation({ formik, detalle, value = "" }) {
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [valor, setValor] = useState(value);
  const [isloading, setisloading] = useState(false);

  const handleSearchChange = (e) => {
    setValor(e.target.value);
    setisloading(true);
    if (valor.length > 1) {
      const re = new RegExp(escapeRegExp(valor), "i");
      const isMatch = (result) => re.test(result.text);
      setResults(filter(options, isMatch));
    } else {
      setResults([]);
    }
    setisloading(false);
  };

  const handleResultSelect = (_, { result }) => {
    setValor(result.text);
    formik.setFieldValue(detalle.descripcion, result.value);
  };

  const handleOnBlur = (e, data) => {
    setValor(formik.values[detalle.descripcion]);
  };

  useEffect(() => {
    getRelations(detalle).then((value) => {
      setOptions(value.data);
    });
  }, [detalle]);

  if (options.length === 0) {
    return <PacmanLoader size={10} color="#2A5DB0" />;
  }

  const resultRenderer = ({ text }) => <p>{text}</p>;

  return (
    <Search
      placeholder="Buscar"
      loading={isloading}
      value={valor}
      results={results}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      noResultsMessage="No se encontro resultados"
      onResultSelect={handleResultSelect}
      onBlur={handleOnBlur}
      className={formik.errors[detalle.descripcion] && "error"}
    ></Search>
  );
}
