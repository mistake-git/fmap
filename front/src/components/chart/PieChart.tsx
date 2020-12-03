import React from 'react';
import * as ReactDOM from "react-dom"
import { Pie } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'

export default function PieChart(props: any) {

  if (props.data == null){
   return <div></div>
  }

  
  // オブジェクトの数だけcolorを作成
  const colors: any[]  = []
  let index :number = 0
  for (let i = 1; i <= Object.keys(props.data).length; i++) {
    const color :any[] = ['#FF6384','#36A2EB','#FFCE56']
    if (index === 3){
      index = 0
    } else {
      index ++
    }
    colors.push(color[index])
  }



  const chartVal: any = Object.values(props.data); // グラフデータ（描画するデータ）

  const data = {
    labels: Object.keys(props.data),
    datasets: [{
      data: chartVal,
      backgroundColor: colors,
      hoverBackgroundColor: colors,
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