import React from "react";

export class CheckBoxInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(this.props.name, e.target.checked);
  }

  render() {
    const value = this.props.value;
    const checked = this.props.checked;
    const purpose = this.props.purpose;
    return (
      <div>
        {/* <legend>{purpose}</legend> */}
        <input className = "checkbox-selected-backbground"
               id = "checkbox-input"
               value={value}
               type="checkbox"
               checked={checked}
               onClick={this.handleChange}
        />
        <label for='checkbox-input'>{purpose}</label>
      </div>
    );
  }
}
