import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  CircularProgress,
  Link,
  Grid,
  Box,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Typography from "@material-ui/core/Typography";
import { withStyles, useTheme } from "@material-ui/core/styles";
import styles from "./styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

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

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      fields: {},
      emailErr: false,
      passErr: false,
      loading: false,
      success: false,
    };
  }

  componentWillMount() {
    let email = localStorage.getItem("email");
    if (!email) {
      this.props.history.push("/");
    }
  }

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Please Provide an Email";
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
        errors["email"] = "Email is not valid";
      }
    }

    //Password
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Please Provide Name";
    }

    //Message
    if (!fields["message"]) {
      formIsValid = false;
      errors["message"] = "Please Provide Message";
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  signIn = (event) => {
    event.preventDefault();
    let email = this.state.fields.email;
    let { fields } = this.state;
    if (this.handleValidation()) {
      this.setState({ loading: true });
      let selff = this;
      axios
        .request({
          url:
            "https://1vwhr4lewg.execute-api.us-east-2.amazonaws.com/RestApi1",
          method: "post",
          data: {
            Subject: "Contact Us Form Data",
            Body: `Email = ${fields.email},Name = ${fields.name},Message = ${fields.message}`,
          },
        })
        .then(function (response) {
          selff.setState({ loading: false, success: true });
          // console.log(response);
        })
        .catch(function (error) {
          selff.setState({ loading: false });
          console.log(error);
        });
    } else {
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
    const { loading, success } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Email
          </Typography>
          <form onSubmit={this.signIn} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              error={this.state.errors.name ? true : false}
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={this.inputField}
              autoFocus
              helperText={this.state.errors.name}
            />

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
              helperText={this.state.errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              error={this.state.errors.message ? true : false}
              required
              fullWidth
              multiline
              rows={4}
              name="message"
              label="Message"
              onChange={this.inputField}
              type="message"
              id="message"
              autoComplete="message"
              helperText={this.state.errors.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>

            {success && (
              <Grid container>
                <Grid item xs>
                  <div className="successMessage">
                    <CheckCircleOutlineIcon /> Thank You, Your Form Submitted
                    Successfully
                  </div>
                </Grid>
              </Grid>
            )}
            {loading && (
              <Grid container>
                <Grid item xs>
                  <div className="loader">
                    <CircularProgress />
                  </div>
                </Grid>
              </Grid>
            )}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles, { theme: true })(Email);
