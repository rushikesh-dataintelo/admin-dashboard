import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function BaseLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showMenuButton, setShowMenuButton] = useState(true);

    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            setShowMenuButton(false);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setShowMenuButton(true);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });

        // Auto-open sidebar when mouse is near left edge
        if (e.clientX < 30 && !sidebarOpen) {
            setSidebarOpen(true);
        }
    };

    return (
        <div
            className="min-h-screen w-screen overflow-x-hidden py-20 px-10 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-900"
            onMouseMove={handleMouseMove}
        >
            {/* Pass sidebar state & toggle to Header */}
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                showMenuButton={showMenuButton}
            />

            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <main className="pt-20 min-h-full relative z-10 w-full">
                <div className="w-full px-4 sm:px-6 lg:px-8">{children}</div>
            </main>

            <Footer />

            {/* Cursor follower */}
            <div
                className="fixed w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full pointer-events-none z-50 blur-xl transition-all duration-500 ease-out opacity-30"
                style={{ left: mousePosition.x - 12, top: mousePosition.y - 12 }}
            />
            <div
                className="fixed w-3 h-3 bg-indigo-400 rounded-full pointer-events-none z-50 blur-sm transition-all duration-200 ease-out opacity-50"
                style={{ left: mousePosition.x - 6, top: mousePosition.y - 6 }}
            />

            {/* Background gradient orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-48 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            <style jsx>
                {`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}
            </style>
        </div>
    );
}
