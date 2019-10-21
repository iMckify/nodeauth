import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authentication';
import Form from './Form';
import Styles from './Styles';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      hover: false
    };
  }

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  hoverOn = () => {
    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  handleLogin = user => {
    const { loginUserProp, setError, openSnackbar } = this.props;
    loginUserProp(user, openSnackbar, setError);
  };

  render() {
    const { classes, className, openRegistration } = this.props;
    const { openModal, hover } = this.state;
    const register = "Don't have an account?";

    return (
      <div>
        <IconButton className={className.menuButton} onClick={this.handleOpen}>
          <Person />
        </IconButton>
        <Modal open={openModal} onClose={this.handleClose}>
          <div className={classes.paper}>
            <div className={classes.signUp}>Sign In</div>
            <div className={classes.layout}>
              <Form passClose={this.handleClose} onSubmit={this.handleLogin} />
            </div>
            <div
              role="button"
              onClick={() => {
                this.handleClose();
                openRegistration();
              }}
              className={hover ? classes.button2 : classes.button1}
              onMouseEnter={this.hoverOn}
              onMouseLeave={this.hoverOff}
            >
              {register}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.shape().isRequired,
  loginUserProp: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  openRegistration: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    loginUserProp: (user, openSnackbar, setError) =>
      loginUser(user, openSnackbar, setError)(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(LoginForm));
