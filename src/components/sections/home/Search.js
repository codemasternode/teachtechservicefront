import React from "react";
import TextField from "@material-ui/core/TextField";

export default props => (
  <TextField
    id="outlined-full-width"
    label="Kurs"
    style={{ margin: 8 }}
    placeholder="Podaj nazwę kursu"
    fullWidth
    margin="normal"
    variant="outlined"
    InputLabelProps={{
      shrink: true
    }}
  />
);
