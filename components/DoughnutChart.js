import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DoughnutChart({ chartData }) {
  const options = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      outlabels: {
        display: true,
      },
    },
  };
  return <Doughnut data={chartData} options={options} />;
}
