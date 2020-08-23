import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { loggedIn } from "../app/slices/user";

const NavBar = () => {
  const signedIn = useSelector(loggedIn);

  return signedIn ? (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  ) : null;
};

export { NavBar };
