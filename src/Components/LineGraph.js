import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        callback: function (value, index, values) {
          return numeral(value).format("0a");
        },
      },
    },
  },
};

const LineGraph = ({ casesType }) => {
  const [data, setData] = useState([]);

  const buildChartData = (data, casesType) => {
    let chartData = [];
    for (let date in data.cases) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date],
      };
      chartData.push(newDataPoint);
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
        });
    };

    fetchData();
  }, [casesType]);
  return (
    <div>
      {" "}
      {data.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
                label: "worldwide",
              },
            ],
          }}
          options={options}
        />
      )}{" "}
    </div>
  );
};

export default LineGraph;
