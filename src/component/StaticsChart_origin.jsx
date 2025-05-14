import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StaticsChart = ({ title, labels = [], values = [] }) => {

  const options = {
    chart: { type: 'bar', height: 350, toolbar: { show: false } },
    xaxis: { categories: labels },
    // ...나머지 옵션
  };

  const series = [{ name: title, data: values }];

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
            dataLabels: {
        enabled: false, // ← 이 부분 추가!
      }
    },
    dataLabels: {
      enabled: false
    },
  
    // stroke: {
    //   show: true,
    //   width: 2,
    //   colors: ['transparent']
    // },
    // xaxis: {
    //   categories: ['chartData[0]', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    // },
    // fill: {
    //   opacity: 1
    // },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return "$ " + val + " thousands"
    //     }
    //   }
    // }
  };

  // // Basic Bar Chart 데이터
  // const basicBarSeries = [{
  //   name: 'Net Profit',
  //   data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  // }];

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="header-title mt-0 mb-4">{title}</h4>
        <div className="chart-demo">
          <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
};

export default StaticsChart;