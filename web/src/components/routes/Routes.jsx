import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import { Landing } from "../views/Landing";
import { Register } from "../views/Register";
import { Login } from "../views/Login";

import PrivateRoute from "./PrivateRoute.routes";
import { Logout } from "../views/Logout";
import { Chat } from "../Chat";

export default () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/chat" component={Chat} />
      </Switch>
    </Fragment>
  );
};
