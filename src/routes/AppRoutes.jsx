import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage/WelcomePage";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
            </Routes>
        </Router>
    );
}