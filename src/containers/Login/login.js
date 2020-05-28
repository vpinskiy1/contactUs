import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  CircularProgress,
  Checkbox,
  Link,
  Grid,
  Box,
} from "@material-ui/core";
// import axios from "react-axios";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, useTheme } from "@material-ui/core/styles";
import styles from "./styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      fields: {},
      emailErr: false,
      passErr: false,
      loading: false,
    };
  }
  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      this.state.emailErr = true;
      errors["email"] = "Email Field not to be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        this.state.emailErr = true;
        errors["email"] = "Email is not valid";
      }
      if (fields["email"] != "admin@admin.com") {
        formIsValid = false;
        errors["email"] = "Incorrect Email";
      }
    } else {
      this.state.emailErr = false;
    }

    //Password
    if (!fields["password"]) {
      formIsValid = false;
      this.state.passErr = true;
      errors["password"] = "Password field should not be empty";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match("admin")) {
        formIsValid = false;
        this.state.passErr = true;
        errors["password"] = "Incorrect Password";
      }
    } else {
      this.state.passErr = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  signIn = (event) => {
    event.preventDefault();
    let email = this.state.fields.email;

    if (this.handleValidation()) {
      localStorage.setItem("email", email);
      this.setState({ loading: true });
      setTimeout(() => {
        this.props.history.push("/email");
      }, 2000);
    } else {
      this.setState({ loading: false });
      return false;
    }
  };

  inputField = (e) => {
    let fieldName = e.target.name;
    let fields = this.state.fields;
    fields[fieldName] = e.target.value;
    this.setState({ fields });
  };

  render() {
    const { classes, theme } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={this.signIn} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                error={this.state.errors.email ? true : false}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.inputField}
                autoFocus
                helperText={this.state.errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                error={this.state.errors.password ? true : false}
                required
                fullWidth
                name="password"
                label="Password"
                onChange={this.inputField}
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={this.state.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {loading && (
                    <div className="loader">
                      <CircularProgress />
                    </div>
                  )}
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { theme: true })(SignIn);
