import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loggedIn } from "../app/slices/user";

const NavBar = () => {
  const history = useHistory();
  const signedIn = useSelector(loggedIn);
  const routes = ["despesas", "receitas", "info"];

  return signedIn ? (
    <AppBar position="static">
      <Toolbar>
        {routes.map((r, i) => (
          <Button
            key={i}
            color="inherit"
            onClick={() => {
              history.push(`/${r}`);
            }}
          >
            {r}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  ) : null;
};

export { NavBar };
