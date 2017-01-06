//import React from 'react'
// import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import Login from './page/login'
import MainPage from './page/main-page'
import ResultPage from './page/result-page'
require('styles/App.scss');


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/mainpage" component={MainPage}/>
    <Route path="/resultpage" component={ResultPage}/>
  </Router>,
  document.getElementById('app'));



