import React from 'react';
import * as ReactDOM from "react-dom"
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default function LineChart(props: any){ 

  if (props.data == null){
    return <div></div>
  }

  const chartVal: any = Object.values(props.data); // グラフデータ（描画するデータ）

  const times = Object.keys(props.data).map(x => x + "時")

  const data = {
    labels: times,
    datasets: [{
      data: chartVal,
      backgroundColor: [
        '#36A2EB',
      ],
    }]
  };

  const options: ChartOptions = {
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

ReactDOM.render(<LineChart />, document.getElementById("root"))