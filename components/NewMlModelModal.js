/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux'
import { addMlModel } from '../actions/mlModels';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    top: theme.spacing(1),
  },
  paper: {
    width: 360,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const NewMlModelModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modelName, setModelName] = React.useState('');
	const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const submitMlModel = () => {
    axios.post('https://virtserver.swaggerhub.com/kenta-s/mllite/1.0.0-oas3/ml_models',
		  {ml_model: {
			  name: modelName
		  }})
			.then(response => {
				dispatch(addMlModel(response.data))
			  handleClose()
			})
	}

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">モデル作成</h2>
						<TextField
							required
							label="モデル名"
							placeholder="例) ニュース記事のクラス分類"
							value={modelName}
							onChange={e => setModelName(e.target.value)}
							className={classes.textField}
							margin="normal"
							variant="outlined"
						/>
						<Button variant="contained" color="primary" className={classes.button} onClick={submitMlModel}>
							作成
						</Button>

						<Button variant="contained" color="secondary" className={classes.button} style={{marginLeft: 10}} onClick={() => handleClose()}>
							キャンセル
						</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default NewMlModelModal
