import React, { useState, useRef } from 'react';
import {
    XMarkIcon,
    ChevronRightIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { menuItems } from './sidebarItems';
import SidebarProfile from './SidebarProfile';
import Logo from '../assets/tara-admin-logo.png';
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [openMenus, setOpenMenus] = useState({});
    const sidebarRef = useRef(null);
    const navigate = useNavigate();

    const toggleSubmenu = (name) => {
        setOpenMenus((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const handleItemClick = (item) => {
        if (item.children) {
            toggleSubmenu(item.name);
        } else {
            setActiveItem(item.name);
            setIsOpen(false);

            if (item.href) {
                navigate(item.href);
            }
        }
    };

    //  Detect when mouse leaves sidebar
    const handleMouseLeave = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    };

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
                ref={sidebarRef}
                onMouseLeave={handleMouseLeave}
                className={`fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800/50 z-50 shadow-2xl transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="margin-left-auto flex items-center justify-center p-4 border-b border-gray-800/50 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
                    <img
                        src={Logo}
                        alt="TARA Logo"
                        className="h-10 "
                    />
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-140px)] custom-scrollbar">
                    {menuItems.map((item, index) => {
                        const isActive = activeItem === item.name;
                        const isOpenMenu = openMenus[item.name];
                        const hasChildren = Array.isArray(item.children);

                        return (
                            <div key={item.name} className="flex flex-col">
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                    style={{
                                        animationDelay: isOpen ? `${index * 50}ms` : '0ms',
                                        animation: isOpen ? 'slideIn 0.3s ease-out forwards' : 'none',
                                    }}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                                    )}
                                    <div className="flex items-center gap-3 flex-1">
                                        <item.icon
                                            className={`h-5 w-5 transition-all duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                                                }`}
                                        />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.badge && (
                                            <span
                                                className={`px-2 py-0.5 text-xs font-bold rounded-full ${isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-indigo-600/20 text-indigo-400'
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        )}
                                        {hasChildren ? (
                                            isOpenMenu ? (
                                                <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-all duration-200" />
                                            ) : (
                                                <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-white transition-all duration-200" />
                                            )
                                        ) : (
                                            <ChevronRightIcon
                                                className={`h-4 w-4 transition-all duration-200 ${isActive
                                                    ? 'opacity-100 translate-x-0'
                                                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                </button>

                                {/* Submenu */}
                                {hasChildren && (
                                    <div
                                        className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${isOpenMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        {item.children.map((child) => (
                                            <button
                                                key={child.name}
                                                onClick={() => {
                                                    setActiveItem(child.name);
                                                    setIsOpen(false);
                                                    navigate(child.href);
                                                }}
                                                className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-all duration-200 ${activeItem === child.name
                                                    ? 'bg-indigo-600 text-white shadow-md'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                                                    }`}
                                            >

                                                {child.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

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
