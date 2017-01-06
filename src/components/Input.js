//import React from 'react';
export  class LoginInput extends React.Component {
   getValue(){
    console.log( this.refs.input.value);
    return this.refs.input.value
  }
  focus(){
    console.log( '--focus--');
    this.refs.input.focus();
  }
  blur(){
    console.log( '--blur--');
    this.refs.input.blur();
  }
  render() {
    let icon='url('+this.props.icon+')';
    return (
      <div className="login-input-view" style={{backgroundImage:icon}}>
        <input ref='input' type={this.props.type} placeholder={this.props.hint} name="username" onFocus={this.props.onFocus} onBlur={this.props.onBlur} onChange={this.props.onChange}/>
      </div>
    );
  }
}

LoginInput.defaultProps = {
  type:'text',
  onBlur:()=>console.log('-----onBlur')
};
