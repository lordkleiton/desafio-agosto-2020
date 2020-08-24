import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  local,
  loading as _loading,
  remove,
  create,
  update,
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
import { CustomDialog } from "../../components/custom_dialog";

const Despesas = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updateDialogData, setUpdateDialogId] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();
  const _local = useSelector(local);
  const loading = useSelector(_loading);
  const createData = { valor: 0, pago: false, descricao: "", data: "" };
  const toMoment = (seconds, nanoseconds) =>
    moment(seconds * 1000 + nanoseconds / 1000);

  let data = [];

  for (let k in _local) {
    const v = _local[k];

    if (v.data) data.push(v);
  }

  const toggleCreateDialog = () => {
    setCreateDialogOpen(!createDialogOpen);
  };

  const openUpdateDialog = (_data) => {
    const date = _data.data;
    const newDate = toMoment(date.seconds, date.nanoseconds).format(
      "YYYY-MM-DD[T]hh:mm:ss.SSS"
    );

    setUpdateDialogId(JSON.parse(JSON.stringify({ ..._data, data: newDate })));
    setUpdateDialogOpen(true);
  };
  const closeUpdateDialog = () => {
    setUpdateDialogId({});
    setUpdateDialogOpen(false);
  };

  return (
    <div>
      {!loading && (
        <Button
          color="inherit"
          onClick={() => {
            dispatch(find());
          }}
        >
          atualizar
        </Button>
      )}

      <Button color="inherit" onClick={toggleCreateDialog}>
        criar
      </Button>

      <CustomDialog
        action={(values) => {
          dispatch(create(values));
        }}
        open={createDialogOpen}
        handleClose={toggleCreateDialog}
        title="Nova despesa"
        initialData={createData}
      />

      <CustomDialog
        action={(values) => {
          dispatch(update(values));
        }}
        open={updateDialogOpen}
        initialData={updateDialogData}
        handleClose={closeUpdateDialog}
        title="Atualizar despesa"
      />

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
                  {toMoment(
                    d.data.seconds,
                    d.data.nanoseconds
                  ).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => {
                    openUpdateDialog(d);
                  }}
                >
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

export { Despesas };
