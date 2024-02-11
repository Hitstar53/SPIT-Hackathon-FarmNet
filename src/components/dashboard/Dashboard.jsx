import * as React from "react";
import styles from "./Dashboard.module.css";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Chart from "react-apexcharts";

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

const peopleList = [
  { id: 1, name: "John Doe", amountDue: 500 },
  { id: 2, name: "Jane Doe", amountDue: 300 },
  // Add more people as needed
];

const ListItem = ({ profileIcon, name, amountDue }) => (
  <div className={styles.listItem}>
    <img src={profileIcon} alt="Profile" className={styles.profileIcon} />
    <div className={styles.personDetails}>
      <p className={styles.personName}>{name}</p>
      <p className={styles.amountDue}>${amountDue}</p>
    </div>
  </div>
);

const ChartSection = () => {
  const largeChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [300, 50, 100],
  };
  return (
    <div className={styles.chartSection}>
      <div className={styles.largeChart}>
        <Chart
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          series={largeChartData.datasets}
          type="line"
          width="100%"
          height="400"
        />
      </div>
      <div className={styles.doughnutChart}>
        <Chart
          options={{
            cutout: "60%",
          }}
          series={doughnutChartData.datasets}
          type="donut"
          width="100%"
          height="100%"
        />
      </div>
      <div className={styles.progressChart}>
        <BorderLinearProgress
          variant="determinate"
          value={50}
          sx={{
            width: "100%",
            height: "10px",
            borderRadius: "5px",
            backgroundColor: "#555",
            "& .MuiLinearProgress-bar": {
              borderRadius: "5px",
              backgroundColor: "#1a90ff",
            },
          }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <ChartSection />
      <div className={styles.listSection}>
        {peopleList.map((person) => (
          <ListItem
            key={person.id}
            profileIcon="https://via.placeholder.com/150"
            name={person.name}
            amountDue={person.amountDue}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
