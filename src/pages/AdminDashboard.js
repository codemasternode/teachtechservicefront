import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import Panel from "../components/sections/dashboard/Panel";
import { createFields } from "../components/forms/models/createCourseModel";
import { FieldHelper } from "../utils/formHelper";

const styles = {};

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalCreateOpen: false,
      createFields: { ...FieldHelper.getNames(createFields) }
    };
    console.log(this.state);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen = (name, value) => {
    return () => {
      this.setState({ [name]: value });
    };
  };

  handleChange = obj => {
    return (name, value) => {
      console.log(obj, name, value);
      let fields = this.state[obj];
      fields[name] = value;
      console.log(fields);
      this.setState({ [obj]: fields });
      process.nextTick(() => {
        console.log(this.state);
      });
    };
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container>
          <Panel
            isModalCreateOpen={this.state.isModalCreateOpen}
            handleOpen={this.handleOpen.bind(this)}
            values={this.state.createFields}
            handleChange={this.handleChange}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AdminDashboard);
