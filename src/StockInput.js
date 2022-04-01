import React from "react";

export class StockInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange(e) {

    let val = e.target.value === "" ? "" : e.target.value;
    val = val.replace(/^[0-9\b]+$/,'');
    this.props.onInputChange(this.props.name, val);


    // if (this.props.type === "text") {
    //   let val = e.target.value 
    //   if (val == ""){
    //     val = "apple";
    //   } else{
    //     val = val.replace(/[A-Za-z]/ig,'');
    //     this.props.onInputChange(this.props.name, val);
    //   }
    //   if (Number.isFinite(val)) {
    //     this.props.onInputChange(this.props.name, "");
    //   }
    // } else {
    //   this.props.onInputChange(this.props.name);
    // }
    
  }


  render() {
    const value = this.props.value;
    const purpose = this.props.purpose;
    return (
      <div>
        <legend>{purpose}:</legend>
        <input className="Simulator-individual-input"
               value={value}
               type={this.props.type}
               onChange={this.handleChange}/>
      </div>
    );
  }
}

// StockInput.defaultProps = {
//   type: "text",
// }
