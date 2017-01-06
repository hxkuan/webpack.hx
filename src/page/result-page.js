//import React from 'react'

import {Button} from '../components/Button'
import {CheckBox} from '../components/CheckBox'
import Tool from '../tools/Tool'

let ic_ok = require('../images/ic_ok.png');

export default class ResultPage extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      checked: false,
    };
  }

  componentWillMount() {
    if (!sessionStorage.isLogin){
      this.context.router.push({
        pathname: '/',
      })
    }else {
      document.title = '';
      Tool.loadPage();
    }

  }

  componentDidMount() {
  }

  _clickCheck() {
    this.setState({
       checked: !this.state.checked
    });
  }

  _confirm() {
    window.history.back();
  }

  render() {
    let icon = 'url(' + ic_ok + ')';
    // let qdata=this.props.location.query;
    let qdata=Tool.getPushData();
    return (
      <div className="result-contain">
        <div className="result-view">
          <div className="title" style={{backgroundImage: icon}}><span>新增商户成功</span></div>
          <p><span>登录手机:</span><span>{qdata.phoneNum}</span></p>
          <p><span>商户号:</span><span>{qdata.userCode}</span></p>
          <p><span>登录密码:</span><span>{qdata.userPwd}</span></p>
          <p><span>操作密码:</span><span>已发送商户手机</span></p>
          <div className="result-rember">
            <CheckBox ref='checkbox' onClick={()=>this._clickCheck()} checked={this.state.checked}/>
          </div>
          <div>
            <Button value="继续新增" className="result-button" disabled={!this.state.checked} disabledColor="#999999"
                    onClick={()=>this._confirm()}/>
          </div>
        </div>
      </div>
    );
  }
}

ResultPage.contextTypes = {
  router: React.PropTypes.isRequired
}

