import React, { useEffect, useState } from "react";
import { Search } from "semantic-ui-react";
import { escapeRegExp, filter } from "lodash";
import { getRelations } from "../../../../actions/root/maestrosMatrix";
import { PacmanLoader } from "react-spinners";
import "./DinamicRelation.scss";

export default function DinamicRelation({ formik, detalle, value = "", disabled = false}) {
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);
  const [valor, setValor] = useState(value);
  const [isloading, setisloading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Buscar");

  const handleSearchChange = (e) => {
    setValor(e.target.value);
    setisloading(true);
    const re = new RegExp(escapeRegExp(valor), "i");
    const isMatch = (result) => re.test(result.text);
    setResults(filter(options, isMatch));
    
    setisloading(false);
  };

  const handleResultSelect = (_, { result }) => {
    setValor(result.text);
    formik.setFieldValue(detalle.descripcion, result.value);
  };

  const handleOnBlur = (e, data) => {
    setValor(formik.values[detalle.descripcion]);
  };

  /*useEffect(() => {
    getRelations(detalle).then((value) => {
      setOptions(value.data);
    });
  }, [detalle]);*/

  const relation = () => {
    if(options.length == 0){
      setPlaceholder("Cargando...")
      getRelations(detalle).then((value) => {
        setOptions(value.data);
        setPlaceholder("Buscar")
      });
    }
  }

  /*if (options.length === 0) {
    return <PacmanLoader size={10} color="#2A5DB0" />;
  }*/

  const resultRenderer = ({ text }) => <p>{text}</p>;

  return (
    <Search
      placeholder={placeholder}
      loading={isloading}
      value={valor}
      results={results}
      disabled={disabled}
      onClick={relation}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      noResultsMessage="No se encontro resultados"
      onResultSelect={handleResultSelect}
      onBlur={handleOnBlur}
      className={formik.errors[detalle.descripcion] && "error"}
    ></Search>
  );
}
