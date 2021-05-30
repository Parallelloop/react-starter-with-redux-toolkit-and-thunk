import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import logo from "../../assets/logo.svg";
import { CardMedia, TextField, Button, Checkbox, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  SetState,
  SignIn,
  ClearState,
  NewUser
} from '../../redux/reducers/auth';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
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
    height: '100%',
    maxWidth: '100%',
    flexBasis: '35%'
  },
  pt128: {
    paddingBottom: '50px',
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
  textLeft: {
    marginTop: '30px',
    display: 'flex',
    color: '#201F1E',
    fontSize: 14,
    alignItems: 'center'
  },
  alreadyMember: {
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
  },
  textGreen: {
    color: '#008000'
  }
};

const SignUp = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { err, signup, loading, message } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [signUpObject, setSignUpObject] = useState({});
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setSignUpObject({
      ...signUpObject,
      [name]: value
    });
  };
  const handleSubmit = () => {
    const { name, email, password, confirmPassword, agreePolicy } =
      signUpObject;
    if (!name || !password || !confirmPassword || !email) {
      dispatch(
        SetState({
          field: 'err',
          value: 'please enter all the required fields'
        })
      );
    } else if (!agreePolicy) {
      dispatch(
        SetState({ field: 'err', value: 'please checked our agree policy' })
      );
    } else if (password !== confirmPassword) {
      dispatch(SetState({ field: 'err', value: 'password not match' }));
    } else {
      dispatch(NewUser({ email, password, name }));
    }
  };
  useEffect(() => {
    if (signup) history.push('/dashboard/main');
  }, [signup]);

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={styles.grid}
    >
      <Grid item md={4} style={styles.grid}>
        <Box textAlign='center'>
          {/* <img src={logo} style={styles.pt128} /> */}
        </Box>
        <Paper
          className={classes.paper}
          style={{ height: 'calc(100% - 90px)' }}
        >
          <small style={styles.pt67}>Sign up</small>
          <form
            noValidate
            autoComplete='off'
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              style={styles.mt30}
              value={signUpObject.name}
              type='text'
              fullWidth={true}
              label='Name'
              name='name'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              style={styles.mt30}
              value={signUpObject.email}
              type='text'
              name='email'
              fullWidth={true}
              label='Email Address'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              style={styles.mt30}
              value={signUpObject.password}
              type='password'
              name='password'
              fullWidth={true}
              label='Password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <TextField
              style={styles.mt30}
              value={signUpObject.confirmPassword}
              name='confirmPassword'
              type='password'
              fullWidth={true}
              label='Confirm Password'
              variant='outlined'
              onChange={handleInputChange}
            />
            <small style={styles.textLeft}>
              {' '}
              <Checkbox
                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                checked={signUpObject.agreePolicy}
                name='agreePolicy'
                onChange={handleInputChange}
              />{' '}
              I agree with <span style={styles.color}> Privacy Policy </span>{' '}
              and <span style={styles.color}>Terms of Use</span>
            </small>
            {err || signup ? (
              <small style={err ? styles.textDanger : styles.textGreen}>
                {err || message}
              </small>
            ) : (
              ''
            )}
            <Button
              disabled={loading}
              fullWidth={true}
              style={styles.button}
              variant='contained'
              color='primary'
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </form>
          <small style={styles.alreadyMember}>
            Already a member{' '}
            <span
              style={styles.color}
              onClick={() => history.push('/auth/signin')}
            >
              Sign In
            </span>
          </small>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
