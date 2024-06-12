import React from "react";
import { Card } from "antd";
import ReactApexChart from "react-apexcharts";
import './css/About.css';

const About = () => {
  let mainChartColors = {
    borderColor: "#F3F4F6",
    labelColor: "#6B7280",
    opacityFrom: 0.45,
    opacityTo: 0
  };

  let series = [
    {
      name: "Revenue",
      data: [8686.70, 8910.62, 8511.80, 8421.70, 8726.45, 8951.70, 8766.20 ],

      color: "#0000FF"
    },
    {
      name: "Revenue year ago",
      data: [8421.70, 8238.85, 8156.70, 8646.95, 8421.70, 8289.20, 8024.20],
      color: "#FF0000"
    },
  ];

  let options = {
    chart: {
      height: 420,
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: mainChartColors.labelColor,
      toolbar: {
        show: false
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        enabled: true,
        opacityFrom: mainChartColors.opacityFrom,
        opacityTo: mainChartColors.opacityTo
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif"
      }
    },
    grid: {
      show: true,
      borderColor: mainChartColors.borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15
      }
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3
      }
    },
    xaxis: {
      categories: [
        "01 June",
        "04 June",
        "09 June",
        "11 July",
        "02 July",
        "23 July",
        "27 August"
      ],
      labels: {
        style: {
          colors: [mainChartColors.labelColor],
          fontSize: "14px",
          fontWeight: 500
        }
      },
      axisBorder: {
        color: mainChartColors.borderColor
      },
      axisTicks: {
        color: mainChartColors.borderColor
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: mainChartColors.borderColor,
          width: 1,
          dashArray: 10
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: [mainChartColors.labelColor],
          fontSize: "14px",
          fontWeight: 500
        },
        formatter: function (value) {
          return "$" + value;
        }
      }
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [mainChartColors.labelColor]
      },
      itemMargin: {
        horizontal: 10
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false
            }
          }
        }
      }
    ]
  };

  return (
    <Card  className="about-card" title="About">
      <ReactApexChart options={options} series={series} type="area" height={350} />
    </Card>
  );
};

export default About;
