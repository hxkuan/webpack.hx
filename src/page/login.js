//import React from 'react'

import {LoginInput} from '../components/Input'
import {Button} from '../components/Button'
import Tool from '../tools/Tool'
import Require from '../tools/Require'

let name = require('../images/ic_name.png');
let pwd = require('../images/ic_pwd.png');
let bg = require('../images/ic_bg.png');

export default class Login extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      nameCue: '',
      pwdCue: '',
      disabled: true,
    }
  }

  componentWillMount() {
    document.title = '';
    /*  var $body = $('body');
     var $iframe = $('<iframe src="/favicon.ico"></iframe>');
     $iframe.on('load',function() {
     setTimeout(function() {
     $iframe.off('load').remove();
     }, 0);
     }).appendTo($body);*/
    Tool.loadPage();
  }


  componentDidMount() {
  }

  _confirm() {
    console.log('_confirm-------');

    let name = this.refs.name.getValue();
    let pwd = this.refs.pwd.getValue();
    if (name == "") {
      this.setState({nameCue: '账号不能为空'});
      return;
    }
    if (pwd == "") {
      this.setState({pwdCue: '密码不能为空'});
      return;
    }

    this.refs.name.blur();
    this.refs.pwd.blur();
    let context = this;

    setTimeout(function () {//为了适配ios键盘而导致加载框未垂直居中问题
      // Tool.loading('请稍后');
      // Tool.hideLoading(()=>context.context.router.push('/mainpage'), '登录成功..')
      Require.login(
        {userCode: name, userPwd: pwd},
        {
          context:context,
          successFunc: (data)=> {
            if (data) {
              if (data.result.success) {
                sessionStorage.isLogin=true;
                sessionStorage.userName = data.data && data.data.userName;
                sessionStorage.userId = data.data && data.data.userId;
                Tool.hideLoading(()=>context.context.router.push({
                  pathname: '/mainpage',
                }), '登录成功..');
              } else {
                Tool.hideLoading();
                Tool.toastShow(data.result.errorMsg);
              }
            } else {
              Tool.hideLoading();
            }

          }
        }
      );

    }, 400);

  }

  _checkName() {
    let name = this.refs.name.getValue();
    if (name == "") {
      // this.refs.nameCue.innerText='账号不能为空'
      this.setState({nameCue: '账号不能为空'});
    } else {
      this.setState({nameCue: ''});
    }
  }

  _checkPwd() {
    let pwd = this.refs.pwd.getValue();
    if (pwd == "") {
      // this.refs.nameCue.innerText='账号不能为空'
      this.setState({pwdCue: '密码不能为空'});
    } else {
      this.setState({pwdCue: ''});
    }
  }

  _change(e, type) {
    let other = '';
    if (e.target.value != '') {
      if ('pwd' == type) {
        other = this.refs.name.getValue();
      } else {
        other = this.refs.pwd.getValue();
        this.setState({nameCue: ''});
      }
      if (other) {
        this.setState({disabled: false});
        return;
      }
    }

    this.setState({disabled: true});
    // console.log('e', e.target.value, e.target.name);
    // console.log('type', type);

  }

  render() {
    let icon = 'url(' + bg + ')';
    return (
      <div className="login-contain" style={{backgroundImage: icon}}>
        <input style={{display: 'none'}}/>
        <div className="login-view">
          <div className="login-view-title"> 商户录入系统</div>
          <LoginInput ref="name" hint="请输入账号" icon={name} onBlur={()=>this._checkName()}
                      onChange={(e)=>this._change(e, 'name')}/>
          <p className="cue"><span ref="nameCue">{this.state.nameCue}</span></p>
          <LoginInput ref="pwd" hint="请输入密码" icon={pwd} type="password" onChange={(e)=>this._change(e, 'pwd')}
                      onBlur={()=>this._checkPwd()}/>
          <p className="cue"><span ref="pwdCue">{this.state.pwdCue}</span></p>
          <Button className="login-button" value="登录"
                  onClick={()=>this._confirm()} disabled={this.state.disabled} disabledColor="#D9D9D9"/>
        </div>
      </div>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.isRequired
}
