import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const StaticsChart = ({chartName, labels, values}) => {

  useEffect(() => {
  console.log('labels: ', labels[0]);
});

  
  // Basic Bar Chart 옵션
  const basicBarOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: labels,
    },
     yaxis: {
    //   title: {
    //     text: '$ (thousands)'
    //   }
    labels: { show: false }
     },
    fill: {
      opacity: 1
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return "$ " + val + " thousands"
    //     }
    //   }
    // }
  };

  // Basic Bar Chart 데이터
  const basicBarSeries = [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }
  // , {
  //   name: 'Revenue',
  //   data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  // }
];

  return (
    <div>
      <div >
        <div className="card">
          <div className="card-body">
            <h4 className="header-title mt-0 mb-4">{chartName}</h4>
            <div className="chart-demo">
              <ReactApexChart
                options={basicBarOptions}
                series={basicBarSeries}
                type="bar"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticsChart;