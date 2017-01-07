//import React from 'react';
export  class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let style=this.props.style;
    let disabled=this.props.disabled;
    let onclickFunc=this.props.onClick;
    let backgroundColor = disabled ? this.props.disabledColor : '';
    return (
      <button className={this.props.className}
              onClick={e => (!disabled) && onclickFunc && onclickFunc()}
              style={{border: 'none',backgroundColor,...style}}
              title="button">
        {this.props.value}
      </button>
    );
  }
}

Button.defaultProps = {
  className:'main-button',
  disabled:false,
  onClick:()=>console.log('button->click'),
  disabledColor:'#D9D9D9'
};

/*
class Button2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {state: 'link'};
    this.color = {
      'strong': {link: '#07aab2', hover: '#51c3c9', active: '#04767c'},
      'blank': {link: '#ffffff', hover: '#f1f1f1', active: '#bbbbbb'},
      'weak': {link: '#ffffff', hover: '#f1f1f1', active: '#f1f1f1'}
    }[props.type || 'strong'];
  }

  render() {
    let {type, style, onPress, disabled, children, ...others} = this.props;
    type = disabled ? 'disabled' : (type || 'strong');
    let backgroundColor = disabled ? '#fff' : this.color[this.state.state];
    let color = {'disabled': '#999', 'strong': '#fff', 'blank': '#333', 'weak': '#07aab2'}[type];
    let border = {
      'disabled': '1px solid #ccc',
      'strong': 0,
      'blank': '1px solid #ddd',
      'weak': '1px solid #ddd'
    }[type];
    return (
      <button style={{
        height: 36, width: 110, borderRadius: 2, outline: 'none', cursor: 'pointer',
        fontSize: 14, backgroundColor, color, border,
        ...style
      }}
              onMouseEnter={e => this.setState({state: 'hover'})}
              onMouseDown={e => this.setState({state: 'active'})}
              onMouseUp={e => this.setState({state: 'hover'})}
              onMouseLeave={e => this.setState({state: 'link'})}
              onClick={e => !disabled && onPress && onPress()}
              {...others}>
        {children}
      </button>
    );
  }
}
*/
