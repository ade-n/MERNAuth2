import React from "react";
import { Route, Switch } from "react-router-dom";

import Error from "./Error";
import Landing from "../components/layout/Landing";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Alert from "../components/layout/Alert";
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import MultiStepProfile from "../components/profileForm/MultiStep/MultiStepProfile";
import Profile from "../components/profile/Profile";
import EditProfile from "../components/profileForm/EditProfile/EditProfile";
import EducationForm from "../components/profileForm/EducationForm";
import ExperienceForm from "../components/profileForm/ExperienceForm";

const Routes = () => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/create-profile"
          component={MultiStepProfile}
        />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-education" component={EducationForm} />
        <PrivateRoute exact path="/add-experience" component={ExperienceForm} />
        <Route path="*" component={Error} />
      </Switch>
    </section>
  );
};

export default Routes;
