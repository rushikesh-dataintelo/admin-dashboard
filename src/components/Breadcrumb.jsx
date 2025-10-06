import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Breadcrumb = ({ title, links = [] }) => {
    return (
        <div className=" flex items-center flex-wrap gap-2">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            {links.length > 0 && (
                <nav className="flex items-center text-gray-500 text-sm ml-4 space-x-1">
                    {links.map((link, index) => (
                        <div key={index} className="flex items-center">
                            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                            {link.path ? (
                                <Link
                                    to={link.path}
                                    className="ml-1 hover:text-gray-800 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <span className="ml-1 text-gray-500">{link.label}</span>
                            )}
                        </div>
                    ))}
                </nav>
            )}
        </div>
    );
};

export default Breadcrumb;