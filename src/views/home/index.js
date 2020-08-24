import React from "react";
import { useSelector } from "react-redux";
import { activeUser } from "../../app/slices/user";
import { Typography, Grid } from "@material-ui/core";

const Home = () => {
  const user = useSelector(activeUser);
  const firstName = user.displayName.split(" ")[0];

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={5}>
          <Typography component="h1" align="center">
            Olá, {firstName}.
          </Typography>
          <Typography component="h1" align="center">
            Navegue através da barra superior.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export { Home };
