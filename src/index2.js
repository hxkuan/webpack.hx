//import React from 'react'
// import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import Login from './hunterplan/page/login'
import MainPage from './hunterplan/page/main-page'
import ResultPage from './hunterplan/page/result-page'
require('styles/App.scss');


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/mainpage" component={MainPage}/>
    <Route path="/resultpage" component={ResultPage}/>
  </Router>,
  document.getElementById('app'));




