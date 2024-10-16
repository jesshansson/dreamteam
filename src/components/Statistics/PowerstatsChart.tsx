import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useHeroes } from "../../context/HeroContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PowerstatsChart() {
  const { teamHeroes } = useHeroes(); // Hämta hjältarna från context 

  // Summera powerstats för hela teamet
  const totalPowerstats = teamHeroes.reduce(
    (acc, hero) => {
      acc.intelligence += hero.powerstats.intelligence || 0;
      acc.strength += hero.powerstats.strength || 0;
      acc.speed += hero.powerstats.speed || 0;
      return acc;
    },
    { intelligence: 0, strength: 0, speed: 0 }
  );

  const data = {
    labels: ["Intelligence", "Strength", "Speed"],
    datasets: [
      {
        label: "Powerstats Distribution",
        data: [totalPowerstats.intelligence, totalPowerstats.strength, totalPowerstats.speed],
        backgroundColor: [
          "#36A2EB", // Intelligence
          "#FF6384", // Strength
          "#FFCE56", // Speed
        ],
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"pie">) {
            return tooltipItem.label || ""; // Visar bara etiketten (attributnamnet) utan siffra
          },
        },
      },
    },
  };
  return (
    <div className="powerstats-chart">
      <h3>Powerstats Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
}
