import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../common/Card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function LanguageChart({ dashboard }) {
    const data = {
        labels: dashboard.languageDistribution.map(
            (item) => item.language
        ),

        datasets: [
            {
                label: "Reviews",
                data: dashboard.languageDistribution.map(
                    (item) => item._count.language
                ),
                backgroundColor: "#3b82f6",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Language Distribution",
                color: "#ffffff",
                font: {
                    size: 18,
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: "#ffffff",
                },
                grid: {
                    color: "#374151",
                },
            },

            y: {
                beginAtZero: true,
                ticks: {
                    color: "#ffffff",
                    precision: 0,
                },
                grid: {
                    color: "#374151",
                },
            },
        },
    };

    return (
        <Card>
            <div className="h-96">
                <Bar data={data} options={options} />
            </div>
        </Card>
    );
}

export default LanguageChart;