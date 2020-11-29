import React from 'react';
import * as ReactDOM from "react-dom"
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default function BarChart(props: any) {

  if (props.data == null){
    return <div></div>
   } 

  const chartVal: any = Object.values(props.data); // グラフデータ（描画するデータ）

  const numbers: number[] = Array.from(new Array(12)).map((v,i)=> i + 1)

  const month = numbers.map(x => x + "月")


  //1から12までの数字を出力
  //1から12をdataのkeyと比べて一致すればdataのvalueを返して一致しなければ0を返す
  //これを12回行う

  const obj = props.data

  console.log(obj)

  const result: any = numbers.map(((number: any) => {
    var index = 0
    for (let i = 0; Object.keys(obj).length; i++ ){
      if (number.toString() == Object.keys(obj)[index]){
        return Object.values(props.data)[index]
      } else {
        return 0
      }
    }
    index++
  }))

  console.log(result)


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