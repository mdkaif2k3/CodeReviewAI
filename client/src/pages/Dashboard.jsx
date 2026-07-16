import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

import Card from "../components/common/Card";
import SeverityChart from "../components/dashboard/SeverityChart";
import LanguageChart from "../components/dashboard/LanguageChart";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard();
                setDashboard(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadDashboard();
    }, []);

    function getScoreColor(score){
        if(score>=85)
            return "text-green-400";
        if(score>=70)
            return "text-yellow-400";
        return "text-red-400";
    }

    function getStatusColor(status) {
        switch(status){
            case "COMPLETED":
                return "bg-green-500/20 text-green-400";
            case "PROCESSING":
                return "bg-yellow-500/20 text-yellow-400";
            case "FAILED":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-slate-500/20 text-slate-300";
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <h1 className="text-2xl font-semibold text-gray-400">
                    Loading Dashboard...
                </h1>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-gray-400 font-semibold">
                        Total Projects
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                        {dashboard.totalProjects}
                    </p>
                </Card>
                <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-gray-400 font-semibold">
                        Total Reviews
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                        {dashboard.totalReviews}
                    </p>
                </Card>
                <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-gray-400 font-semibold">
                        Average Score
                    </h2>
                    <p className="text-4xl font-bold mt-4 text-green-400">
                        {dashboard.averageScore}/100
                    </p>
                </Card>
                <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-gray-400 font-semibold">
                        Critical Issues
                    </h2>
                    <p className="text-4xl font-bold mt-4 text-red-400">
                        {dashboard.criticalIssues}
                    </p>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-gray-400 font-semibold">
                        High Issues
                    </h2>
                    <p className="text-3xl font-bold mt-4 text-orange-400">
                        {dashboard.highIssues}
                    </p>
                </Card>
                <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-gray-400 font-semibold">
                        Medium Issues
                    </h2>
                    <p className="text-3xl font-bold mt-4 text-yellow-400">
                        {dashboard.mediumIssues}
                    </p>
                </Card>
                <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h2 className="text-gray-400 font-semibold">
                        Low Issues
                    </h2>
                    <p className="text-3xl font-bold mt-4 text-green-400">
                        {dashboard.lowIssues}
                    </p>
                </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SeverityChart dashboard={dashboard} />
                <LanguageChart dashboard={dashboard} />
            </div>

            <Card className="transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-6">
                    Recent Reviews
                </h2>
                <div className="space-y-5">
                    {
                        dashboard.recentReviews.map((review) => (
                            <div key={review.id} className="border-b border-slate-700 pb-5 hover:bg-slate-800/40 transition rounded-lg p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">
                                            {review.project.name}
                                        </h3>
                                        <p className="text-gray-400">
                                            {review.language}
                                        </p>
                                        <p className="text-gray-400">
                                            {review.reviewType}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xl font-bold ${getScoreColor(review.overallScore)}`}>
                                            {review.overallScore}/100
                                        </span> <br />
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(review.status)}`}>
                                            {review.status}
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-300">
                                    {
                                        review.summary.length > 120 ? review.summary.substring(0, 120) + "..." : review.summary
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
            </Card>
        </div>
    );
}

export default Dashboard;