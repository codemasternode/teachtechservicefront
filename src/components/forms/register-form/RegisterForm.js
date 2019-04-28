import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Stepper from "./Stepper";
import { Step1, Step2, Main } from "./steps/index";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { validateEmail } from "../../../utils/formValidation/formValidation";

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
    if (typeof number != "number") {
      throw new Error("It is not a number");
    }
    this.setState({
      plan: number
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
    if (activeStep == getSteps().length - 1) {
      let properties = [
        "first_name",
        "last_name",
        "email",
        "username",
        "password",
        "confirmPassword"
      ];
      if (!this.state.newUser) {
        for (let i = 0; i < properties.length; i++) {
          process.nextTick(() => {
            let currentProperty = properties[i];
            this.setState({
              errors: {
                ...this.state.errors,
                [currentProperty]: "To pole jest wymagane"
              }
            });
          });
          return;
        }
      }
      if (this.state.newUser.password != this.state.newUser.confirmPassword) {
        process.nextTick(() => {
          this.setState({
            errors: {
              ...this.state.errors,
              password: "Hasłą są różne",
              confirmPassword: "Hasłą są różne"
            }
          });
        });
      }
      let errors = 0;
      for (let i = 0; i < properties.length; i++) {
        process.nextTick(() => {
          let currentProperty = properties[i];
          if (
            !this.state.newUser[currentProperty] ||
            this.state.newUser[currentProperty].length == 0 ||
            this.state.errors[currentProperty]
          ) {
            this.setState({
              errors: {
                ...this.state.errors,
                [currentProperty]: "To pole jest wymagane"
              }
            });
            errors++;
          }
        });
      }
      process.nextTick(() => {
        if (errors == 0) {
          Axios({
            url: `${process.env.REACT_APP_PUBLIC_URL}/auth/register`,
            method: "POST",
            data: {
              user: this.state.newUser
            }
          })
            .then(response => {
              this.setState({
                activeStep: activeStep + 1,
                skipped
              });
            })
            .catch(err => {
              console.log(err.response);
            });
        }
      });
    } else {
      this.setState({
        activeStep: activeStep + 1,
        skipped
      });
    }
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
    this.setState({
      newUser: {
        ...this.state.newUser,
        [e.target.name]: e.target.value
      }
    });
    let name = e.target.name;
    setTimeout(() => {
      console.log(e);
      if (name == "password" || name == "confirmPassword") {
        if (this.state.newUser) {
          console.log(this.state);
          if (
            this.state.newUser.password === this.state.newUser.confirmPassword
          ) {
            this.setState({
              errors: {
                ...this.state.errors,
                password: undefined,
                confirmPassword: undefined
              }
            });
          }
        }
      }
    }, 200);
  }

  onFormSubmit(e) {
    e.preventDefault();
  }

  onFormBlur(e, isRequired) {
    let { name, value } = e.target;
    if (isRequired && value.length == 0) {
      process.nextTick(() => {
        this.setState({
          errors: {
            ...this.state.errors,
            [name]: "Pole jest wymagane"
          }
        });
      });
      return;
    }

    if (name == "email" && !validateEmail(value)) {
      process.nextTick(() => {
        this.setState({
          errors: {
            ...this.state.errors,
            email: "To nie jest email"
          }
        });
      });
      return;
    }

    if (name == "email" && validateEmail(value)) {
      process.nextTick(() => {
        this.setState({
          errors: {
            ...this.state.errors,
            email: undefined
          }
        });
      });
      console.log()
      if (name === "email") {
        this.onBlurEmail();
      }
    }
    if (this.state.newUser) {
      if (this.state.newUser[name]) {
        process.nextTick(() => {
          this.setState({
            errors: {
              ...this.state.errors,
              [name]: undefined
            }
          });
        });
      }
      if (name === "confirmPassword" || name === "password") {
        if (this.state.newUser.password != this.state.newUser.confirmPassword) {
          process.nextTick(() => {
            this.setState({
              errors: {
                ...this.state.errors,
                confirmPassword: "Hasła są różne",
                password: "Hasła są różne"
              }
            });
          });
        }
      }
      if (this.state.newUser.password == this.state.newUser.confirmPassword) {
        process.nextTick(() => {
          this.setState({
            errors: {
              ...this.state.errors,
              confirmPassword: undefined,
              password: undefined
            }
          });
        });
      }
    }
  }

  onBlurEmail() {
    console.log("asd")
    Axios({
      url: `${process.env.REACT_APP_PUBLIC_URL}/auth/checkemail`,
      method: "POST",
      data: {
        email: this.state.newUser.email
      }
    }).then(res => {
      console.log(res.data.isOccupied);
      if (res.data.isOccupied) {
        this.setState({
          errors: {
            ...this.state.errors,
            email: "Ten email jest już zajęty"
          }
        });
      } else {
        this.setState({
          errors: {
            ...this.state.errors,
            email: undefined
          }
        });
      }
    });
  }

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
          onFormBlur: this.onFormBlur.bind(this),
          errors: this.state.errors,
          newUser: this.state.newUser
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
