import React from 'react';
// import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)',
    zIndex: 1000,
  },
}));

const Loading = () => {
  const classes = useStyles();
  const loading = useSelector(state => state.loading.isLoading)

  return (
    <React.Fragment>
      { loading &&
        <CircularProgress className={classes.progress} />
      }
    </React.Fragment>
  )
}

export default Loading
