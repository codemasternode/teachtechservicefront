import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Field from "./Field";
// pojedyncze -> godzina rozpoczęcia i zakończenia, data,budynek

const formStyles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "1rem"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",

    maxWidth: 1600,
    marginLeft: "auto",
    marginRigth: "auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

export default withStyles(formStyles)(
  ({ classes, values = {}, fields, formStyles = {}, ...rest }) => (
    <form className={classes.container} style={formStyles} noValidate>
      {fields.map((field, index) => {
        let defaultValue = "";
        for (let i in values) {
          if (field.name === i) {
            defaultValue = values[i];
            break;
          }
        }
        return (
          <React.Fragment>
            <Field
              key={index}
              defaultValue={defaultValue}
              field={field}
              styles={classes}
              {...rest}
            />
          </React.Fragment>
        );
      })}
    </form>
  )
);
