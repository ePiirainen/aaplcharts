import React, { Component } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// The wrapper exports only a default component class that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props). All other
// interfaces like Options come from the Highcharts module itself.
class App extends Component<{}, {chartOptions: {}}> {

constructor(props: any) {
super(props);
this.state = {
  chartOptions: {
    title: {
      text: 'AAPL stock chart'
    },
    type: 'line',
    series: { data: [1,2,3]}
  }
};
}

  async componentDidMount() {
    this.callApi()
      .then(res =>{
        //TODO: parse data before returning it here
        console.log(JSON.parse(JSON.stringify(res)))
        this.setState({chartOptions: {series: {data: JSON.parse(JSON.stringify(res))}}})
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
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={this.state.chartOptions}
          {...this.props}
        />
      </div>
    )
  }

}

// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).
/*
const App = (props: HighchartsReact.Props) => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
    {...props}
  />
</div>
*/
// Render your App component into the #root element of the document.

export default App;