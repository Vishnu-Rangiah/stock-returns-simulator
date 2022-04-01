import React from "react";


export default class App extends React.Component {
  state = {
    loading: true,
    stocks: null, 
  };

  async componentDidMount() {
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=L14KLEPQ80F26X4M";
    const response = await fetch(url);
    const data = await response.json();
    // console.log('This is the data', data["Weekly Adjusted Time Series"])
    this.setState({ stocks: data["Monthly Time Series"], loading: false });
    // console.log(this.state.stocks)
    var keys = Object.keys(this.state.stocks);
    console.log(keys) // ['alpha', 'beta'] 

  }


  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.stocks) {
      return <div>no stocks</div>;
    }

    var rows = [];
    var avg_std = 0;
    var median = 0;
    var tops = [];




    for (var key in this.state.stocks) {
      if (this.state.stocks.hasOwnProperty(key)) {
        rows.push(
          <div key = {key}>
            <h2 id = "date">Date: {key}</h2>
            <p id = "open">Open: {this.state.stocks[key]["1. open"]}</p>
            <p id = "close">Close: {this.state.stocks[key]["4. close"]}</p>
          </div>);
      }
    }

  return (
    <div className="App">{rows}</div>
    );
  }
}

// https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=L14KLEPQ80F26X4M

