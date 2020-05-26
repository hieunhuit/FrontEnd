import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

var data = {
    labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
        {
            label: 'Memory',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
        },
    ],
};
let options = {
    tooltips: {
        enable: true,
    },
    animation: {
        duration: 0,
    },
    responsiveAnimationDuration: 0,
}

export default function LineChartStream(props) {
    const { ListSysInfo } = useSelector((state) => state.sysInfoLiveMode);
    data.datasets[0].data = [];
    ListSysInfo.map((ListSysInfo_item) => {
        data.datasets[0].data.push(ListSysInfo_item[props.type]);
    })
    switch (props.type){
        case 'net_used_tx'||'net_used_rx':
            data.datasets[0].backgroundColor = 'rgb(211,165,95,0.4)';
            data.datasets[0].borderColor = 'rgb(211,165,95,1)';
            data.datasets[0].pointBorderColor = 'rgb(211,165,95,1)';
            data.datasets[0].pointHoverBackgroundColor = 'rgb(211,165,95,1)';
            data.datasets[0].label = 'Network';
            break;
      }
    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}
