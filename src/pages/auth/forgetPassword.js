import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import logo from "../../assets/logo.svg";
import { CardMedia, TextField, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetState, SendEmail, ClearState } from '../../redux/reducers/auth';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      boxShadow:
        '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
      paddingLeft: 20,
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
    height: '100vh'
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pt128: {
    paddingBottom: '126px',
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
    fontSize: '36px',
    textAlign: 'center',
    display: 'block'
  },
  resetPassword: {
    marginBottom: '23px',
    color: '#201F1E',
    fontSize: '14px',
    textAlign: 'center',
    display: 'block'
  },
  textRight: {
    marginTop: '16px',
    display: 'block',
    color: '#201F1E',
    textAlign: 'right',
    fontSize: 14
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
  },
  textGreen: {
    color: '#008000'
  }
};

const ForgotPassword = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [forgetPasswordObject, setForgetPasswordObject] = useState({});
  const classes = useStyles();
  const { email, err, emailSent, message, loading } = useSelector(
    (state) => state.auth
  );
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setForgetPasswordObject({
      ...forgetPasswordObject,
      [name]: value
    });
  };
  const handleSubmit = () => {
    if (forgetPasswordObject.email) {
      dispatch(SendEmail(forgetPasswordObject.email));
    } else {
      dispatch(SetState({ field: 'err', value: 'please enter email' }));
    }
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
        <Paper className={classes.paper}>
          <small style={styles.pt67}>Reset your password</small>
          <small style={styles.resetPassword}>
            Enter your email below to reset your password.
          </small>
          <form
            noValidate
            autoComplete='off'
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              value={forgetPasswordObject.email}
              style={styles.mt30}
              name='email'
              type='text'
              fullWidth={true}
              label='Email Address'
              variant='outlined'
              onChange={handleInputChange}
            />
            {err || emailSent ? (
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
              Send
            </Button>
          </form>
          <small style={styles.createAccount}>
            Go back to{' '}
            <span
              style={styles.color}
              onClick={() => history.push('/auth/signin')}
            >
              Sign in{' '}
            </span>
          </small>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
