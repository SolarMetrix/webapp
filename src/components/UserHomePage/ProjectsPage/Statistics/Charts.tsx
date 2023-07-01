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
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IProduct } from "../../../../../types";
import capitalize from "../../../../utils/capitalize";

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
  elements: {
    bar: {
      borderRadius: 7,
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
    labels: products.map(
      (product) =>
        `${capitalize(product.type as string)} (${(+product.latitude!).toFixed(
          4
        )}°, ${(+product.longitude!).toFixed(4)}°)`
    ),
    datasets: [],
  });

  useEffect(() => {
    if (products.length > 0) {
      const dates = products.map((product) =>
        (product.finalStats!.totalGeneratedElectricity! / 1000).toFixed(3)
      );
      setDataset(dates);
    }
  }, [products]);

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
          barPercentage: 0.4,
        },
      ],
    });
  }

  return (
    <div className="w-full rounded-md bg-white px-2 py-4 sm:w-[1000px] md:px-10">
      <Bar options={optionsWithLines} data={data} />
    </div>
  );
}
