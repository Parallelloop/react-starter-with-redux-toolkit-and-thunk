import React, { useState, useEffect } from 'react';
//material-ui-imports
import { makeStyles } from '@material-ui/core';
//redux-import
import { useDispatch, useSelector } from 'react-redux';
// import {
// } from '../../redux/slices/test-slice';

const useStyles = makeStyles((theme) => ({
  Main: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: 230
  }
}));

const Main = () => {
  const classes = useStyles();
  const [test, setTest] = useState('');
  const dispatch = useDispatch();
  // const { user } = useSelector(
  //   (state) => state.auth
  // );
  // useEffect(() => {
  // }, []);
  return <>Main dashboard page</>;
};

export default Main;
