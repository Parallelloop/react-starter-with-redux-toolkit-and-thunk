import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthRoute from './routes/AuthRoute';
import AppRoute from './routes/AppRoute';

import './app.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path='/auth' />
        <AppRoute path='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
