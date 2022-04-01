import React from "react";

export class ParameterInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(e) {
    if (this.props.type === "text") {
      let number = e.target.value === "" ? 0 : Number.parseFloat(e.target.value);

      if (Number.isFinite(number)) {
        if (!this.props.max || (number < this.props.max)) {
          this.props.onInputChange(this.props.name, number);
        }
      }
    } else {
      this.props.onInputChange(this.props.name);
    }
  }

  render() {
    const value = this.props.value;
    const purpose = this.props.purpose;
    return (
      <div>
        <legend>{purpose}</legend>
        <input className="Simulator-individual-input"
               value={value}
               type={this.props.type}
               onChange={this.handleChange}
        />
      </div>
    );
  }
}

ParameterInput.defaultProps = {
  type: "text",
}
