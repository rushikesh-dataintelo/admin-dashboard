import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import ManageAdmin from "../pages/ManageAdmin/ManageAdmin";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><WelcomePage /></ProtectedRoute>} />
                <Route path="/manage-admin" element={<ProtectedRoute><ManageAdmin /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}