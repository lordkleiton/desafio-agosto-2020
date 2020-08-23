import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./views/home";
import { Login } from "./views/login";
import { CheckAuth } from "./views/checkAuth";
import { Despesas } from "./views/despesas";
import { Receitas } from "./views/receitas";
import { Info } from "./views/info";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
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
