import React from 'react';
import * as ReactDOM from "react-dom"
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default class LineChart extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    const data = {
      labels: [
        '0時',
        '1時',
        '2時',
        '3時',
        '4時',
        '5時',
        '6時',
        '7時',
        '8時',
        '9時',
        '10時',
        '11時',
        '12時',
        '13時',
        '14時',
        '15時',
        '16時',
        '17時',
        '18時',
        '19時',
        '20時',
        '21時',
        '22時',
        '23時',
      ],
      datasets: [{
        data: [10, 11, 21, 11, 22, 13, 13, 14, 15, 16, 17, 18, 19, 20, 21, 11, 28, 18, 21, 10, 15, 12, 20, 10],
        backgroundColor: [
          '#36A2EB',
        ],
      }]
    };

    let options: ChartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return (
      <Line data={data} options={options} />
    );
  }
}

ReactDOM.render(<LineChart />, document.getElementById("root"))