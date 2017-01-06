//import React from 'react'
// require('styles/App.scss');

let list_down=require('../images/list_down.png');
let list_right=require('../images/list_right.png');
export  class List extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  componentDidMount(){
  }

  getValue(){
    return this.props.value;
  }
  render() {
    let img={backgroundImage:'url('+list_right+')'};
    if (this.props.icon=='down')img={backgroundImage:'url('+list_down+')'};
    if (this.props.icon=='none')img={};
    let value=this.props.value?this.props.value:this.props.hint
    let cueName=this.props.value?'cue-has':'cue-hint';
    return (
      <div className="list-view" onClick={this.props.onClick}>
        <div className="list-item"  style={img}>
          <span>{this.props.title}</span>

          <div>
            <span className={cueName}>{value}</span>
          </div>
        </div>
        <div className="list-line"/>
      </div>
    );
  }
}
List.defaultProps = {
  title:'栏目名称 ',
  hint:'请选择',
  icon:'right'
};

export  class ListInput extends React.Component {

  constructor (props, context) {
    super(props, context)
  }

  componentDidMount(){
  }

  getValue(){
    console.log( this.refs.input.value);
    return this.refs.input.value
  }

  focus(){
    console.log( '--focus--');
    this.refs.input.focus();
  }

  clean(){
    this.refs.input.value='';
  }

  render() {
    return (
      <div className="list-view">
        <div className="list-item" >
          <span>{this.props.title}</span>
          <div>
            <input ref="input" type={this.props.type} placeholder={this.props.hint} name="username"
                 onFocus={this.props.onFocus} onBlur={this.props.onBlur} onChange={this.props.onChange} />
          </div>
        </div>
        <div className="list-line"/>
      </div>
    );
  }
}
ListInput.defaultProps = {
  title:'栏目名称 ',
  hint:'请输入..',
  type:'text'
};

