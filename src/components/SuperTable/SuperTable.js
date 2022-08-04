import React, { useMemo, useState, useEffect, useRef } from "react";
//import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  Button,
  Container,
  Form,
  Input,
  Select,
} from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import "./SuperTable.scss";
import { getDetalles } from "../../actions/root/maestrosMatrix";
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import { DataTable } from 'primereact/datatable';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';

export default function SuperTable({ handlerModal, datas, detalles, lazyParams, setLazyParams, isLoading }) {
  const [filterText, setFilterText] = useState("");
  const { data } = useSelector((state) => state.maestrosMatrixDatos);
  const { descripciones } = data
  const dispatch = useDispatch();

console.log("detalles", detalles)
console.log("descripciones", descripciones)
console.log("dat a", data)

  const optionsFilter = detalles.map((e, index) => {
    return {
        key: index,
        value: e.descripcion,
        text: e.descripcion,
      }
  });

  const [valueFilter, setValueFilter] = useState(optionsFilter[0].value);
  const [condicionFilter, setCondicionFilter] = useState("=");

  const handleFilter = () => {
    setLazyParams({
        ...lazyParams,
        valueFilter,
        filterText,
        condicionFilter
      } 
    )
  };

  const selectFilter = [
    { key: "=", value: "=", text: "=" },
    { key: "like", value: "like", text: "like" },
    { key: "!=", value: "!=", text: "!=" },
  ];

  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <Button
              positive
              size="mini"
              type="button"
              onClick={() => handlerModal("editar", rowData)}
            >
              Editar
          </Button>
        </React.Fragment>
    );
  }

  const [pageInputTooltip, setPageInputTooltip] = useState('Presiona enter para ir a la página');
  const [rows1, setRows1] = useState(10);
  let inputRef = useRef(null);

  const onPage = (event) => {
    setLazyParams(event)
  }

  const getHeader = (row) => {
    let desc = descripciones.find((a) => {
        return a.Dic_Campo == row.campo
    })

    return "("+desc.Dic_Descripcion+")" +  row.descripcion
  }

  const footer = `En total hay ${datas.total} registros.`;

  const template1 = {
      layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
      'CurrentPageReport': (options) => {
          return (
              <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                  Ir a <InputText ref={inputRef} size="2" className="ml-1" tooltip={pageInputTooltip}
                      onKeyDown={(e) => onPageInputKeyDown(e, options)}/>
              </span>
          )
      }
  };

  const onPageInputKeyDown = (event, options) => {
    if (event.key === 'Enter') {
      const page = inputRef.current.value;
        if (page < 1 || page > options.totalPages) {
            setPageInputTooltip(`El valor debe ser entre 1 y ${options.totalPages}.`);
        }
        else {
            const first = inputRef.current.value ? options.rows * (page - 1) : 0;
            setLazyParams({
              ...lazyParams,
              first: first,
              page: inputRef.current.value - 1
            })
            setPageInputTooltip('Presiona enter para ir a la página');
        }
      }
    }

  return (
    <>
      <div className="filter-table">
        <Select
          options={optionsFilter}
          defaultValue={optionsFilter[0].value}
          selection
          search
          onChange={(_, dato) => {
            setValueFilter(dato.value);
          }}
        />
        <Select
          options={selectFilter}
          selection
          search
          defaultValue={selectFilter[0].value}
          onChange={(_, dato) => {
            setCondicionFilter(dato.value);
          }}
        />
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
        <Button onClick={handleFilter} primary>
          Buscar
        </Button>
      </div>

      <Container className="super-table">
          <DataTable lazy paginatorTemplate={template1} footer={footer} paginator first={lazyParams.first} rows={rows1} totalRecords={datas.total} 
              dataKey="id" scrollDirection="both" scrollable onPage={onPage} value={datas.data} 
              loading={isLoading} 
              columnResizeMode="fit" showGridlines
              className="mt-3">
            <Column body={actionBodyTemplate} header="Editar" style={{ width: '100px', fontSize: "11px" }} frozen></Column>
            {
              detalles.map((row, key) => {
                if(key == 0 || key == 1){
                  return(
                    <Column frozen field={row.descripcion} header={getHeader(row)} style={{ width: '110px', fontSize: "11px", wordBreak: "break-all", fontWeight: "bold", padding: 0,  paddingLeft: "5px", paddingRight: "5px" }}></Column>
                  )
                }else{
                  return(
                    <Column field={row.descripcion} header={getHeader(row)} style={{ width: '110px', fontSize: "11px", wordBreak: "break-all", fontWeight: "bold", padding: 0,  paddingLeft: "5px", paddingRight: "5px" }}></Column>
                  )
                }
              })
            }
            <Column body={actionBodyTemplate} header="Editar" style={{ width: '100px', fontSize: "11px" }} frozen alignFrozen="right"></Column>
          </DataTable>
      </Container>
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
