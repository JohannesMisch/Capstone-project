import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRef, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function DoughnutChart({ data, displaySum }) {
  const ref = useRef();
  useEffect(() => {
    ref.current = displaySum;
  }, [ref, displaySum]);

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
    beforeDatasetDraw(chart, args, pluginOptions) {
      const { ctx, data, canvas } = chart;
      ctx.save();
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "#737373";
      ctx.textAlign = "center";
      ctx.fillText(
        ref.current,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };
  const outLable = {};

  return (
    <Doughnut data={data} options={options} plugins={[textCenter, outLable]} />
  );
}
