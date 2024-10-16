import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useHeroes } from "../../context/HeroContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export function AlignmentChart() {
  const { teamHeroes } = useHeroes();

  const alignmentCount = teamHeroes.reduce(
    (acc, hero) => {
      if (hero.biography.alignment === "good") {
        acc.good += 1;
      } else if (hero.biography.alignment === "bad") {
        acc.bad += 1;
      } else {
        acc.neutral += 1;
      }
      return acc;
    },
    { good: 0, bad: 0, neutral: 0 }
  );

  const data = {
    labels: [
      "Good",
      "Bad",
      "Neutral"
    ],
    datasets: [
      {
        data: [alignmentCount.good, alignmentCount.bad, alignmentCount.neutral],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, 
            weight: 400,
            family: "Playpen Sans",
          },
          color: "white",
        },
      },
    },
  };

  return (
    <div className="alignment-chart">
      <h3>Alignment</h3>
      <Pie data={data} options={options} />
    </div>
  );
}
