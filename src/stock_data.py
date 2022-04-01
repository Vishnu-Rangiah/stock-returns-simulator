import requests 
import pandas as pd
from datetime import datetime
import numpy as np
import sys

def split_years(dt):
    dt['year'] = dt['Date'].dt.year
    return [dt[dt['year'] == y] for y in dt['year'].unique()]

def yearly_return(first, last):
    first =  float(first)
    last = float(last)
    return (last - first ) / first*100

def main(symbol):
    
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+symbol+"&apikey=L14KLEPQ80F26X4M"
    response = requests.get(url)
    output = response.json()
    stock_dates_dict = output["Monthly Time Series"]
    
    all_dates = [i for i in stock_dates_dict.keys()] 
    all_dates = pd.DataFrame(all_dates)
    all_dates.columns = ["Date"]
    all_dates.Date = pd.to_datetime(all_dates.Date)
    
    mins = []
    maxs = []
    
    for i in split_years(all_dates): #each element in list of dates per year
        mins.append(min(i.Date))
        maxs.append(max(i.Date))
            
    maxs = list(map(lambda x: x.strftime("%Y-%m-%d"), maxs))
    mins = list(map(lambda x: x.strftime("%Y-%m-%d"), mins))
    if len(maxs)!=len(mins):
        print("Different")
    
    yroi = []
    
    for i in range(len(maxs)):

        yroi.append(yearly_return(stock_dates_dict[mins[i]]["1. open"],
                                  stock_dates_dict[maxs[i]]["4. close"]))
    
    yroi = yroi[:7]
    
    med_value = np.median(yroi)
    std_value = np.std(yroi)
    
    stock_info = {
        "median": med_value,
        "std": std_value
    }
    
    print(json.dumps(stock_info))
    
    
    
if __name__ == '__main__':
    symbol = str(sys.argv[1])
    main(symbol)