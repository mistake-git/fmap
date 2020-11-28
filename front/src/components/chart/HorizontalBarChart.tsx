import React from 'react';
import * as ReactDOM from "react-dom"
import { HorizontalBar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'


export default function HorizontalChart(props: any){ 

  const chartVal: any = Object.values(props.data); // グラフデータ（描画するデータ）

  if (props.data == null){
    return <div></div>
  }
 

  const data = {
    labels:  Object.keys(props.data),
    datasets: [{
      data: chartVal,
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