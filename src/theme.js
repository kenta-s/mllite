import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: '#16a085',
    },
    secondary: {
      main: '#e74c3c',
    },
    // error: {
    //   main: red.A400,
    // },
    // background: {
    //   default: '#fff',
    // },
  },
});

export default theme;
