import React from "react";
import Table from "./table";
import "bootstrap/dist/css/bootstrap.min.css";
import random, { headers } from "./randomData";
import "./display.css";

function Display() {
  const data = random(15);
  return (
    <div>
      <nav id="header" className="navbar navbar-dark"></nav>
      <nav id="left-sidebar" className="navbar navbar-light"></nav>
      <div>
        <Table columns={headers} data={data} />
      </div>
    </div>
  );
}

export default Display;
