import { useContext } from "react";
import { Navigate } from "react-router-dom";
import DataContext from "@/Context/DataContext";

// Компонент за защитени маршрути
const ProtectedRoute = ({ children }) => {
    const { user, login, dataSettings } = useContext(DataContext);

    // Ако няма логин — връщаме към началната страница
    if (!login || !user || !dataSettings) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
