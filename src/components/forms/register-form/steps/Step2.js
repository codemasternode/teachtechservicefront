import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { RegisterFormContext } from "../RegisterForm";
import { withStyles } from "@material-ui/core";

const styles = theme => {
  return {
    card: {
      width: "100%",
      height: "100%",
      boxShadow: "none",
      display: "flex",
      flexDirection: "column"
    },
    field: {
      maxWidth: 300,
      width: "100%"
    },
    area: {
      width: "100%"
    },
    col: {
      padding: "2rem"
    }
  };
};

const fields = [
  {
    label: "Imię",
    name: "first_name",
    required: true,
    type: "text"
  },
  {
    label: "Nazwisko",
    name: "last_name",
    required: true,
    type: "text"
  },
  {
    label: "Email",
    name: "email",
    required: true,
    type: "text"
  },
  {
    label: "Hasło",
    name: "password",
    required: true,
    type: "password"
  },
  {
    label: "Potwierdź hasło",
    name: "password",
    required: true,
    type: "password"
  },
  {
    label: "Data urodzenia",
    name: "birthday",
    required: true,
    type: "date"
  }
];

export default withStyles(styles)(({ classes }) => (
  <React.Fragment>
    <Grid container>
      <Grid xs={12} sm={7} md={6} item className={classes.col}>
        <Card className={classes.card}>
          {fields.map((value, index) => (
            <TextField
              label={value.label + (value.required ? "*" : "")}
              name={value.name}
              margin="normal"
              variant="outlined"
              className={classes.field}
              type={value.type}
              InputLabelProps={{
                shrink: true
              }}
            />
          ))}
        </Card>
      </Grid>
      <Grid xs={12} sm={5} md={6} item className={classes.col}>
        <TextField
          label="Powiedz mi coś o sobie"
          margin="normal"
          name="description"
          variant="outlined"
          multiline={true}
          rows={10}
          className={classes.area}
        />
      </Grid>
    </Grid>
  </React.Fragment>
));
