import React, { Component } from 'react';
import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

class App extends Component<{}, {chartOptions: {}}> {

constructor(props: any) {
super(props);
this.state = {
  chartOptions: {
  }
};
}


  async componentDidMount() {
    this.callApi()
      .then(res =>{
        let data = [];
        // Parse through JSON data, put the data into one array as objects
        for(const object of Object.entries(res['Time Series (Daily)'])) {
          let date = new Date(object[0]).getTime();
          let values = new Object(object[1]);
          let objectMap = new Map(Object.entries(values));
          // String into int
          let open = +objectMap.get('1. open')
          let high = +objectMap.get('2. high')
          let low = +objectMap.get('3. low')
          let close = +objectMap.get('4. close')
          let volume = +objectMap.get('5. volume')
          data.push({date, open, high, low, close, volume})
        }
        // Sort data so highcharts can read it
        const sortedData = data.sort((a,b) => a.date - b.date)
        // Parse data for highcharts
        var ohlc = [],
        volume = [],
        dataLength = data.length,
        groupingUnits = [
          [
            "week", // unit name
            [1] // allowed multiples
          ],
          ["month", [1, 2, 3, 4, 6]]
        ],
        i = 0;
      
      for (i; i < dataLength; i += 1) {
        ohlc.push([
          data[i].date, // the date
          data[i].open, // open
          data[i].high, // high
          data[i].low, // low
          data[i].close // close
        ]);
      
        volume.push([
          data[i].date, // the date
          data[i].volume // the volume
        ]);
      }
      // Set options, TODO: Figure out why volume chart is over the other stuff
      const options = {

        title: {
          text: "AAPL Historical"
        },
      
        yAxis: [
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "OHLC"
            },
            height: "60%",
            lineWidth: 2,
            resize: {
              enabled: true
            }
          },
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "Volume"
            },
            top: "65%",
            height: "50%",
            offset: 0,
            lineWidth: 2
          }
        ],
      
        tooltip: {
          split: true
        },
      
        series: [
          {
            type: "candlestick",
            name: "AAPL",
            data: ohlc,
            dataGrouping: {
              units: groupingUnits
            }
          },
          {
            type: "column",
            name: "Volume",
            data: volume,
            yAxis: 1,
            dataGrouping: {
              units: groupingUnits
            }
          }
        ]
      };
        this.setState({chartOptions: options})
      })
      .catch(err => console.log(err));
  };

  async callApi() {
    console.log("Calling api");
    const response = await fetch('/aapl');
    console.log("got response i think");
    const body = await response.json(); if (response.status !== 200) throw Error(body.message); return body;
  };

  render() {
    return (
      <div id='container'>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={this.state.chartOptions}
          {...this.props}
        />
      </div>
    )
  }

}

export default App;