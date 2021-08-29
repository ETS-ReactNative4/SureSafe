import React, { FC } from "react";
import { Div } from "@suresafe/core";
import { Line } from "react-chartjs-2";

interface ChartProps {
  labels?: any;
  datas?: any;
}

const options = {
  tension: 0.5,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          padding: 12,
          fontFamily: "Gilroy-Black",
          fontColor: "rgb(34, 49, 66)",
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          padding: 12,
          fontFamily: "Gilroy-Black",
          fontColor: "rgb(34, 49, 66)",
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

export const Chart: FC<ChartProps> = ({ labels, datas }) => {
  let data = {
    labels: labels,
    datasets: [
      {
        data: datas,
        fill: true,
        backgroundColor: "rgba(99, 201, 169, .3)",
        borderColor: "rgba(72, 191, 197, .5)",
        borderWidth: 5,
      },
    ],
  };
  return (
    <Div className={`w-full px-7 py-10 rounded-xl bg-primary`}>
      <Line data={data} options={options} />
    </Div>
  );
};
