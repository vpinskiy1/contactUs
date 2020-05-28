import React from "react";
import SignIn from "../containers/Login/login";
import { Switch, Route, withRouter } from "react-router-dom";
import Email from "../containers/Email/email";

const Routes = () => {
  return (
    <Switch>
      <div className="App">
        <Route exact path="/" component={SignIn} />
        <Route exact path="/email" component={Email} />
      </div>
    </Switch>
  );
};

export default withRouter(Routes);
