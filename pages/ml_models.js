import React from 'react'
import { connect } from "react-redux"
import Link from '@material-ui/core/Link';
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { receiveMlModels } from '../actions/mlModels'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../components/MainLayout'
import { makeStyles, ServerStyleSheets } from '@material-ui/core/styles';
import NewMlModelModal from '../components/NewMlModelModal'
import { startLoading, finishLoading } from '../actions/loading'
import Title from '../components/Title';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
	paper: {
    padding: theme.spacing(3, 2),
	  margin: theme.spacing(3),
	},
  chips: {
    justifyContent: 'center',
  }
}));

const MlModelPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
	React.useEffect(() => {
	  dispatch(startLoading())
		axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0-oas3/ml_models')
		  .then(response => {
		    dispatch(receiveMlModels(response.data))
		  })
		  .catch(error => {
		    console.error(error)
		  })
			.then(() => {
		    dispatch(finishLoading())
			})
	}, [])
  const mlModels = useSelector(state => state.mlModels.data)
  const mlModelsDom = mlModels.map((mlModel, i) => {
    return(
			<Link key={i} href={`/ml_models/${mlModel.id}`}>
        <Paper className={classes.paper}>
          <Box display="flex" p={1} bgcolor="background.paper">
            <Box p={1} flexGrow={1}>
              {mlModel.name}
            </Box>
            {mlModel.status === 'ready' &&
              <Box p={1}>
                <Chip
                  icon={<FaceIcon />}
                  label="準備ができました"
                  color="primary"
                  className={classes.chips}
                  deleteIcon={<DoneIcon />}
                />
              </Box>
            }
            {mlModel.status === 'pending' &&
              <Box p={1}>
                <Chip
                  icon={<FaceIcon />}
                  label="学習中"
                  color="secondary"
                  className={classes.chips}
                  deleteIcon={<DoneIcon />}
                />
              </Box>
            }
          </Box>
        </Paper>
			</Link>
    )
  })
  return(
    <Layout>
      <Title>モデル一覧</Title>
      <div>
        {mlModelsDom}
      </div>
      <NewMlModelModal />
    </Layout>
  )
}

// MlModelPage.getInitialProps = ({ reduxStore }) => {
//   // const res = await fetch('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models');
//   // const mlModels = await res.json();
//
//   // return { mlModels };
//   const { dispatch } = reduxStore
// 	dispatch(startLoading())
//   return axios.get('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0/ml_models')
//     .then(response => {
//       dispatch(receiveMlModels(response.data))
// 	    dispatch(finishLoading())
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }

export default withRedux(MlModelPage)
