import useAuth from "../../hooks/useAuth";

function Navbar() {
    const { user } = useAuth();

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
            <h2 className="text-xl font-semibold text-white">
                Dashboard
            </h2>
            <div className="text-right">
                <p className="font-medium text-white">
                    {user?.name}
                </p>
                <p className="text-sm text-slate-400">
                    {user?.email}
                </p>
            </div>
        </header>
    );
}

export default Navbar;