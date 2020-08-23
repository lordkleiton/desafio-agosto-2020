import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loggedIn } from "../app/slices/user";

const NavBar = () => {
  const history = useHistory();
  const signedIn = useSelector(loggedIn);

  return signedIn ? (
    <AppBar position="static">
      <Toolbar>
        <Button
          color="inherit"
          onClick={() => {
            history.push("/despesas");
          }}
        >
          despesas
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            history.push("/receitas");
          }}
        >
          receitas
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            history.push("/info");
          }}
        >
          informações
        </Button>
      </Toolbar>
    </AppBar>
  ) : null;
};

export { NavBar };
