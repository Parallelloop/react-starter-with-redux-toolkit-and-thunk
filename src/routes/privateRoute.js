import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
const PrivateRoute = ({
  component: Component,
  withLayout: Layout,
  ...rest
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);

  const renderRoute = () => (
    <Route
      {...rest}
      render={(props) =>
        <Component {...props} />
      }
    />
  );

  useEffect(() => {
    if (!token) {
      history.push('/auth/signin');
    }
  }, [token]);


  return token ? (<Layout>{renderRoute()}</Layout>) : (
    <Backdrop open={true} style={{ zIndex: '9' }}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default PrivateRoute;
