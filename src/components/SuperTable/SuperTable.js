import React, { useMemo, useState, useEffect } from "react";
//import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import {
  Button,
  Container,
  Grid,
  Form,
  Input,
  Pagination,
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


export default function SuperTable({ handlerModal }) {
  const [filterText, setFilterText] = useState("");
  const { data } = useSelector((state) => state.maestrosMatrixDatos);
  const { detalles, descripciones, datas } = data
  const [isLoading, setIsLoading] = useState(false);
  const [numPage, setNumPage] = useState(null);
console.log("detalles", detalles)
console.log("descripciones", descripciones)
console.log("data", data)


  const dispatch = useDispatch();

  const optionsFilter = data.detalles.map((e, index) => ({
    key: index,
    value: e.descripcion,
    text: e.descripcion,
  }));

  const [valueFilter, setValueFilter] = useState(optionsFilter[0]?.value);
  const [condicionFilter, setCondicionFilter] = useState("=");

  const subHeaderComponentMemo = useMemo(() => {
    const selectFilter = [
      { key: "=", value: "=", text: "=" },
      { key: "like", value: "like", text: "like" },
      { key: "!=", value: "!=", text: "!=" },
    ];

    const handleFilter = () => {
      dispatch(
        getDetalles(
          {
            tabla: data.permisos.Tabtab,
            valueFilter,
            filterText,
            condicionFilter,
          },
          1,
          setIsLoading
        )
      );
    };

    const handleChange = (e) => {
      setNumPage(e.target.value);
    }

    const changePage = () => {
      if(numPage <= data.datas.last_page){
        dispatch(
          getDetalles(
            {
              tabla: data.permisos.Tabtab,
              valueFilter,
              filterText,
              condicionFilter,
            },
            numPage,
            setIsLoading
          )
        )
      }else{
        Swal.fire("Error", "Solo hay " +data.datas.last_page + " páginas por favor es coja otra página", "error");
      }
    }
    

    return (
      <>
        <Dropdown
          placeholder="Selecciona filtro"
          search
          selection
          defaultValue={optionsFilter[0]?.value}
          options={optionsFilter}
          onChange={(_, dato) => {
            setValueFilter(dato.value);
          }}
        />
        <Select
          options={selectFilter}
          selection
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

        <Form.Input
          width={12}
          style={{width: "9em"}}
          type="text"
          placeholder="Ingrese página"
          value={numPage}
          onChange={(e) => handleChange(e)}
          error=""
        />
        <Button onClick={changePage} primary>
          Ir
        </Button>
      </>
    );
  }, [filterText, optionsFilter]);

  const pagination = () => {
    return (
      <div className="pagination_div">
        <Pagination
          totalPages={data.datas.last_page}
          onPageChange={(_, { activePage }) => {
            setNumPage(activePage)
            dispatch(
              getDetalles(
                {
                  tabla: data.permisos.Tabtab,
                  valueFilter,
                  filterText,
                  condicionFilter,
                },
                activePage,
                setIsLoading
              )
            )
          }
          }
          activePage={data.datas.current_page}
        />
      </div>
    );
  };

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

  const paginationComponentOptions = {
      rowsPerPageText: 'Filas por página',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Todos',
  };

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

  const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
  const [currentPage, setCurrentPage] = useState(1);
  const [rows1, setRows1] = useState(10);
  const [loading, setLoading] = useState(false);
  const [lazyParams, setLazyParams] = useState({
    first: 1,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null
  });

  useEffect(() => {
      loadLazyData();
  },[lazyParams])

  const loadLazyData = () => {
    dispatch(
      getDetalles(
        {
          tabla: data.permisos.Tabtab,
          valueFilter,
          filterText,
          condicionFilter,
        },
        lazyParams.page + 1,
        setIsLoading
      )
    );
  }

  const onPage = (event) => {
    setLazyParams(event)
  }

  const getHeader = (row) => {
    let desc = descripciones.find((a) => {
        return a.Dic_Campo == row.campo
    })

    return row.descripcion + "("+desc.Dic_Descripcion+")"
  }

  const template1 = {
      layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
      'PrevPageLink': (options) => {
          return (
              <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                  <span className="p-3">Previous</span>
                  <Ripple />
              </button>
          )
      },
      'NextPageLink': (options) => {
          return (
              <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                  <span className="p-3">Next</span>
                  <Ripple />
              </button>
          )
      },
      'PageLinks': (options) => {
          if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
              const className = classNames(options.className, { 'p-disabled': true });

              return <span className={className} style={{ userSelect: 'none' }}>...</span>;
          }

          return (
              <button type="button" className={options.className} onClick={options.onClick}>
                  {options.page + 1}
                  <Ripple />
              </button>
          )
      },
      
      'CurrentPageReport': (options) => {
          return (
              <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                  Go to <InputText size="2" className="ml-1" value={lazyParams.page} tooltip={pageInputTooltip}
                      onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
              </span>
          )
      }
  };

  const onPageInputKeyDown = (event, options) => {
    if (event.key === 'Enter') {
      const page = parseInt(currentPage);
        if (page < 1 || page > options.totalPages) {
            setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
        }
        else {
            const first = currentPage ? options.rows * (page - 1) : 0;

            setLazyParams({
              ...lazyParams,
              first: first
            })
            setPageInputTooltip('Press \'Enter\' key to go to this page.');
        }
      }
    }

    const onPageInputChange = (event) => {
      setLazyParams({
        ...lazyParams,
        page: event.target.value
      })
    }


  return (
    <Container className="super-table">
      <DataTable lazy paginator first={lazyParams.first} rows={rows1} totalRecords={datas.total} filterDisplay="row" dataKey="id" scrollDirection="both" scrollable onPage={onPage} value={datas.data} loading={isLoading} className="mt-3">
        <Column body={actionBodyTemplate} header="Editar" style={{ width: '100px' }} frozen></Column>
        {
          detalles.map((row, key) => {
            if(key == 0 || key == 1){
              return(
                <Column frozen field={row.descripcion} header={getHeader(row)} style={{ width: '170px' }}></Column>
              )
            }else{
              return(
                <Column field={row.descripcion} header={getHeader(row)} style={{ width: '170px' }}></Column>
              )
            }
          })
        }
        <Column body={actionBodyTemplate} header="Editar" style={{ width: '100px' }} frozen alignFrozen="right"></Column>
      </DataTable>
    </Container>
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
