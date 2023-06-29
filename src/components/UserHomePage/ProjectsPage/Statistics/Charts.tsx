import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ChartType,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { IProduct } from "../../../../../types";
import capitalize from "../../../../utils/capitalize";

// import groupByMonth from "../../../../helpers/group-by-month";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

const optionsWithoutLines = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      offset: true,
    },
    y: {
      grid: {
        display: true,
      },
      ticks: {
        stepSize: 5,
        beginAtZerO: true,
      },
    },
  },
};

const optionsWithLines = JSON.parse(JSON.stringify(optionsWithoutLines));

export default function Charts({
  products,
}: {
  products: Partial<IProduct>[];
}) {
  const [data, setData] = useState<any>({
    labels: products.map((product) => capitalize(product.type as string)),
    datasets: [],
  });

  useEffect(() => {
    if (products.length > 0) {
      const dates = products.map((product) =>
        (product.finalStats!.totalGeneratedElectricity! / 1000).toFixed(3)
      );
      setDataset(dates);
    }
  }, []);

  async function setDataset(arr: any) {
    setData({
      ...data,
      datasets: [
        {
          fill: true,
          label: "Output (kWh)",
          data: arr,
          backgroundColor: "#33a796",
          borderColor: "#00b7ad",
          pointRadius: 7,
          tension: 0.4,
          barPercentage: 0.3,
        },
      ],
    });
  }

  return (
    <div className="w-full rounded-md bg-white px-2 py-4 shadow md:px-10">
      <Bar options={optionsWithLines} data={data} />
    </div>
  );
}
