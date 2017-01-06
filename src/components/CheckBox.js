//import React from 'react';
require('styles/checkbox.scss');
export class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
    };
  }

  getChecked(){
    return this.state.checked;
  }
  _onClick(){
    this.setState({
      checked:!this.state.checked
    });
    this.props.onClick();
  }

  render() {

    return (
      <div className="checkbox-container" onClick={()=>this._onClick()}>
        <input type="checkbox" name="channel"  id="checkboxChannel001" checked={this.state.checked} />
        <label htmlFor="checkboxChannel001" >我已经记住初始密码</label>
      </div>
    );
  }
}

CheckBox.defaultProps = {
};

