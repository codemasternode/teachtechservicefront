import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { RegisterFormContext } from "../RegisterForm";

const styles = theme => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  range: {
    maxWidth: 800,
    minWidth: 250,
    width: "100%"
  },
  info: {
    minWidth: 300,
    marginTop: "1rem",
    marginBottom: "5rem"
  }
});

class SimpleSlider extends React.Component {
  state = {
    value: 0
  };
  onChange = (e, setPeriodPlan) => {
    setPeriodPlan(e.target.value);
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <RegisterFormContext.Consumer>
          {({ setPeriodPlan, ranges, periodValue }) => {
            console.log(setPeriodPlan);
            return (
              <div className={classes.main}>
                <div className={classes.info}>
                  <h2>
                    Czas trwania: {ranges[periodValue].months}
                    {ranges[periodValue].months == 1 ? (
                      " miesiąc"
                    ) : (
                      <React.Fragment>
                        {ranges[periodValue].months <= 4
                          ? " miesiące"
                          : " miesięcy"}
                      </React.Fragment>
                    )}
                  </h2>
                  <h2>
                    Zniżka:
                    {ranges[periodValue].multiplier == 1 ? (
                      " 0%"
                    ) : (
                      <React.Fragment>
                        {ranges[periodValue].multiplier > 1 ? (
                          <span style={{ color: "red" }}>
                            {` + ${Math.round(
                              (ranges[periodValue].multiplier - 1) * 100
                            )}%`}
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {` - ${Math.round(
                              (1 - ranges[periodValue].multiplier) * 100
                            )}%`}
                          </span>
                        )}
                      </React.Fragment>
                    )}
                  </h2>
                </div>

                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={periodValue}
                  onChange={e => this.onChange(e, setPeriodPlan)}
                  className={classes.range}
                />
              </div>
            );
          }}
        </RegisterFormContext.Consumer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SimpleSlider);
