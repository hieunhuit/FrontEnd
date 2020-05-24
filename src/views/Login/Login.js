import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card/Card.js';
import './style.css';
import imagine4 from 'assets/img/img_avatar2.png';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import cn from 'classnames';
import allActions from '../../actions';
Login.propTypes = {};

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    minHeight: 500,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -55%)',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpacebetween: {
    justifyContent: 'space-between',
  },
  background: {
    background: 'url(https://devforum.info/DEMO/LoginForm1/bg.jpg) ',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', //canh giữa đứng, mặc định sắp theo row
    justifyContent: 'center', //canh giữa trục ngang
    minHeight: '100vh',
    textAlign: 'center',
    flex: '1 0 auto',
  },
  links: {
    display: 'flex',
    margin: '0px 65px',
  },

  itemLink: {
    width: '45%',
    border: '1px solid silver',
    padding: '4px 0px',
    borderRadius: '2px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  iconFacebook: {
    marginRight: '10px',
    color: '#4267B2',
  },
  iconGithub: {
    marginRight: '10px',
  },
  signup: {
    margin: '10px 0px',
  },
  error: {
    color: 'red',
    marginTop: '-10px',
    textAlign: 'left',
    paddingLeft: '80px',
  },
  showError: {
    display: 'block',
  },
});
function Login(props) {
  const classes = useStyles();
  const { history } = props;
  let { from } = props.location.state || { from: { pathname: '/admin/dashboard' } };
  const { errorMsg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const { handleSubmit, register, errors } = useForm();
  const responseFacebook = (response) => {
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      dispatch(allActions.authActions.loginWithFacebook(response, history, from));
    } else {
      setLogin(false);
    }
  };
  const onSubmit = (values) => {
    if (!errors.email) dispatch(allActions.authActions.login(values, history, from));
  };

  return (
    <div className={classes.background}>
      <Card className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="imgcontainer">
            <img src={imagine4} alt="Avatar" className="avatar" />
          </div>
          <h3>Login Form</h3>
          <div className="container">
            <div className={cn(classes.justifyCenter, 'form-row')}>
              <div className="form-group col-8">
                <input
                  defaultValue=""
                  placeholder="Enter email"
                  name="email"
                  class="form-control"
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'invalid email address',
                    },
                  })}
                />
              </div>
            </div>

            <div className={cn(classes.justifyCenter, 'form-row')}>
              <div className="form-group col-8">
                <input
                  defaultValue=""
                  type="text"
                  placeholder="Enter password"
                  name="password"
                  class="form-control"
                  ref={register({
                    required: true,
                  })}
                />
              </div>
            </div>
            {errors.password && <div className={classes.error}>{errors.password.message}</div>}
            {errors.email && <div className={classes.error}>{errors.email.message}</div>}
            {errorMsg && <div className={classes.error}>{errorMsg}</div>}
            <div className={cn(classes.justifyCenter, 'form-row')}>
              <div className="form-group col-8">
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{
                    width: '100%',
                    background: '-webkit-linear-gradient(right,#fc00ff,#00dbde)',
                  }}
                >
                  Login
                </button>
              </div>
            </div>
            <div className={cn(classes.links, classes.justifySpacebetween, 'form-row')}>
              <div className={classes.itemLink}>
                <FacebookLogin
                  appId="247498636594667"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
                  className={classes.iconFacebook}
                  render={(renderProps) => (
                    <span onClick={renderProps.onClick}>
                      <FontAwesomeIcon icon={faFacebookF} className={classes.iconFacebook} />
                      Facebook
                    </span>
                  )}
                />
              </div>
              <div className={classes.itemLink}>
                <FontAwesomeIcon icon={faGithub} className={classes.iconGithub} />
                <span>Github</span>
              </div>
            </div>
            <div className={classes.signup}>
              Not a member?
              <NavLink to={'/register'}>Register</NavLink>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
