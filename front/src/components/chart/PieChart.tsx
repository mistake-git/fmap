import React from 'react';
import * as ReactDOM from "react-dom"
import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default function PieChart(props: any){

  const data = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };

  console.log(props.data)

  const options: ChartOptions = {
    legend: {
      position: 'bottom',
    },
    responsive: true,
  };


    
    return (
      <Pie data={data} options={options} />
    );
}

ReactDOM.render(<PieChart />, document.getElementById("root"))