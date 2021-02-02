import React from 'react';
import * as ReactDOM from "react-dom"
import { HorizontalBar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'


export default function HorizontalChart(props: any){ 

  if (props.data == null){
    return <div></div>
  }

  const obj = props.data

  //オブジェクトを範囲でグルーピング
  const buildJudger = (s: any) => {
    const opt = s.split("-");
    if(opt.length !== 2 || (opt[0] === "" && opt[1] === "")) return () => false;
    const [first, second] = opt.map(Number);
    if(opt[0] === "") return (a: any) => a <= second;
    if(opt[1] === "") return (a: any) => first <= a;
    return (a: any) => first <= a && a <= second;
  }

  const pivots = ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100', '100-',];
  const result = pivots.reduce((a,c)=>{
    const f = buildJudger(c);
    const sum = Object.entries(obj).reduce((a,c)=> f(Number(c[0])) ? a+Number(c[1]) : a ,0);
    return {...a,[c]:sum};
  },{});


  const chartVal: any = Object.values(result); // グラフデータ（描画するデータ）
 
  const data = {
    labels:  pivots,
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