import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Sidebar() {
    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `block rounded-lg px-4 py-3 transition-all ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside className="flex h-screen w-64 flex-col justify-between border-r border-slate-800 bg-slate-900 p-6">
            <div>
                <h1 className="mb-10 text-2xl font-bold text-white">
                    AI Code Review
                </h1>

                <nav className="space-y-2">
                    <NavLink to="/dashboard" className={linkClass}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/review" className={linkClass}>
                        New Review
                    </NavLink>

                    <NavLink to="/reviews" className={linkClass}>
                        Review History
                    </NavLink>

                    <NavLink to="/profile" className={linkClass}>
                        Profile
                    </NavLink>
                </nav>
            </div>

            <button onClick={handleLogout} className="rounded-lg bg-red-600 px-4 py-3 text-white transition hover:bg-red-700">
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;