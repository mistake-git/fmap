import React from 'react';
import * as ReactDOM from "react-dom"
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default function LineChart(props: any){ 

  if (props.data == null){
    return <div></div>
  }

  const obj = props.data
  const numbers: number[] = Array.from(new Array(24)).map((v,i)=> i + 1)
  const times = numbers.map(x => x + "時")
  const defaults =
  {
    1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0,
    13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0
  }
  const result={...defaults,...obj}
  const chartVal: any = Object.values(result);

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