import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
//Component
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/dashboard";
import Main from "../pages/dashboard/main";
import PageNotFound from "../pages/PageNotFound";

const Index = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard/main" />
      </Route>
      <PrivateRoute
        path="/dashboard/main"
        component={Main}
        withLayout={DashboardLayout}
      />
      <Route path="/not-found" component={PageNotFound} />
      <Redirect from="*" to="/not-found" />
    </Switch>
  );
};
export default Index;
