import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { local as _dLocal, find as _dFind } from "../../app/slices/despesas";
import { local as _rLocal, find as _rFind } from "../../app/slices/receitas";
import { Typography, Grid, Button } from "@material-ui/core";
import { formatCurrency } from "../../helpers";

const Info = () => {
  const dLocal = useSelector(_dLocal);
  const rLocal = useSelector(_rLocal);
  const dispatch = useDispatch();

  let dData = [];
  let rData = [];
  let dValues = [];
  let rValues = [];

  for (let k in dLocal) {
    const v = dLocal[k];

    if (v.data) {
      dData.push(v);
      dValues.push(v.valor);
    }
  }

  for (let k in rLocal) {
    const v = rLocal[k];

    if (v.data) {
      rData.push(v);
      rValues.push(v.valor);
    }
  }

  return (
    <div>
      <Button
        color="inherit"
        onClick={() => {
          dispatch(_dFind());
          dispatch(_rFind());
        }}
      >
        sincronizar
      </Button>

      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item>
          <Typography variant="h4">Despesas</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">
            {dData.length} despesas, somando{" "}
            {formatCurrency(dValues.reduce((prev, curr) => prev + curr, 0))}.
          </Typography>
        </Grid>

        {dData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Maior despesa:{" "}
              {formatCurrency(dValues.reduce((a, b) => Math.max(a, b)))}
            </Typography>
          </Grid>
        )}

        {dData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Menor despesa:{" "}
              {formatCurrency(dValues.reduce((a, b) => Math.min(a, b)))}
            </Typography>
          </Grid>
        )}

        {dData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Pagas: {dData.filter((d) => d.pago).length}
            </Typography>
          </Grid>
        )}

        {dData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Pendentes:
              {dData.filter((d) => !d.pago).length}
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item>
          <Typography variant="h4">Receitas</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5" component="h2">
            {rData.length} receitas, somando{" "}
            {formatCurrency(rValues.reduce((prev, curr) => prev + curr, 0))}.
          </Typography>
        </Grid>

        {rData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Maior despesa:{" "}
              {formatCurrency(rValues.reduce((a, b) => Math.max(a, b)))}
            </Typography>
          </Grid>
        )}

        {rData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Menor despesa:{" "}
              {formatCurrency(rValues.reduce((a, b) => Math.min(a, b)))}
            </Typography>
          </Grid>
        )}

        {rData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Pagas: {rData.filter((d) => d.pago).length}
            </Typography>
          </Grid>
        )}

        {rData.length > 0 && (
          <Grid item>
            <Typography variant="h5" component="h2">
              Pendentes:
              {rData.filter((d) => !d.pago).length}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export { Info };
