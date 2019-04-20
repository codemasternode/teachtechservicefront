import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Stepper from "./Stepper";
import { Step1, Step2, Step3, Main } from "./steps/index";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100vh",
    marginLeft: "auto",
    marginRight: "auto"
  },
  main: {
    minHeight: "100vh"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ["Wybierz plan", "Konto Podstawowe", "Konto Twórcy (opcjonalne)"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    case 2:
      return <Step3 />;
    default:
      return "Unknown step";
  }
}

const RegisterFormContext = React.createContext();

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 1,
    skipped: new Set(),
    plan: 1
  };

  setPlan = number => {
    console.log(number);
    if (typeof number != "number") {
      throw new Error("It is not a number");
    }
    this.setState({
      plan: number
    });
    process.nextTick(() => {
      console.log(this.state);
    });
  };

  isStepOptional = step => step === 2;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <RegisterFormContext.Provider
        value={{ setPlan: this.setPlan.bind(this), plan: this.state.plan }}
      >
        <div className={classes.root}>
          <Main className={classes.main}>
            <Stepper
              activeStep={activeStep}
              steps={steps}
              isStepOptional={this.isStepOptional}
              isStepSkipped={this.isStepSkipped.bind(this)}
            />
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Wstecz
                  </Button>
                  {this.isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSkip}
                      className={classes.button}
                    >
                      Pomiń
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Zakończ" : "Dalej"}
                  </Button>
                </div>
              </div>
            )}
          </Main>
        </div>
      </RegisterFormContext.Provider>
    );
  }
}

HorizontalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export { RegisterFormContext };
export default withStyles(styles)(HorizontalLinearStepper);
