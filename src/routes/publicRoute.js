import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Backdrop } from '@material-ui/core';
const PublicRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogged, token } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      history.push('/dashboard/main')
    }
  }, [token])

  return (token === '' ? <div>
    <Route {...rest} render={(props) => <Component {...props} />} />
  </div> : <Backdrop open={true} style={{ zIndex: '9' }}>
      <CircularProgress color='inherit' />
    </Backdrop>)
};

export default PublicRoute;
