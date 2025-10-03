import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import taraIcon from '../assets/tara-icon.png';

export default function Header({ sidebarOpen, setSidebarOpen, showMenuButton }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
            <nav className="flex items-center justify-between px-6 py-4">
                {/* Left side: Menu Toggle + Logo */}
                <div className="flex items-center gap-4">
                    {/* Menu Toggle Button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`relative p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg shadow-indigo-500/50 transition-all duration-300 group ${showMenuButton ? 'opacity-100' : 'opacity-0'
                            } ${sidebarOpen ? 'rotate-90' : ''}`}
                        aria-label="Toggle Menu"
                    >
                        <Bars3Icon
                            className={`h-5 w-5 transition-transform duration-300 ${sidebarOpen ? 'rotate-180' : ''
                                }`}
                        />
                        <span className="absolute inset-0 rounded-full bg-indigo-600 animate-ping opacity-20 group-hover:opacity-30"></span>
                    </button>
                </div>

                {/* Right side: Desktop Links + Logout */}
                <div className="flex items-center gap-8">
                    {/* Desktop Links */}
                    <div className="flex items-center gap-x-4">
                        <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Dashboard</a>
                    </div>

                    {/* Logout Button */}
                    <div className="">
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                            Log out
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
