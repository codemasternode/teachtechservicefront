import React from "react";
import TextField from "@material-ui/core/TextField";

// pojedyncze -> godzina rozpoczęcia i zakończenia, data,budynek

export default ({
  styles,
  field: { label, type, name, ...rest },
  handleChange,
  defaultValue
}) => {
  return type !== "select" ? (
    <TextField
      label={label}
      className={styles.textField}
      name={name}
      onChange={e => handleChange(e.target.name, e.target.value)}
      margin="normal"
      type={type}
      value={defaultValue}
      InputLabelProps={{
        shrink: true
      }}
    />
  ) : (
    <TextField
      label={label}
      className={styles.textField}
      name={name}
      onChange={e => handleChange(e.target.name, e.target.value)}
      margin="normal"
      value={rest.values[0].value}
      select
      value={defaultValue}
      SelectProps={{
        native: true,
        MenuProps: {
          className: styles.menu
        }
      }}
    >
      {rest.values.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};
