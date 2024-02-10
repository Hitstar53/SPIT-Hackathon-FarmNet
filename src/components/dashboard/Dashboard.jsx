import * as React from "react";
import Chart from "react-apexcharts";
import styles from "./Dashboard.module.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Dashboard = () => {
  const chartDetails = {
    series: [
      {
        name: "High - 2013",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Farmer Loans Over Time",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
    },
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold my-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 w-1/2">
        <Chart
          options={chartDetails.options}
          series={chartDetails.series}
          type="line"
          width="500"
          sx={{
            gridColumns: 2,
          }}
        />
        <div>
          <div className="flex justify-between">
            <div className={styles.circle}>
              <p className="text-2xl font-bold">$ 100k+</p>
              <p className="text-sm font-thin my-4">Total Profit</p>
            </div>
          </div>
        </div>
        <BorderLinearProgress variant="determinate" value={50} />
      </div>
    </div>
  );
};

export default Dashboard;
