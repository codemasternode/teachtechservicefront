import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

export default ({ activeStep, steps, isStepOptional, isStepSkipped }) => (
  <Stepper activeStep={activeStep}>
    {steps.map((label, index) => {
      const props = {};
      const labelProps = {};
      if (isStepOptional(index)) {
        labelProps.optional = (
          <Typography variant="caption">Opcjonalne</Typography>
        );
      }
      if (isStepSkipped(index)) {
        props.completed = false;
      }
      return (
        <Step key={label} {...props}>
          <StepLabel {...labelProps}>{label}</StepLabel>
        </Step>
      );
    })}
  </Stepper>
);
