import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Stepper from "./Stepper";
import { Step1, Step2, Main } from "./steps/index";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    width: "100%",
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
  },
  controlPanel: {
    marginTop: "2rem",
    marginBottom: "6rem"
  },
  mail: {
    maxWidth: 60
  }
});

function getSteps() {
  return ["Uzupełnij dane"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step2 />;
    default:
      return "Unknown step";
  }
}

const RegisterFormContext = React.createContext();

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    plan: 1,
    periodValue: 1,
    periodPlan: {
      multiplier: 1,
      months: 4
    },
    errors: {},
    toPay: 0,
    ranges: [
      {
        multiplier: 1.4,
        months: 1
      },
      {
        multiplier: 1,
        months: 4
      },
      {
        multiplier: 0.85,
        months: 9
      },
      {
        multiplier: 0.75,
        months: 12
      }
    ]
  };

  handleRedirectHome = () => {
    this.props.history.push("/");
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

  setPeriodPlan = period => {
    this.setState({
      periodValue: period,
      periodPlan: this.state.ranges[period]
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  onFormChange(e, value) {
    console.log(e.target.name, e.target.value, value);
    this.setState({
      newUser: {
        ...this.state.newUser,
        [e.target.name]: e.target.value
      }
    });
    process.nextTick(() => {
      console.log(this.state.newUser);
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
  }

  onFormBlur(e, isRequired) {
    if (isRequired && e.target.value.length == 0) {
      this.setState({
        errors: {
          ...this.state.errors,
          [e.target.name]: "Pole jest wymagane"
        }
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          [e.target.name]: ""
        }
      });
    }
  }

  onBlurEmail(e) {}

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    return (
      <RegisterFormContext.Provider
        value={{
          setPlan: this.setPlan.bind(this),
          plan: this.state.plan,
          setPeriodPlan: this.setPeriodPlan,
          ranges: this.state.ranges,
          periodValue: this.state.periodValue,
          periodPlan: this.state.periodPlan,
          onFormChange: this.onFormChange.bind(this),
          onFormSubmit: this.onFormSubmit.bind(this),
          onBlurEmail: this.onBlurEmail.bind(this),
          onFormBlur: this.onFormBlur.bind(this),
          errors: this.state.errors
        }}
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
                <img src="images/send-mail.svg" className={classes.mail} />
                <Typography className={classes.instructions}>
                  Wysłaliśmy email aktywacyjny
                  <br /> na twoją skrzynkę odbiorczą
                </Typography>

                <Button
                  onClick={this.handleRedirectHome}
                  className={classes.button}
                  variant="outlined"
                  style={{ marginTop: "4rem" }}
                >
                  Powrót do strony głównej
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div className={classes.controlPanel}>
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
export default withRouter(withStyles(styles)(HorizontalLinearStepper));
