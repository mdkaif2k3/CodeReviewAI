import { useEffect, useState } from "react";
import Card from "../components/common/Card";
import { getProfile } from "../services/profileService";
import { getDashboard } from "../services/dashboardService";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfile() {
            try {
                const [profileData, dashboardData] = await Promise.all([
                    getProfile(),
                    getDashboard(),
                ]);

                setUser(profileData);
                setDashboard(dashboardData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <h1 className="text-2xl text-slate-400">
                    Loading Profile...
                </h1>
            </div>
        );
    }

    const initials = user.name.split(" ").map((word) => word[0]).join("").toUpperCase();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white">
                    My Profile
                </h1>
                <p className="text-slate-400 mt-2">
                    Manage your account and view your coding activity.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-6">
                        {initials}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        {user.name}
                    </h2>
                    <p className="text-slate-400 mt-2">
                        {user.email}
                    </p>
                    <p className="text-sm text-slate-500 mt-6">
                        Member Since
                    </p>
                    <p className="text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </Card>

                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    <Card>
                        <p className="text-slate-400">
                            Total Projects
                        </p>
                        <h2 className="text-5xl font-bold text-blue-400 mt-4">
                            {dashboard.totalProjects}
                        </h2>
                    </Card>
                    <Card>
                        <p className="text-slate-400">
                            Total Reviews
                        </p>
                        <h2 className="text-5xl font-bold text-green-400 mt-4">
                            {dashboard.totalReviews}
                        </h2>
                    </Card>
                    <Card>
                        <p className="text-slate-400">
                            Average Score
                        </p>
                        <h2 className="text-5xl font-bold text-yellow-400 mt-4">
                            {dashboard.averageScore}
                        </h2>
                    </Card>
                    <Card>
                        <p className="text-slate-400">
                            Critical Issues
                        </p>
                        <h2 className="text-5xl font-bold text-red-400 mt-4">
                            {dashboard.criticalIssues}
                        </h2>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Profile;