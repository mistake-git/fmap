import React from 'react';
import * as ReactDOM from "react-dom"
import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default function PieChart(props: any) {

  console.log(props.data)

  if (props.data == null){
   return <div></div>
  }

  const chartVal: any = Object.values(props.data); // グラフデータ（描画するデータ）

  const data = {
    labels: Object.keys(props.data),
    datasets: [{
      data: chartVal,
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