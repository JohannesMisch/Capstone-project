import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DoughnutChart({ data }) {
  const options = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        display: true,
        color: "white",
      },
    },
  };
  const textCenter = {
    id: "textCenter",
    beforeDatasetDarw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "red";
      ctx.fillText(
        "text",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return <Doughnut data={data} options={options} plugins={[textCenter]} />;
}
