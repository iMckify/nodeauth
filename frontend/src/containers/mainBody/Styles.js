import grey from '@material-ui/core/colors/grey';

const color = grey[100];

const styles = theme => ({
  outerPaper: {
    flexGrow: 1,
    backgroundColor: color,
    width: '100vw',
    minWidth: '270px',
    height: '100vw',
    margin: '2vh',
    padding: '2vh'
  },
  innerPaper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '80vh%',
    width: '20vw',
    top: `64px`,
    left: `${40}%`
  },
  email: {
    width: '100px'
  },
  button: {
    marginTop: '2vh'
  }
});

export default styles;
