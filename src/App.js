import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

/* views */

import { Home } from "./views/home";
import { Login } from "./views/login";
import { CheckAuth } from "./views/checkAuth";
import { Despesas } from "./views/despesas";
import { Receitas } from "./views/receitas";
import { Info } from "./views/info";

/* componentes */

import { NavBar } from "./components/navbar";

function App() {
  return (
    <Router>
      <CssBaseline />

      <NavBar />

      <Switch>
        <CheckAuth exact path="/">
          <Home />
        </CheckAuth>

        <Route path="/login">
          <Login />
        </Route>

        <CheckAuth path="/despesas">
          <Despesas />
        </CheckAuth>

        <CheckAuth path="/receitas">
          <Receitas />
        </CheckAuth>

        <CheckAuth path="/info">
          <Info />
        </CheckAuth>
      </Switch>
    </Router>
  );
}

export default App;
