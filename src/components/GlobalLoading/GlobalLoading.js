import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  globalLoading: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 300099,
    background: 'rgba(0,0,0,0.4)',
  },
  icon: {
    position: 'fixed',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    top: '40%',
    width: 100,
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.globalLoading}>
      <div className={classes.root}>
        <CircularProgress color="secondary" className={classes.icon} />
      </div>
    </div>
  );
}
