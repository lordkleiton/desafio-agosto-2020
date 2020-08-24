import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  local,
  loading as _loading,
  remove,
  //create,
  //update,
  find,
} from "../../app/slices/despesas";

import {
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  CardActions,
  IconButton,
} from "@material-ui/core";

import { Edit, Delete } from "@material-ui/icons";

import moment from "moment";

const useStyles = makeStyles({
  card: {
    width: 250,
    wordBreak: "break-all",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Despesas = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const _local = useSelector(local);
  const loading = useSelector(_loading);
  const toMoment = (seconds, nanoseconds) =>
    moment(seconds * 1000 + nanoseconds / 1000).toLocaleString();

  let data = [];

  for (let k in _local) {
    const v = _local[k];

    if (v.data) data.push(v);
  }

  return (
    <div>
      {!loading && (
        <Button
          color="inherit"
          onClick={() => {
            dispatch(find());
          }}
        >
          carregar
        </Button>
      )}

      <Grid container spacing={3} alignItems="center" justify="center">
        {data.map((d) => (
          <Grid key={d.id} item>
            <Card>
              <CardContent className={classes.card}>
                <Typography variant="h5" component="h2">
                  {d.valor}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {d.pago ? "pago" : "pendente"}
                </Typography>
                <Typography variant="body2" component="p">
                  {d.descricao}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {toMoment(d.data.seconds, d.data.nanoseconds)}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => {
                    dispatch(remove(d.id));
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export { Despesas };
