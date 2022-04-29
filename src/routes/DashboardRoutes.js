import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Manual from "../pages/Manual";
import MaestrosMatrix from "../pages/Root/MaestrosMatrix";
import MaestrosMatrixDetalle from "../pages/Root/MaestrosMatrix/MaestrosMatrixDetalle";

export default function DashboardRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/manual" component={Manual} />
        <Route exact path="/inicio" component={Inicio} />
        <Route exact path="/MaestrosMatrix" component={MaestrosMatrix} />
        <Route
          exact
          path={"/MaestrosMatrixDetalle/:tabla"}
          component={MaestrosMatrixDetalle}
        />
        <Redirect to="/inicio" />
      </Switch>
    </>
  );
}
