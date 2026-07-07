import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-slate-950">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Navbar />

                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;