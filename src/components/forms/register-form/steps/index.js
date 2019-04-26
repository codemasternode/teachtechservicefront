import React from "react";
import Grid from "@material-ui/core/Grid";
import Step1 from "./Step1";
import Step2 from "./Step2";

const Main = props => (
  <Grid
    container
    style={{
      width: "100%",
      maxWidth: 1200,
      marginLeft: "auto",
      marginRight: "auto"
    }}
  >
    <Grid xs={12}>{props.children}</Grid>
  </Grid>
);

export { Step1, Step2, Main };
