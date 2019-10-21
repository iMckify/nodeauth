import React from 'react';
import { connect } from 'react-redux';
import '@babel/polyfill';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Styles from './Styles';
import { RegistrationForm } from '../components/registration';
import { SnackbarContainer } from '../components/snackbar';
import { snackbarMessages } from '../utils/constants';
import { logoutUser } from '../actions/authentication';
import { LoginForm } from '../components/login';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenRegistrationModal: false,
      snackbarContents: {}
    };
  }

  handleRegistrationOpen = () => {
    this.setState({ isOpenRegistrationModal: true });
  };

  setError = err => {
    const errors = err
      ? { message: `${err.Status} : ${err.Message}` }
      : { message: snackbarMessages.unidentified };
    this.setState({ snackbarContents: { message: errors.message, variant: 'error' } });
  };

  openSnackbar = snackbarContents => {
    this.setState({ snackbarContents });
  };

  handleSnackbarClose = () => {
    const { snackbarContents } = this.state;
    this.setState({ snackbarContents: { ...snackbarContents, message: undefined } });
  };

  render() {
    const { classes, auth } = this.props;
    const { snackbarContents, isOpenRegistrationModal } = this.state;
    return (
      <Paper className={classes.paper} elevation={24}>
        <LoginForm
          IsAdmin={auth.user.isAdmin}
          className={classes}
          openRegistration={this.handleRegistrationOpen}
          openSnackbar={this.openSnackbar}
          setError={this.setError}
        />
        <RegistrationForm
          openSnackbar={this.openSnackbar}
          isOpenRegistrationModal={isOpenRegistrationModal}
          setError={this.setError}
        />
        <SnackbarContainer
          snackbarContents={snackbarContents}
          handleClose={this.handleSnackbarClose}
        />
      </Paper>
    );
  }
}

MainBody.propTypes = {
  classes: PropTypes.shape().isRequired,
  auth: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return { logoutUserProp: () => logoutUser(dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(MainBody));
