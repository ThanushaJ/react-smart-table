import React, { useState } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import "./table.css";

export default function Table({ columns, data }) {
  // Create a state
  const [filterInputFirst, setFilterInputFirst] = useState("");
  const [filterInputLast, setFilterInputLast] = useState("");
  const [filterInputBirth, setFilterInputBirth] = useState("");
  const [filterInputZip, setFilterInputZip] = useState("");
  const [filterInputGender, setFilterInputGender] = useState("");

  const [clickFilter, setClickFilter] = useState("hide-filter");
  const [viewFilter, setViewFilter] = useState("");
  const [tableDiv, setTableDiv] = useState("");
  const [formDiv, setFormDiv] = useState("");
  const [containerDiv, setContainerDiv] = useState("");

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  
  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    const name = e.target.name;
    setFilter(name, value);
    if (name === "first") {
      setFilterInputFirst(value);
    } else if (name === "last") {
      setFilterInputLast(value);
    } else if (name === "birthday") {
      setFilterInputBirth(value);
    } else if (name === "zip") {
      setFilterInputZip(value);
    } else if (name === "gender") {
      setFilterInputGender(value);
    }
  };

  const toggleViewClass = (e) => {
    if (viewFilter !== "table-filter") {
      setClickFilter("show-filter");
      setViewFilter("table-filter");
      setTableDiv("table-div");
      setFormDiv("form-div");
      setContainerDiv("container-div");
    } else {
      setClickFilter("hide-filter");
      setViewFilter("");
      setTableDiv("");
      setFormDiv("");
      setContainerDiv("");
    }
  };

  const handleFilterChangeCheck = (e) => {
    const value = e.target.value;
    const senValue = `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

    if (e.target.checked) {
      setFilter("gender", senValue);
    } else {
      setFilter("gender", "");
    }
  };

  return (
    <>
      <div id="button-div">
        <button className="btn btn-info" onClick={toggleViewClass}>
          Filter
        </button>
      </div>

      <div id="content" className={tableDiv}>
        <table
          className={`${viewFilter} table table-bordered table-sm `}
          {...getTableProps()}
        >
          <thead className="thead-dark">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "sort-desc"
                          : "sort-asc"
                        : ""
                    }
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={containerDiv}>
        <div id={clickFilter}>
          <form id="filter-form" className={formDiv}>
            <div className="form-group row">
              <label htmlFor="first" className="col-sm-3 col-form-label">
                First
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  id="first"
                  name="first"
                  value={filterInputFirst}
                  onChange={handleFilterChange}
                  placeholder={"Search firstname"}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="last" className="col-sm-3 col-form-label">
                Last
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  name="last"
                  value={filterInputLast}
                  onChange={handleFilterChange}
                  placeholder={"Search lastname"}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="birthday" className="col-sm-3 col-form-label">
                Birthday
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  name="birthday"
                  value={filterInputBirth}
                  onChange={handleFilterChange}
                  placeholder={"Search birthday"}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="zip" className="col-sm-3 col-form-label">
                Zip
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  name="zip"
                  value={filterInputZip}
                  onChange={handleFilterChange}
                  placeholder={"Search zip"}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gender" className="col-sm-3 col-form-label">
                Gender
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  name="gender"
                  value={filterInputGender}
                  onChange={handleFilterChange}
                  placeholder={"Search gender"}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gender-check" className="col-sm-3 col-form-label">
                Male
              </label>
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="checkbox"
                  value="M"
                  name="gender-check"
                  onChange={handleFilterChangeCheck}
                  placeholder={"Search gender"}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="gender-check" className="col-sm-3 col-form-label">
                Female
              </label>
              <div className="col-sm-2">
                <input
                  className="form-control"
                  type="checkbox"
                  value="F"
                  name="gender-check"
                  onChange={handleFilterChangeCheck}
                  placeholder={"Search gender"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
