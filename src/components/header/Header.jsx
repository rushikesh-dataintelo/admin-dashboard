import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsShrunk(true);
            } else {
                setIsShrunk(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header-container ${isShrunk ? "header-shrink" : ""}`}>
            <div className="header-left">
                <h1 className="header-title">Admin Dashboard</h1>
            </div>
            <nav className="header-nav">
                <Link to="/" className="nav-link">Dashboard</Link>
                <Link to="/admin" className="nav-link">Admins</Link>
                <Link to="/astrologer" className="nav-link">Astrologers</Link>
                <Link to="/pooja" className="nav-link">Pooja</Link>
            </nav>
        </header>
    );
}
