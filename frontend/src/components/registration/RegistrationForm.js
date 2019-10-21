import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Form from './Form';
import Styles from './Styles';

function RegistrationForm(props) {
  const { classes, openSnackbar, setError } = props;
  return (
    <div className={classes.paper}>
      <div className={classes.registration}>Sign Up</div>
      <Form classes={classes} setError={setError} openSnackbar={openSnackbar} />
    </div>
  );
}

RegistrationForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  openSnackbar: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export default withStyles(Styles)(RegistrationForm);
