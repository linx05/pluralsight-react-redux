/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';
import {loadCourses} from "./actions/courseActions";
import {loadAuthors} from "./actions/authorActions";
import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);
