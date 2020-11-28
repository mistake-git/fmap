import React from 'react';
import * as ReactDOM from "react-dom"
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default function BarChart(props: any) {

  if (props.data == null){
    return <div></div>
   } 

  const chartVal: any = Object.values(props.data); // グラフデータ（描画するデータ）

  // const  numbers = Array.from(new Array(12)).map((v,i)=> i + 1)
  // const month = numbers.map(x => x.toString() + "月")

  const month = Object.keys(props.data).map(x => x + "月")

  const data = {
    labels: month,
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


ReactDOM.render(<BarChart />, document.getElementById("root"))