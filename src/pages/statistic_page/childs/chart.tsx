import React from 'react';
import  {Doughnut}  from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import chroma from 'chroma-js';

const calculateSum = (numbers: any[]) => {
  var sum = 0
  for(let i = 0; i < numbers.length; i++){
    sum = sum + numbers[i]
  }
  return sum 
}

const centerDoughnutPlugin = {
  id: "annotateDoughnutCenter",
  beforeDraw: (chart:any) => {
    let width = chart.width;
    let height = chart.height;
    let ctx = chart.ctx;

    ctx.restore();
    let fontSize = (height / 150).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";
    let text = calculateSum(chart.config.data.datasets[0].data) + "€";
    let textX = Math.round((width - ctx.measureText(text).width) / 2);
    let textY = height / 1.95;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};
ChartJS.register(ArcElement, Tooltip, Legend, centerDoughnutPlugin, Title);
const Chart = (props: any) => {
  const colors = chroma.scale(['#7F1E0F', '#A49956', '#B58A46', '#A5A67A', '#A1A2A7', '#CBA185']).colors(props.labels.length);
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: colors.map((color) => chroma(color).darken(0.5).hex()),
        hoverBackgroundColor: colors.map((color) => chroma(color).darken(0.5).hex()),
        borderWidth: 1,
      },
    ],
  };

  const options:any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "right"
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Chart;