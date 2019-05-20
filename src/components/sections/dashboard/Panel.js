import React from "react";
import {
  Grid,
  Button,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { createFields } from "../../forms/models/createCourseModel";
import Form from "../../forms/Form";

const styles = theme => ({
  button: {},
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: "absolute"
  }
});

export default withStyles(styles)(
  ({ classes, handleOpen, isModalCreateOpen, values, handleChange }) => (
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleOpen("isModalCreateOpen", true)}
      >
        Stwórz kurs
      </Button>
      <Dialog
        open={isModalCreateOpen}
        onClose={handleOpen("isModalCreateOpen", false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Stwórz nowy kurs</DialogTitle>
        <DialogContent>
          <Form
            values={values}
            fields={createFields}
            handleChange={handleChange("createFields")}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOpen("isModalCreateOpen", false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button color="primary">Stwórz</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
);
