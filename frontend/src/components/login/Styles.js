const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '80vh%',
    width: '10vw',
    top: '64px',
    left: `${80}%`
  },
  button: {
    marginTop: '1vh'
  },
  button1: {
    marginTop: '1vh',
    fontSize: 14,
    color: '#551A8B',
    width: '10vw',
    textDecoration: 'underline',
    textTransform: 'none'
  },
  button2: {
    cursor: 'pointer',
    marginTop: '1vh',
    fontSize: 14,
    color: '#551A8B',
    width: '10vw',
    textDecoration: 'underline',
    textTransform: 'none',
    fontWeight: 'bold'
  },
  color: {
    fontSize: 14,
    color: '#551A8B'
  },
  signUp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign: 'center',
    marginTop: '0vh',
    marginBot: '0vh'
  },
  layout: {
    fontSize: 18,
    color: '#3f51b5'
  },
  textFields: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3f51b5'
  }
});

export default modalStyles;
