import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import logo from "../../assets/logo.svg";
import { TextField, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetState, SignIn, ClearState } from '../../redux/reducers/auth';
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      boxShadow:
        '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
      paddingLeft: 30,
      paddingRight: 31,
      paddingTop: 61,
      paddingBottom: 21.61,
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    MuiTextFieldRoot: {
      width: '100%'
    },
    MuiFormControlRoot: {
      width: '100%'
    }
  })
);

const styles = {
  grid: {
    height: '100vh',
    maxWidth: '100%',
    flexBasis: '35%'
  },
  pt128: {
    paddingBottom: '128px',
    justifyContent: 'center '
  },
  mt30: {
    marginBottom: '30px'
    // borderColor: '#3f51b5'
  },
  mt16: {
    marginBottom: '16px'
  },
  button: {
    background: '#3f51b5',
    marginTop: '26px'
  },
  pt67: {
    marginTop: '64.59',
    marginBottom: '67px',
    color: '#000000',
    fontSize: '30px',
    textAlign: 'center',
    display: 'block'
  },
  textRight: {
    marginTop: '16px',
    display: 'block',
    color: '#201F1E',
    textAlign: 'right',
    fontSize: 14,
    cursor: 'pointer'
  },
  createAccount: {
    marginTop: '26px',
    color: '#201F1E',
    textAlign: 'center',
    fontSize: 14,
    display: 'block'
  },
  color: {
    color: '#3f51b5',
    cursor: 'pointer'
  },
  textDanger: {
    color: '#ff0000'
  }
};

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const [signInObject, setSignInObject] = useState({});
  const { email, password, err, done, token, loading } = useSelector(
    (state) => state.auth
  );
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setSignInObject({
      ...signInObject,
      [name]: value
    });
  };
  const handleSubmit = () => {
    if (signInObject.email !== '' && signInObject.password !== '')
      dispatch(
        SignIn({ email: signInObject.email, password: signInObject.password })
      );
    else
      dispatch(
        SetState({ field: 'err', value: 'please enter email and password' })
      );
  };
  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={styles.grid}
    >
      <Grid item md={4}>
        <Box textAlign='center'>
          {/* <img src={logo} style={styles.pt128} /> */}
        </Box>
        <Paper
          className={classes.paper}
          style={{ height: 'calc(100% - 90px)' }}
        >
          <small style={styles.pt67}>Sign in</small>
          <form
            noValidate
            autoComplete='off'
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              value={signInObject.email}
              name='email'
              style={styles.mt30}
              type='text'
              fullWidth={true}
              label='Email Address'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              value={signInObject.password}
              name='password'
              styles={styles.mt30}
              type='password'
              fullWidth={true}
              label='Password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <small
              style={styles.textRight}
              onClick={() => history.push('/auth/forgetpassword')}
            >
              Forgot your password?
            </small>
            {err ? <small style={styles.textDanger}>{err}</small> : ''}
            <Button
              disabled={loading}
              fullWidth={true}
              style={styles.button}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </form>
          <small style={styles.createAccount}>
            Not a member yet?{' '}
            <span
              className='tooltiptext'
              style={styles.color}
              onClick={() => history.push('/auth/signup')}
            >
              Create Account{' '}
            </span>
          </small>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
