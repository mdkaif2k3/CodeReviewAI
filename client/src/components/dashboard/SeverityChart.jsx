import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "../common/Card";

ChartJS.register(ArcElement, Tooltip, Legend);

function SeverityChart({ dashboard }) {
    const data = {
        labels: [
            "Critical",
            "High",
            "Medium",
            "Low",
        ],

        datasets: [
            {
                data: [
                    dashboard.criticalIssues,
                    dashboard.highIssues,
                    dashboard.mediumIssues,
                    dashboard.lowIssues,
                ],
                backgroundColor: [
                    "#ef4444",
                    "#f97316",
                    "#eab308",
                    "#22c55e",
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#ffffff",
                },
            },
            title: {
                display: true,
                text: "Issue Severity Distribution",
                color: "#ffffff",
                font: {
                    size: 18,
                },
            },
        },
    };

    return (
        <Card>
            <div className="h-96">
                <Doughnut data={data} options={options} />
            </div>
        </Card>
    );
}

export default SeverityChart;