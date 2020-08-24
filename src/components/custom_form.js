import React from "react";
import {
  Button,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { Formik, Form, ErrorMessage } from "formik";

const CustomForm = ({ initialData, action, despesa }) => (
  <Formik
    initialValues={initialData}
    validate={(values) => {
      const errors = {};

      const { valor, descricao, data } = values;

      if (valor <= 0) errors.valor = "Valor deve ser maior que 0";

      if (!descricao) errors.descricao = "Campo obrigatório";

      if (!data) errors.data = "Campo obrigatório";

      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      action(values);

      setSubmitting(false);
    }}
  >
    {({ isSubmitting, values, handleSubmit, handleChange }) => (
      <Form>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid xs={6} item>
            <TextField
              variant="outlined"
              name="descricao"
              label="Descrição"
              type="text"
              value={values.descricao}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <ErrorMessage name="descricao" component="div" />
          </Grid>

          <Grid xs={6} item>
            <TextField
              variant="outlined"
              name="valor"
              label="Valor"
              type="number"
              step="0.01"
              value={values.valor}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <ErrorMessage name="valor" component="div" />
          </Grid>

          <Grid xs={6} item>
            {" "}
            <TextField
              variant="outlined"
              name="data"
              label="Data"
              type="datetime-local"
              value={values.data}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <ErrorMessage name="data" component="div" />
          </Grid>

          <Grid xs={6} item>
            <FormControlLabel
              label={despesa ? "Pago?" : "Recebido?"}
              control={
                <Switch
                  checked={despesa ? values.pago : values.recebido}
                  onChange={handleChange}
                  color="primary"
                  name={despesa ? "pago" : "recebido"}
                  type="checkbox"
                />
              }
            />
            <ErrorMessage
              name={despesa ? "pago" : "recebido"}
              component="div"
            />
          </Grid>

          <Grid xs={6} item></Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          enviar
        </Button>
      </Form>
    )}
  </Formik>
);

export { CustomForm };
