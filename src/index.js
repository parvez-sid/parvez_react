import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import './index.css';
import { createBrowserHistory } from "history";
import Routes from './routes/Routes';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
    main: '#2E83F2',
  },
  },
  typography: {
    useNextVariants : true
  }
})

const hist = createBrowserHistory();

ReactDOM.render( 
  <MuiThemeProvider theme={muiTheme}>
    <Router history={hist}>
      <Routes />
    </Router>
  </MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();