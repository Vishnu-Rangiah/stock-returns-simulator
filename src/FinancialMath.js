import {randomNormal} from "d3-random";

export function runSimulation(startingInvestment, years, apr, stdevapr, annualAdd, annualAddGrowth, adjustInflation, capitalGainsTax) {
  let data = [];
  data[0] = {
    year: 0,
    money: startingInvestment,
    interest: 0,
    principal: startingInvestment,
  }

  for (let i = 1; i <= years; i++) {
    let old_money = data[i - 1].money;
    let interest_this_year = randomNormal(apr, stdevapr)();
    if (apr >= -100) {
      while (interest_this_year <= -100) {
        interest_this_year = randomNormal(apr, stdevapr)();
      }
    }

    let interest = old_money * interest_this_year / 100;

    if (capitalGainsTax) {
      if (interest < 450000) { // Not exactly right but close enough
        interest *= .85; // 15% capital gains tax
      } else {
        let lesser = 450000 * .85;
        let greater = (interest - 450000) * 0.80;
        interest = lesser + greater;
      }
    }

    let money_added = annualAdd * Math.pow(1 + (annualAddGrowth / 100), i - 1);
    let new_money = old_money + interest + money_added;
    let principal = data[i - 1].principal + money_added;

    if (adjustInflation) {
      new_money *= .975; //Assumes constant 2.5% inflation rate (this is not exactly true)
      principal *= .975;
    }

    data[i] = {
      year: i,
      money: new_money,
      interest: interest,
      principal: principal,
    };
  }

  return data;
}

export function formatNumber(num) {
  return Number.parseFloat(Number.parseFloat(Number.parseFloat(num).toPrecision(3)).toFixed());
}
