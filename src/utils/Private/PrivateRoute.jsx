import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                {/* Loader size control korar jonno ektu clean approach */}
                <span className="loading loading-bars loading-lg text-amber-400"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

// replace: true use kora bhalo jate history-te extra entry na hoy
    return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
