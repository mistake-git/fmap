import React from 'react';
import * as ReactDOM from "react-dom"
import { HorizontalBar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'


export default function HorizontalChart(props: any){ 

  const data = {
    labels: [
      '1~10',
      '11~20',
      '21~30',
      '31~40',
      '41~50',
      '51~60',
      '61~70',
      '71~80',
      '81~90',
      '91~100',
      '101~',
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
      ]
    }]
  };

  const options: ChartOptions = {
    scales: {
      xAxes: [{
          stacked: true
      }],
      yAxes: [{
          stacked: true
      }]
    }
  };

  return (
    <HorizontalBar data={data} options={options} />
  );
}
ReactDOM.render(<HorizontalChart />, document.getElementById("root"))