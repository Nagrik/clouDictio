import { clearIsEmailInvalid, clearIsEmailSent } from '@/store/actions/login';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const EmailSent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const goToLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    dispatch(clearIsEmailSent());
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <div>
          <div className={classes.LoginWrapper}>
            <div className={classes.LoginContent}>
              <h1 className={classes.Title}>Email sent</h1>
              <p className={classes.Warning}>
                Thank you. Please check your email and follow the link access your account details.
              </p>
              <div className={classes.Button}>
                <div className={classes.enter} onClick={goToLogin}>Enter another email</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '67px',
    flexDirection: 'column',
    position: 'relative',
  },
  enter: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#374c6b',
    cursor: 'pointer',
  },
  popup: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    height: '30px',
    top: 0,
  },
  LoginWrapper: {
    background: '#FFFFFF',
    borderRadius: '10px',
    padding: '100px 36px',
    display: 'flex',
    width: '528px',
    justifyContent: 'center',
  },
  LoginContent: {
    textAlign: 'center',
  },
  Title: {
    fontSize: '24px',
    lineHeight: '33px',
    color: '#21272E',
    textAlign: 'center',
    fontWeight: 500,
  },
  Input: {
    width: '344px',
    height: '50px',
    border: '1px solid #E0E1E2',
    boxSizing: 'border-box',
    borderRadius: '2px',
    marginTop: '46px',
    padding: '16px',
    outline: 'none',
  },
  Warning: {
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.2px',
    color: '#737B7D',
    paddingTop: '15px',
    textAlign: 'left',
    marginBottom: '48px',
    padding: '16px',
    borderRadius: '2px',
    backgroundColor: '#f2f2f2',
    marginTop: '32px',
  },
  Button: {
    display: 'flex',
    justifyContent: 'center',
  },
});
