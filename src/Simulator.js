import './Simulator.css';
import React from "react";
import {ParameterInput} from "./ParameterInput";
import {StockInput} from "./StockInput";
import {CheckBoxInput} from "./CheckBoxInput";
import {OutputDisplay} from "./OutputDisplay";
 

class Simulator extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      stock: "apple",
      apr: 10.0,
      years: 20,
      startingInvestment: 1000,
      annualAdd: 1000,
      stdevapr: 15,
      annualAddGrowth: 0,
      showTable: false,
      adjustInflation: false,
      capitalGainsTax: false,
    };

    
    

  }

  onInputChange(inputName, value) {
    this.setState({[inputName]: value});
  }


  

  render() {
    console.log(this.state);
    return (
      <div className="Simulator">
        <div className="Simulator-div">
          <fieldset className="Simulator-input">

            <StockInput
              value={this.state.stock}
              purpose="Stock"
              name="stock"
              max={1000}
              onInputChange={this.onInputChange}
            />

            <ParameterInput
              value={this.state.years}
              purpose="Years"
              name="years"
              max={1000}
              onInputChange={this.onInputChange}
            />
            <ParameterInput
              value={this.state.apr}
              purpose="Average Return on Investment"
              name="apr"
              max={1000}
              onInputChange={this.onInputChange}
            />
            <ParameterInput
              value={this.state.stdevapr}
              purpose="APR Standard Deviation"
              name="stdevapr"
              max={100}
              onInputChange={this.onInputChange}
            />
            <ParameterInput
              value={this.state.startingInvestment}
              purpose="Starting Investment"
              name="startingInvestment"
              onInputChange={this.onInputChange}
            />
            <ParameterInput
              value={this.state.annualAdd}
              purpose="Annual Additional investment"
              name="annualAdd"
              onInputChange={this.onInputChange}
            />
            <ParameterInput
              value={this.state.annualAddGrowth}
              purpose="Additional investment Growth Rate"
              name="annualAddGrowth"
              max={1000}
              onInputChange={this.onInputChange}
            />
            <CheckBoxInput
              checked={this.state.showTable}
              value="showTable"
              purpose="Show Table"
              name="showTable"
              onInputChange={this.onInputChange}
            />
            <CheckBoxInput
              checked={this.state.adjustInflation}
              value="adjustInflation"
              purpose="Adjust For Inflation"
              name="adjustInflation"
              onInputChange={this.onInputChange}
            />
            <CheckBoxInput
              checked={this.state.capitalGainsTax}
              value="capitalGainsTax"
              purpose="Include Federal Capital Gains Tax"
              name="capitalGainsTax"
              onInputChange={this.onInputChange}
            />

            <button type="button">Submit</button> 

          </fieldset>
        </div>

        <div className="Simulator-div">

          <OutputDisplay
            stock = {this.state.stock}
            years={this.state.years}
            apr={this.state.apr}
            startingInvestment={this.state.startingInvestment}
            annualAdd={this.state.annualAdd}
            annualAddGrowth={this.state.annualAddGrowth}
            stdevapr={this.state.stdevapr}
            showTable={this.state.showTable}
            adjustInflation={this.state.adjustInflation}
            capitalGainsTax={this.state.capitalGainsTax}
          />
          
        </div>
      </div>
    );
  }
}

export default Simulator;
