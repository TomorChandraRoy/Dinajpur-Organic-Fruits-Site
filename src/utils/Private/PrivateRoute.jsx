import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext)
    const location = useLocation();
    if (loading) {
        return (
            <div className=" h-screen justify-center flex">
                <span className="self-center text-9xl text-amber-400 loading loading-bars loading-lg lg:w-14"></span>
            </div>
        )
    }
    if (user) {
        return children;
    }
    return <Navigate to={'/signin'} state={{from:location}}></Navigate>;
};

export default PrivateRoute;
