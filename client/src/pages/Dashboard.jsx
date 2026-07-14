import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import Card from "../components/common/Card";

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
                <Card>
                    <h2 className="text-gray-400 font-semibold">
                        Total Projects
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                        {dashboard.totalProjects}
                    </p>
                </Card>
                <Card>
                    <h2 className="text-gray-400 font-semibold">
                        Total Reviews
                    </h2>
                    <p className="text-4xl font-bold mt-4">
                        {dashboard.totalReviews}
                    </p>
                </Card>
                <Card>
                    <h2 className="text-gray-400 font-semibold">
                        Average Score
                    </h2>
                    <p className="text-4xl font-bold mt-4 text-green-400">
                        {dashboard.averageScore}/100
                    </p>
                </Card>
                <Card>
                    <h2 className="text-gray-400 font-semibold">
                        Critical Issues
                    </h2>
                    <p className="text-4xl font-bold mt-4 text-red-400">
                        {dashboard.criticalIssues}
                    </p>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <h2 className="text-gray-400 font-semibold">
                        High Issues
                    </h2>
                    <p className="text-3xl font-bold mt-4 text-orange-400">
                        {dashboard.highIssues}
                    </p>
                </Card>
                <Card>
                    <h2 className="text-gray-400 font-semibold">
                        Medium Issues
                    </h2>
                    <p className="text-3xl font-bold mt-4 text-yellow-400">
                        {dashboard.mediumIssues}
                    </p>
                </Card>
                <Card>
                    <h2 className="text-gray-400 font-semibold">
                        Low Issues
                    </h2>
                    <p className="text-3xl font-bold mt-4 text-green-400">
                        {dashboard.lowIssues}
                    </p>
                </Card>
            </div>
            <Card>
                <h2 className="text-2xl font-bold mb-6">
                    Language Distribution
                </h2>
                <div className="space-y-4">
                    {dashboard.languageDistribution.map((language) => (
                        <div key={language.language} className="flex justify-between border-b border-slate-700 pb-3">
                            <span className="font-medium">
                                {language.language}
                            </span>
                            <span className="font-semibold">
                                {language._count.language}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <h2 className="text-2xl font-bold mb-6">
                    Recent Reviews
                </h2>
                <div className="space-y-5">
                    {dashboard.recentReviews.map((review) => (
                        <div key={review.id} className="border-b border-slate-700 pb-5">
                            <div className="flex justify-between items-start">
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
                                    <p className="text-xl font-bold text-green-400">
                                        {review.overallScore}/100
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {review.status}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-300">
                                {review.summary.length > 120 ? review.summary.substring(0, 120) + "..." : review.summary}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

export default Dashboard;