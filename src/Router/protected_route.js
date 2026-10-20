import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children, user }) => {
    const location = useLocation();

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};
