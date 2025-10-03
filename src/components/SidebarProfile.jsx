import React, { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SidebarProfile() {
    const [admin, setAdmin] = useState({
        name: "Admin",
        email: "admin@example.com",
        initials: "AD",
    });

    useEffect(() => {
        // Fetch admin details from localStorage
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            try {
                const parsedAdmin = JSON.parse(storedAdmin);
                setAdmin({
                    name: parsedAdmin.name || "Admin",
                    email: parsedAdmin.email || "admin@example.com",
                    initials: parsedAdmin.initials || parsedAdmin.name?.slice(0, 2).toUpperCase() || "AD",
                });
            } catch (err) {
                console.error("Failed to parse admin data from localStorage", err);
            }
        }
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50 bg-gradient-to-t from-gray-950 to-transparent">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{admin.initials}</span>
                </div>
                <div className="flex-1">
                    <p className="text-white font-medium text-sm">{admin.name}</p>
                    <p className="text-gray-400 text-xs">{admin.email}</p>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}
