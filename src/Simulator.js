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
    this.onClick = this.onClick.bind(this);
    this.getJanuaryOpensPrices = this.getJanuaryOpensPrices.bind(this);
    this.getStandardDeviation = this.getStandardDeviation.bind(this);
    this.getMean = this.getMean.bind(this);
    this.changeMean = this.changeMean.bind(this);
    
    this.state = {
      stock: "IBM",
      apr: 10.0,
      stdevapr: 15.243,
      years: 20,
      startingInvestment: 1000,
      annualAdd: 1000,
      annualAddGrowth: 0,
      showTable: false,
      adjustInflation: false,
      capitalGainsTax: false,
      loading: true,
      stocks: null
    };
  }

  onInputChange(inputName, value) {
    this.setState({[inputName]: value});
  }

  async componentDidMount() {
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+this.state.stock+"&apikey=L14KLEPQ80F26X4M";
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log('This is the data', data["Weekly Adjusted Time Series"]);
    this.setState({ stocks: data["Monthly Time Series"], loading: false });
    // console.log(this.state.stocks);
    // var keys = Object.keys(this.state.stocks);
    // console.log(keys) // ['alpha', 'beta'] 
    console.log(this.getJanuaryOpensPrices(this.state.stocks))
    this.changeMean(this.getJanuaryOpensPrices(this.state.stocks))
  }

  getJanuaryOpensPrices(stocks){
    let dates = [];
    dates = Object.keys(stocks);
    let jan_opens = []
    for(let i = 0; i < dates.length; i++){
      if(dates[i].split(('-'))[1] === '01' && parseInt(dates[i].split(('-'))[0]) >= 2015){
        // console.log(dates[i])
        let a_jan_open = this.state.stocks[dates[i]]['1. open']
        jan_opens.push(parseInt(a_jan_open));
      }
    }
    return jan_opens
  }

  getStandardDeviation (array) {
    const n = array.length;
    let dif = []
    for(let i = 0; i < n-1; i++){
      dif.push((array[i]-array[i+1]) * 100 / array[i+1])
    }
    const mean = dif.reduce((a, b) => a + b) / n;
    const std = Math.sqrt(dif.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    return Math.round(std * 10) / 10;
  }

  getMean (array) {
    const n = array.length;
    let dif = []
    for(let i = 0; i < n-1; i++){
      dif.push((array[i]-array[i+1]) * 100 / array[i+1])
    }
    const mean = dif.reduce((a, b) => a + b) / n;
    return  Math.round(mean * 10) / 10;
  }

  changeMean(lst){
    let new_apr = this.getMean(lst);
    let new_stdevapr = this.getStandardDeviation(lst);
    this.setState({ apr: new_apr, stdevapr: new_stdevapr});
  }



  onClick = (e) => {
    this.componentDidMount()
  }


  render() {
    console.log(this.state);

    return (
      <>
      
        <div className="topnav">
          <a class="active" href="#home">Financial Simulator</a>
          <a href="#features">Features</a>
          <a href="#questions">Questions</a>
        </div>
      
        <div className="Simulator">
            <div className="Simulator-div">
              <fieldset className="Simulator-input">

                <StockInput className = "stock"
                  value={this.state.stock}
                  purpose="Stock"
                  name="stock"
                  onInputChange={this.onInputChange} />
                <ParameterInput className = "temp"
                  value={this.state.years}
                  purpose="Total Years"
                  name="years"
                  max={1000}
                  onInputChange={this.onInputChange} />
                <ParameterInput
                  value={this.state.startingInvestment}
                  purpose="Starting Investment"
                  name="startingInvestment"
                  onInputChange={this.onInputChange} />
                <ParameterInput
                  value={this.state.annualAdd}
                  purpose="Annual Additional Investment"
                  name="annualAdd"
                  onInputChange={this.onInputChange} />
                <ParameterInput
                  value={this.state.apr}
                  purpose="Average Return On Investment Rate"
                  name="apr"
                  max={1000}
                  onInputChange={this.onInputChange} />
                <ParameterInput
                  value={this.state.stdevapr}
                  purpose="Standard Deviation of APR"
                  name="stdevapr"
                  max={100}
                  onInputChange={this.onInputChange} />
                <ParameterInput
                  value={this.state.annualAddGrowth}
                  purpose="Additional Investment Growth Rate"
                  name="annualAddGrowth"
                  max={1000}
                  onInputChange={this.onInputChange} />

                  <button onClick = {this.onClick} className='sim-button'>SUBMIT</button>

              </fieldset>
            </div>
        
            <div className="Simulator-div" id="sim-graph">

                <OutputDisplay
                  years={this.state.years}
                  apr={this.state.apr}
                  startingInvestment={this.state.startingInvestment}
                  annualAdd={this.state.annualAdd}
                  annualAddGrowth={this.state.annualAddGrowth}
                  stdevapr={this.state.stdevapr}
                  showTable={this.state.showTable}
                  adjustInflation={this.state.adjustInflation}
                  capitalGainsTax={this.state.capitalGainsTax}/>
              
              {/* {(!this.state.stocks) ? <div>Using Default</div>: 
                <OutputDisplay
                  years={this.state.years}
                  apr={this.state.apr}
                  startingInvestment={this.state.startingInvestment}
                  annualAdd={this.state.annualAdd}
                  annualAddGrowth={this.state.annualAddGrowth}
                  stdevapr={this.state.stdevapr}
                  showTable={this.state.showTable}
                  adjustInflation={this.state.adjustInflation}
                  capitalGainsTax={this.state.capitalGainsTax}/>}
              </div> */}

              </div>

            <br></br>

            <div className="Simulator-div" id="sim-checkboxes">
                <CheckBoxInput id="first-checkbox"
                  checked={this.state.showTable}
                  value="showTable"
                  purpose="Show Table"
                  name="showTable"
                  onInputChange={this.onInputChange} />
                <br></br>

                <CheckBoxInput
                  checked={this.state.adjustInflation}
                  value="adjustInflation"
                  purpose="Adjust For Inflation"
                  name="adjustInflation"
                  onInputChange={this.onInputChange} />
                <br></br>

                <CheckBoxInput
                  checked={this.state.capitalGainsTax}
                  value="capitalGainsTax"
                  purpose="Include Federal Capital Gains Tax"
                  name="capitalGainsTax"
                  onInputChange={this.onInputChange} />


                {(this.state.loading) ? <div className='loading-info'>Loading Information...</div>: <div className='loading-info'>Displaying Information for {this.state.stock}</div>}

                {(!this.state.stocks)||(this.state.stock)==="" ? <div classname="app-descp">Using Default Setting</div>: <div></div>}

                {/* <div classname="app-descp">This is a descirption of the application</div> */}

            </div>


            
            {/* <div class="bottom-nav">
              <a href="#about">About Us</a>
            </div> */}
          </div>
      </>
    );
  }
}

export default Simulator;
