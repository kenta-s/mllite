import React from 'react';
import { withRedux } from '../lib/redux'
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FlashMessages from '../components/FlashMessages'
import theme from '../src/theme';

const styles = {
  progress: {
    margin: theme.spacing(2),
    position: 'absolute',
    top: 'calc(50% - 40px)',
    left: 'calc(50% - 40px)',
  },
}

class MyApp extends App {
  constructor(props) {
	  super(props)
		this.state = {
		  loading: true
		}
	}

  componentDidMount() {
	  this.setState({loading: false})
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, classes } = this.props;
		const { loading } = this.state

    return (
      <React.Fragment>
      { /* TODO: <CircularProgress className={classes.progress} /> */ }
        <Head>
          <title>ML Lite</title>
        </Head>
        <ThemeProvider theme={theme}>
				  { loading &&
						<CircularProgress className={classes.progress} />
					}
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
		      <FlashMessages />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MyApp)
