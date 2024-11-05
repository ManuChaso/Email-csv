import { useEffect, useRef, useState } from "react";
import "./header.css";

export default function Header({ properties, filter, exportCSV }) {
  const [filters, setFilters] = useState([]);
  const propertiesRef = useRef(null);
  const operatorsRef = useRef(null);
  const [property, setProperty] = useState();
  const inputRef = useRef();

  // useEffect(() => {
  //   console.log("ahora");
  //   filter(filters);
  // }, [filters]);

  const removeFilter = (i) => {
    const newArray = [...filters];
    newArray.splice(i, 1);
    setFilters(newArray);
  };

  const handleFilters = (e, especial) => {
    console.log(e);
    
      const newFilter = {
        propertie: property.current.value,
        operator: "equal",
        value: especial === "event" ? e.target.value : inputRef.current.value,
      };
      setFilters([...filters, newFilter]);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="filter">
          <select
            onChange={(e) =>
              setProperty({ current: { value: e.target.value } })
            }
            name="properties"
            id="properties"
          >
            <option value="all">Todo</option>
            <option value="event">Evento</option>
            <option value="email">Email</option>
            <option value="template_id">Template ID</option>
          </select>
          {property?.current?.value === "event" ? (
            <select onChange={(e) => handleFilters(e, "event")}>
              <option value="processed">Procesado</option>
              <option value="delivered">Enviado</option>
              <option value="bounce">Devuelto</option>
              <option value="open">Abierto</option>
              <option value="drop">Tirado</option>
            </select>
          ) : (
            <input
              ref={inputRef}
              type="text"
              placeholder="Valor..."
            />
          )}
          <div className="apply-filters">
            <button onClick={(e) => handleFilters(e)} className="add-filter">+</button>
            <button onClick={() => filter(filters)} className="apply-filter">Filtrar</button>
          </div>
          {/* <button className="export-button" onClick={filternow}>
            Filtrar
          </button> */}
        </div>

        <div className="filters">
          {console.log(filters)}
          {filters.map((filter, i) => (
              <p key={i}>
                {filter?.propertie?.current?.value || filter.propertie} ={" "}
                {filter.value}
                <img
                  onClick={() => removeFilter(i)}
                  src="https://png.pngtree.com/png-vector/20230527/ourmid/pngtree-red-cross-paint-clipart-transparent-background-vector-png-image_7110618.png"
                  alt=""
                />
              </p>
          ))}
        </div>
        <button onClick={exportCSV} className="export-button">
          Export
        </button>
      </div>
    </header>
  );
}
