import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import LoginPage from "../components/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Route */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <WelcomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}