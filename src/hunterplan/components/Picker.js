//import React from 'react'
export default class Picker extends React.Component {
  defaultProps = {
  };

  componentDidMount(){
    /*   console.log(this.refs);
    (function($, doc,refs) {
      $.init();
      $.ready(function() {
        //普通示例
        var userPicker = new $.PopPicker();
        userPicker.setData([{
          value: 'ywj',
          text: '董事长 叶文洁'
        }, {
          value: 'aaa',
          text: '总经理 艾AA'
        }, {
          value: 'lj',
          text: '罗辑'
        }, {
          value: 'ymt',
          text: '云天明'
        }, {
          value: 'shq',
          text: '史强'
        }, {
          value: 'zhbh',
          text: '章北海'
        }, {
          value: 'zhy',
          text: '庄颜'
        }, {
          value: 'gyf',
          text: '关一帆'
        }, {
          value: 'zhz',
          text: '智子'
        }, {
          value: 'gezh',
          text: '歌者'
        }]);
        console.log('2',refs);
        var showUserPickerButton = refs.showUserPicker;
        var userResult = refs.userResult;
        showUserPickerButton.addEventListener('tap', function(event) {
          userPicker.show(function(items) {
            userResult.innerText = JSON.stringify(items[0]);
            //返回 false 可以阻止选择框的关闭
            //return false;
          });
        }, false);
      });
    })(mui,document,this.refs);*/

    this._initPicker(mui,document,this.refs);
  }

  _initPicker($, doc,refs){
    $.init();
    $.ready(function() {
      //普通示例
      var userPicker = new $.PopPicker();
      userPicker.setData([{
        value: 'ywj',
        text: '董事长 叶文洁'
      }, {
        value: 'aaa',
        text: '总经理 艾AA'
      }, {
        value: 'lj',
        text: '罗辑'
      }, {
        value: 'ymt',
        text: '云天明'
      }, {
        value: 'shq',
        text: '史强'
      }, {
        value: 'zhbh',
        text: '章北海'
      }, {
        value: 'zhy',
        text: '庄颜'
      }, {
        value: 'gyf',
        text: '关一帆'
      }, {
        value: 'zhz',
        text: '智子'
      }, {
        value: 'gezh',
        text: '歌者'
      }]);
      console.log('2',refs);
      var showUserPickerButton = refs.showUserPicker;
      var userResult = refs.userResult;
/*      showUserPickerButton.addEventListener('tap', function(event) {
        userPicker.show(function(items) {
          userResult.innerText = JSON.stringify(items[0]);
          //返回 false 可以阻止选择框的关闭
          //return false;
        });
      }, false);*/
      showUserPickerButton.onclick=function(event) {
        userPicker.show(function(items) {
          userResult.innerText = JSON.stringify(items[0]);
          //返回 false 可以阻止选择框的关闭
          //return false;
        });
      };
    });
  }

  render() {
    return (
      <div>
        <button  className="mui-btn mui-btn-block" type='button' ref="showUserPicker">一级选择示例 ...</button>
        <div  className="ui-alert" ref='userResult'></div>
      </div>
    );
  }
}