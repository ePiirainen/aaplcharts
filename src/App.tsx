import './App.css';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import jsonData from './aapl-c.json'

const options = {
  title: {
    text: 'Apple stock course'
}, 
series: [{
  data: JSON.parse(JSON.stringify(jsonData))
}]
};

function App() {
  return (
    <div>
      <HighchartsReact
      highcharts={Highcharts}
      options={options}
      />
    </div>
  )
}

export default App;
