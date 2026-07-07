import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useAuth from "../hooks/useAuth";

function PublicRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return <LoadingSpinner />;
    }
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}

export default PublicRoute;