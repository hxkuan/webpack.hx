//import React from 'react'
import {createRouterHistory} from 'react-router'

import {List, ListInput} from '../components/Lists'
import {Button} from '../components/Button'
import Tool from '../tools/Tool'
import Require from '../tools/Require'


export default class MainPage extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      phoneNum: '',
      tenant: '',
      industry: '',
      industryIds: [],
      tenantAddress: '',
      tenantAddressIds: [],
      manager: '',
      managerId: '',

    };
  }

  componentWillMount() {
    if (!sessionStorage.isLogin) {
      this.context.router.push({
        pathname: '/',
      });
    } else if (sessionStorage.userName && sessionStorage.userId) {
      document.title = '新增商户';
      Tool.loadPage();
    } else {
      window.history.back();
    }
  }

  componentDidMount() {
    console.log('Login ->componentDidMount' + root_data.userName);
    console.log('Login ->componentDidMount' + root_data.userId);
    this.setState({
      manager: sessionStorage.userName,
      managerId: sessionStorage.userId,
    });
    this._initPicker(mui);

  }

  _initPicker($) {
    $.init();
    var context = this;
    $.ready(function () {

      var cityPicker = new $.PopPicker({
        layer: 3
      });
      cityPicker.setData(heyean_address);
      context.setState({
        addrFunc: (event)=> {
          cityPicker.show(function (items) {
            let texts = _((items[0] || {}).text, " ") + _((items[1] || {}).text, " ") + _((items[2] || {}).text, ' ');
            let values = _((items[0] || {}).value, ",") + _((items[1] || {}).value, ",") + _((items[2] || {}).value, ',');
            context.setState({
              tenantAddress: texts.substr(0, texts.length - 1),
              tenantAddressIds: [(items[0] || {}).value, (items[1] || {}).value, (items[2] || {}).value],
            });
          });
        }
      });


      var industry = new $.PopPicker({
        layer: 3
      });
      industry.setData(heyean_industry);
      context.setState({
        industryFunc: (event) =>
          industry.show(function (items) {
              let texts = _((items[0] || {}).text, " ") + _((items[1] || {}).text, " ") + _((items[2] || {}).text, ' ');
              let values = _((items[0] || {}).value, ",") + _((items[1] || {}).value, ",") + _((items[2] || {}).value, ',');
              context.setState({
                industry: texts.substr(0, texts.length - 1),
                industryIds: [(items[0] || {}).value, (items[1] || {}).value, (items[2] || {}).value],
              });
            })
      });

      function _(value, dot) {
        return value ? (value + dot) : '';
      }
    });
  }

  _listInputChange(e, type) {
    switch (type) {
      case 'phone':
        this.setState({phoneNum: e});
        break;
      case 'name':
        this.setState({tenant: e});
        break;
    }
  }

  _getAllMes() {
    return this.state.phoneNum && this.state.tenant && this.state.industry && this.state.tenantAddress && this.state.manager;
  }

  _confirm() {
    let reg = /^1[0-9][0-9]\d{8}$/;
    let dus = 2000;
    if (!reg.test(this.state.phoneNum)) {
      Tool.toastShow('手机格式不对，请重新输入', dus);

      let context = this;

      setTimeout(function () {
        context.refs.phone.focus();
        context.refs.phone.clean();
        context._listInputChange('', 'phone')//当使用clean方法改变input值时不触发onChange事件，所以需手动改变
      }, dus);
      return;
    }

    //alert(this.state.phoneNum+'|'+ this.state.tenant+'|'+ this.state.industry+'|'+ this.state.tenantAddress+'|'+ this.state.manager+'|'+this.state.cue);

    let context = this;

    let parm = {
        merchantPhone: this.state.phoneNum,
        merchantName: this.state.tenant,
        oneTrade: this.state.industryIds[0],
        twoTrade: this.state.industryIds[1],
        threeTrade: this.state.industryIds[2],
        trade: this.state.industry,
        province: this.state.tenantAddressIds[0],
        city: this.state.tenantAddressIds[1],
        area: this.state.tenantAddressIds[2],
        provCityArea: this.state.tenantAddress,
        salesmanId: this.state.managerId
      }
      ;
    Require.createMerchant(parm,
      {
        successFunc: (data)=> {
          if (data) {
            if (data.result.success) {
              data.data.phoneNum = this.state.phoneNum;
              Tool.setPushData(data.data);
              Tool.hideLoading(()=>context.context.router.push({
                pathname: '/resultpage',
                // query: data.data
              }));
            } else {
              Tool.hideLoading();
              Tool.toastShow(data.result.errorMsg);
            }
          } else {
            Tool.hideLoading();
          }
        }
      }
      ,
    );
  }


  render() {
    return (
      <div>
        <div className="list-part">
          <ListInput ref="phone" title="手机号" hint="作为登录账户使用" type='tel'
                     onChange={(e)=>this._listInputChange(e.target.value, 'phone')}/>
          <ListInput title="商户名称" hint="显示于交易小票" onChange={(e)=>this._listInputChange(e.target.value, 'name')}/>
        </div>
        <div className="list-part">
          <List title="所属行业" value={this.state.industry} ref="ind" onClick={this.state.industryFunc}/>
          <List title="商户地址" value={this.state.tenantAddress} ref="addr" onClick={this.state.addrFunc}/>
        </div>
        <div className="list-part">
          <List title="业务经理" value={this.state.manager} icon="none"/>
        </div>
        <div className="main-button-view">
          <Button value="确定" disabled={!(this._getAllMes())} onClick={()=>this._confirm()}/>
        </div>

      </div>);
  }
}

MainPage.contextTypes = {
  router: React.PropTypes.isRequired
}
