import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart() {
  const options = {
    tooltips: {
      mode: 'dataset',
    },
    legend: {
      onHover: function(e) {
        e.target.style.cursor = 'pointer';
      },
    },
    hover: {
      onHover: function(e) {
        var point = this.getElementAtEvent(e);
        if (point.length) e.target.style.cursor = 'pointer';
        else e.target.style.cursor = 'default';
      },
    },
  };
  const data = {
    labels: ['TCP', 'UDP', 'ICMP'],
    datasets: [
      {
        data: [30, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  function handleClick(element) {
    if (element.length !== 0) {
      console.log(element[0]._index);
    }
  }
  return (
    <div>
      <Doughnut options={options} data={data} getElementAtEvent={(elems) => handleClick(elems)} />
    </div>
  );
}
