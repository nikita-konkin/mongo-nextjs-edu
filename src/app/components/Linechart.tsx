"use client"
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Linechart(props) {

  let [anomalyDots, setAnomalyDots] = useState([])

  const callback = (e, activeEls) => {
    let datasetIndex = activeEls[0].datasetIndex;
    let dataIndex = activeEls[0].index;
    let datasetLabel = e.chart.data.datasets[datasetIndex].label;
    let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
    let label = e.chart.data.labels[dataIndex];

    props.setAnomalyDots(
      [...props.anomalyDots, {time: label, anomalyMUF: value} ]
    )
  }

  const options = {
    onClick: callback,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      customCanvasBackgroundColor: {
        color: 'lightGreen',
      },
      title: {
        display: true,
        text: 'Временной ход МПЧ',
      },
    },
  };

  const labels = props.data.time
  const data = {
    labels,
    datasets: [
      {
        label: 'МПЧ',
        data: [].concat.apply([], props.data.muf),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
      <Line options={options} data={data} />
  );
}