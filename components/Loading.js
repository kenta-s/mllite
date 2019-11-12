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

// const mapStateToProps = state => {
//   return { 
//     loading: state.loading.status,
//   }
// };
// 
// export default connect(
//   mapStateToProps,
//   null
// )(Loading);
export default Loading

