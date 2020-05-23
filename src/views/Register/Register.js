import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card/Card.js';
import './style.css';
import imagine4 from 'assets/img/img_avatar2.png';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import cn from 'classnames';
import allActions from '../../actions';
Register.propTypes = {};

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
});
function Register(props) {
  const classes = useStyles();
  const { history } = props;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values) => {
    dispatch(allActions.userActions.register(values, history));
  };
  const handleFirstNameChange = (event) => {
    let value = event.target.value;
    setFirstName(value);
  };
  const handleLastNameChange = (event) => {
    let value = event.target.value;
    setLastName(value);
  };
  const handleEmailChange = (event) => {
    let value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    let value = event.target.value;
    setPassword(value);
  };
  const handleConfirmPwd = (event) => {
    let value = event.target.value;
    setConfirmPwd(value);
  };
  return (
    <div className={classes.background}>
      <Card className={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Register Form</h3>
          <div className="container">
            <div className={cn(classes.justifyCenter, 'form-row')}>
              <div className="form-group col-8">
                <input
                  onChange={handleFirstNameChange}
                  value={firstName}
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  class="form-control"
                  ref={register({})}
                  required
                />
              </div>
              <div className="form-group col-8">
                <input
                  onChange={handleLastNameChange}
                  value={lastName}
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  class="form-control"
                  ref={register({})}
                  required
                />
              </div>
              <div className="form-group col-8">
                <input
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  class="form-control"
                  ref={register({})}
                  required
                />
              </div>
            </div>
            <div className={cn(classes.justifyCenter, 'form-row')}>
              <div className="form-group col-8">
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  type="text"
                  placeholder="Enter password"
                  name="password"
                  class="form-control"
                  ref={register({})}
                  required
                />
              </div>
              <div className="form-group col-8">
                <input
                  onChange={handleConfirmPwd}
                  value={confirmPwd}
                  type="text"
                  placeholder="Enter confirm password"
                  name="confirmPassword"
                  class="form-control"
                  required
                />
              </div>
            </div>

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
                  Register
                </button>
              </div>
            </div>

            <div className={classes.signup}>
              Already account?
              <NavLink to={'/login'}>Login now</NavLink>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Register;
