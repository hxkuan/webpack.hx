import Frame from './component/help-frame'
import {Router, Route, hashHistory} from 'react-router'
require('./styles/app.css');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/:id" component={Frame}/>
    <Route path="/" component={Frame}/>
  </Router>,
  document.getElementById('app'));




