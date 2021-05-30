import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import PublicRoute from './PublicRoute';

import SignIn from '../pages/auth/signIn';
import SignUp from '../pages/auth/signUp';
import ForgetPassword from '../pages/auth/forgetPassword';
import ResetPassword from '../pages/auth/resetPassword';
import PageNotFound from '../pages/PageNotFound';
const AuthRoute = () => {

  return (
    <Switch>
      <PublicRoute path='/auth/signin' component={SignIn} />
      <PublicRoute path='/auth/signup' component={SignUp} />
      <PublicRoute path='/auth/forgetpassword' component={ForgetPassword} />
      <PublicRoute path='/auth/password-change' component={ResetPassword} />
      <Route path="/not-found" component={PageNotFound} />
      <Redirect from='*' to='/not-found' />
    </Switch>
  );
};

export default AuthRoute;
