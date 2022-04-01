import React from "react";
import {quantile, transpose} from "d3-array";
import {scaleLog, scalePoint} from "d3-scale";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {formatNumber, runSimulation} from "./FinancialMath";

function SimpleTable(startingInvestment, years, apr, stdevapr, annualAdd, annualAddGrowth, formatter, adjustInflation, capitalGainsTax) {
  let data = runSimulation(
    startingInvestment,
    years,
    apr,
    stdevapr,
    annualAdd,
    annualAddGrowth,
    adjustInflation,
    capitalGainsTax);

  return (
    <table className="Simulator-table">
      <thead>
      <tr>
        <th>Year</th>
        <th>Principal</th>
        <th>Money</th>
        <th>Interest</th>
      </tr>
      </thead>
      <tbody>
      {data.map((row) =>
        <tr key={row.year}>
          <td>{row.year}</td>
          <td>{formatter.format(formatNumber(row.principal))}</td>
          <td>{formatter.format(formatNumber(row.money))}</td>
          <td>{formatter.format(formatNumber(row.interest))}</td>
        </tr>
      )}
      </tbody>
    </table>
  );
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export class OutputDisplay extends React.Component {
  render() {
    let data_array = [];
    for (let i = 0; i < 3000; i++) {
      data_array[i] = runSimulation(
        this.props.startingInvestment,
        this.props.years,
        this.props.apr,
        this.props.stdevapr,
        this.props.annualAdd,
        this.props.annualAddGrowth,
        this.props.adjustInflation,
        this.props.capitalGainsTax,
      );
    }

    let data_transposed = transpose(data_array);


    let stats = [];
    for (let i = 0; i <= this.props.years; i++) {
      stats[i] = {
        year: i,
        fifth: formatNumber(quantile(data_transposed[i], 0.05, d => d.money)),
        twenty_fifth: formatNumber(quantile(data_transposed[i], 0.25, d => d.money)),
        median: formatNumber(quantile(data_transposed[i], 0.5, d => d.money)),
        seventy_fifth: formatNumber(quantile(data_transposed[i], 0.75, d => d.money)),
        ninety_fifth: formatNumber(quantile(data_transposed[i], 0.95, d => d.money)),
        principal: formatNumber(quantile(data_transposed[i], 0.5, d => d.principal)),
      }
    }

    const scale = scaleLog().base(10).nice();
    const scale2 = scalePoint();

    if (this.props.showTable && this.props.stdevapr === 0) {
      let startingInvestment = this.props.startingInvestment;
      let years = this.props.years;
      let apr = this.props.apr;
      let stdevapr = this.props.stdevapr;
      let annualAdd = this.props.annualAdd;
      let annualAddGrowth = this.props.annualAddGrowth;
      let adjustInflation = this.props.adjustInflation;

      return SimpleTable(startingInvestment, years, apr, stdevapr, annualAdd, annualAddGrowth, formatter, adjustInflation);
    } else if (!this.props.showTable) {
      return (
        <LineChart className="Simulator-table"
                   width={700}
                   height={500}
                   data={stats}
                   margin={{top: 5, right: 20, left: 10, bottom: 5}}
        >
          <XAxis scale={scale2} domain={["auto", "auto"]} dataKey="year"/>
          <Tooltip/>
          <CartesianGrid/>
          <YAxis scale={scale} domain={["auto", "auto"]}/>
          <Legend/>
          <Line type="linear" dataKey="ninety_fifth" stroke="gray" yAxisId={0}/>
          <Line type="linear" dataKey="seventy_fifth" stroke="purple" yAxisId={0}/>
          <Line type="linear" dataKey="median" stroke="blue" yAxisId={0}/>
          <Line type="linear" dataKey="twenty_fifth" stroke="green" yAxisId={0}/>
          <Line type="linear" dataKey="fifth" stroke="red" yAxisId={0}/>
          <Line type="linear" dataKey="principal" stroke="black" yAxisId={0}/>

        </LineChart>
      );
    }


    return (
      <table className="Simulator-table">
        <thead>
        <tr>
          <th>Year</th>
          <th>Principal</th>
          <th>5th Percentile</th>
          <th>25th Percentile</th>
          <th>Median</th>
          <th>75th Percentile</th>
          <th>95th Percentile</th>
        </tr>
        </thead>
        <tbody>
        {stats.map((row) =>
          <tr key={row.year}>
            <td>{row.year}</td>
            <td>{formatter.format(stats[row.year].principal)}</td>
            <td>{formatter.format(stats[row.year].fifth)}</td>
            <td>{formatter.format(stats[row.year].twenty_fifth)}</td>
            <td>{formatter.format(stats[row.year].median)}</td>
            <td>{formatter.format(stats[row.year].seventy_fifth)}</td>
            <td>{formatter.format(stats[row.year].ninety_fifth)}</td>
          </tr>
        )}
        </tbody>
      </table>
    );

  }
}
