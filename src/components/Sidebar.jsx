import React, { useState } from 'react';
import { XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { menuItems } from './sidebarItems'; // import menu items
import SidebarProfile from './SidebarProfile';
import Logo from "../assets/tara-admin-logo.png";

export default function Sidebar({ isOpen, setIsOpen }) {
    const [activeItem, setActiveItem] = useState('Dashboard');

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800/50 z-50 shadow-2xl transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
                    <div className="flex items-center gap-3">
                        {/* taralogo */}
                        <div className="flex items-center">
                            <img
                                src={Logo}
                                alt="TARA Logo"
                                className="w-50 h-10 rounded-lg object-cover"
                            />
                        </div>                    
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-white transition-all duration-200 hover:rotate-90 p-2 hover:bg-gray-800/50 rounded-lg"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar">
                    {menuItems.map((item, index) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveItem(item.name)}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${activeItem === item.name
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                }`}
                            style={{
                                animationDelay: isOpen ? `${index * 50}ms` : '0ms',
                                animation: isOpen ? 'slideIn 0.3s ease-out forwards' : 'none',
                            }}
                        >
                            {activeItem === item.name && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                            )}
                            <div className="flex items-center gap-3 flex-1">
                                <item.icon
                                    className={`h-5 w-5 transition-all duration-200 ${activeItem === item.name ? 'scale-110' : 'group-hover:scale-110'
                                        }`}
                                />
                                <span className="font-medium">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {item.badge && (
                                    <span
                                        className={`px-2 py-0.5 text-xs font-bold rounded-full ${activeItem === item.name
                                            ? 'bg-white/20 text-white'
                                            : 'bg-indigo-600/20 text-indigo-400'
                                            }`}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                                <ChevronRightIcon
                                    className={`h-4 w-4 transition-all duration-200 ${activeItem === item.name
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                        }`}
                                />
                            </div>
                        </a>
                    ))}
                </nav>

                {/* Bottom Profile Section */}
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50 bg-gradient-to-t from-gray-950 to-transparent">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">JD</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium text-sm">John Doe</p>
                            <p className="text-gray-400 text-xs">john@example.com</p>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </div>
                </div> */}
                <SidebarProfile />
            </aside>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
        </>
    );
}
