import React from 'react';
import * as ReactDOM from "react-dom"
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default class BarChart extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    const data = {
      labels: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      datasets: [{
        data: [120, 100, 100, 103, 102, 109, 120, 100, 100, 111, 129],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
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
      <Bar data={data} options={options} />
    );
  }
}

ReactDOM.render(<BarChart />, document.getElementById("root"))