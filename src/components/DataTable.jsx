import React, { useState, useMemo } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown"
import enumData from "../data/enum.json";

export default function DataTable({
    data = [],
    columns = [],
    itemsPerPage = 10,
    showSearch = true,
    showPagination = true,
    onRowClick,
    emptyMessage = "No data available",
    className = "",
    enableAddButton = false,
    addButtonPlaceholder = "Add",
    searchableColumns = [],
    sortableColumns = [],
    onSortChange,
    onSearch,
    onPerPageChange,
    onAddClick,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [selectedSearchField, setSelectedSearchField] = useState(
        searchableColumns.length > 0 ? searchableColumns[0].split('.').pop() : ''
    );
    const [perPage, setPerPage] = useState(itemsPerPage);

    // Handle sorting
    const handleSort = (key) => {
        if (!sortableColumns.some(col => col.includes(key))) return;

        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        if (onSortChange) onSortChange(key, direction);
    };

    // Filter and sort data
    const processedData = useMemo(() => {
        let filtered = [...data];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter((row) =>
                columns.some((col) => {
                    if (col.searchable === false) return false;
                    const value = row[col.key];
                    return value
                        ?.toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                })
            );
        }

        // Sort
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                if (aVal === bVal) return 0;

                const comparison = aVal > bVal ? 1 : -1;
                return sortConfig.direction === "asc" ? comparison : -comparison;
            });
        }

        return filtered;
    }, [data, searchTerm, sortConfig, columns]);

    // Pagination
    const totalPages = Math.ceil(processedData.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentData = processedData.slice(startIndex, endIndex);

    const goToPage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    // Render cell content based on column type or custom render
    const renderCell = (row, column) => {
        const value = row[column.key];

        // Custom render function
        if (column.render) {
            return column.render(row, value);
        }

        // Type-based rendering
        switch (column.type) {
            case "image":
                return (
                    <div className="flex items-center justify-center">
                        <img
                            src={value || "/placeholder.png"}
                            alt={column.label}
                            className="h-10 w-10 rounded-lg object-cover"
                            onError={(e) => {
                                e.target.src = "/placeholder.png";
                            }}
                        />
                    </div>
                );

            case "badge":
                const badgeColors = {
                    active: "bg-green-100 text-green-800",
                    inactive: "bg-red-100 text-red-800",
                    pending: "bg-yellow-100 text-yellow-800",
                    completed: "bg-blue-100 text-blue-800",
                };
                const colorClass = badgeColors[value?.toLowerCase()] || "bg-gray-100 text-gray-800";
                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
                        {value}
                    </span>
                );

            case "actions":
                return <div className="flex items-center justify-center gap-2">{value}</div>;

            default:
                return <span className="truncate">{value || "-"}</span>;
        }
    };

    const getAlignment = (align) => {
        switch (align) {
            case "center":
                return "text-center justify-center";
            case "right":
                return "text-right justify-end";
            default:
                return "text-left justify-start";
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full">
                    {/* Left Side: Per Page + Add Button */}
                    <div className="flex items-center gap-4">
                        {/* Per Page Dropdown */}
                        <div className="flex-shrink-0 w-24">
                            <Dropdown
                                options={enumData.itemsPerPage}
                                value={enumData.itemsPerPage.find(opt => opt.value === perPage)}
                                isSearchable={false}
                                isMulti={false}
                                onChange={(selectedOption) => {
                                    const newPerPage = selectedOption.value;
                                    setPerPage(newPerPage);
                                    setCurrentPage(1);
                                    if (onPerPageChange) onPerPageChange(newPerPage);
                                }}
                            />
                        </div>

                        {/* Add Button */}
                        {enableAddButton && (
                            <button
                                onClick={() => {
                                    if (onAddClick) {
                                        onAddClick();
                                    } else {
                                        toast.info("Add new admin functionality");
                                    }
                                }}
                                className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center gap-2"
                            >
                                <PlusIcon className="h-5 w-5" />
                                {addButtonPlaceholder}
                            </button>
                        )}
                    </div>

                    {/* Right Side: Search */}
                    {showSearch && searchableColumns.length > 0 && (
                        <div className="flex items-center gap-2">
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={selectedSearchField}
                                onChange={(e) => setSelectedSearchField(e.target.value)}
                            >
                                {searchableColumns.map((col) => {
                                    const label = col.split(".").pop();
                                    return <option key={col} value={label}>{label}</option>;
                                })}
                            </select>

                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                    if (onSearch) onSearch(selectedSearchField, e.target.value);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Table Container - Responsive */}
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Table Head */}
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={column.key || index}
                                        className={`px-4 py-4 ${column.width || ""} ${getAlignment(
                                            column.align
                                        )}`}
                                        onClick={() => sortableColumns.some(col => col.includes(column.key)) && handleSort(column.key)}
                                    >
                                        <div
                                            className={`flex items-center gap-2 ${getAlignment(
                                                column.align
                                            )} ${sortableColumns.some(col => col.includes(column.key)) ? "cursor-pointer select-none" : ""}`}
                                        >
                                            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                {column.label}
                                            </span>
                                            {sortableColumns.some(col => col.includes(column.key)) && (
                                                <div className="flex flex-col">
                                                    <ArrowUpIcon
                                                        className={`h-3 w-3 ${sortConfig.key === column.key &&
                                                            sortConfig.direction === "asc"
                                                            ? "text-indigo-600"
                                                            : "text-gray-400"
                                                            }`}
                                                    />
                                                    <ArrowDownIcon
                                                        className={`h-3 w-3 -mt-1 ${sortConfig.key === column.key &&
                                                            sortConfig.direction === "desc"
                                                            ? "text-indigo-600"
                                                            : "text-gray-400"
                                                            }`}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-6 py-12 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            <FunnelIcon className="h-12 w-12 text-gray-300" />
                                            <p className="text-lg font-medium">{emptyMessage}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((row, rowIndex) => (
                                    <tr
                                        key={row.id || rowIndex}
                                        onClick={() => onRowClick && onRowClick(row)}
                                        className={`transition-colors ${onRowClick
                                            ? "cursor-pointer hover:bg-indigo-50"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={column.key || colIndex}
                                                className={`px-4 py-4 text-sm text-gray-900 ${column.width || ""
                                                    }`}
                                            >
                                                <div className={`flex items-center ${getAlignment(column.align)}`}>
                                                    {renderCell(row, column)}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {showPagination && totalPages > 1 && (
                <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Page Info */}
                        <div className="text-sm text-gray-600">
                            Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
                            <span className="font-semibold text-gray-900">{totalPages}</span>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => goToPage(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                First
                            </button>
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>

                            {/* Page Numbers */}
                            <div className="hidden sm:flex items-center gap-1">
                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1;
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${currentPage === page
                                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                                                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return (
                                            <span key={page} className="px-2 text-gray-500">
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}
                            </div>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => goToPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Last
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
// import React, { useState, useMemo } from "react";
// import {
//     ChevronLeftIcon,
//     ChevronRightIcon,
//     MagnifyingGlassIcon,
//     FunnelIcon,
//     ArrowUpIcon,
//     ArrowDownIcon,
// } from "@heroicons/react/24/outline";
// import { PlusIcon } from "@heroicons/react/24/solid";
// import { toast } from "react-toastify";
// import Dropdown from "./Dropdown"
// import enumData from "../data/enum.json";

// /**
//  * Advanced DataTable Component
//  *
//  * @param {Array} data - Array of data objects
//  * @param {Array} columns - Column configuration array
//  * @param {number} itemsPerPage - Items to show per page (default: 10)
//  * @param {boolean} showSearch - Show search bar (default: true)
//  * @param {boolean} showPagination - Show pagination (default: true)
//  * @param {Function} onRowClick - Callback when row is clicked
//  * @param {string} emptyMessage - Message when no data
//  *
//  * Column Configuration:
//  * {
//  *   key: string - Data key to display
//  *   label: string - Column header label
//  *   sortable: boolean - Enable sorting (default: false)
//  *   searchable: boolean - Include in search (default: true)
//  *   render: function - Custom render function (row, value) => JSX
//  *   width: string - Column width (e.g., "w-32", "w-1/4")
//  *   align: string - Text alignment (left, center, right)
//  *   type: string - Column type (text, image, badge, actions)
//  * }
//  */

// export default function DataTable({
//     data = [],
//     columns = [],
//     itemsPerPage = 10,
//     showSearch = true,
//     showPagination = true,
//     onRowClick,
//     emptyMessage = "No data available",
//     className = "",
//     enableAddButton = false,
//     addButtonPlaceholder = "Add",
//     searchableColumns = [],
//     sortableColumns = [],
//     onSortChange,
//     onSearch,
//     onPerPageChange,
// }) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
//     const [selectedSearchField, setSelectedSearchField] = useState(searchableColumns.length > 0 ? searchableColumns[0].split('.').pop() : ''); // default to first searchable column

//     // Handle sorting
//     const handleSort = (key) => {
//         if (!sortableColumns.some(col => col.includes(key))) return; // skip if not allowed

//         let direction = "asc";
//         if (sortConfig.key === key && sortConfig.direction === "asc") {
//             direction = "desc";
//         }
//         setSortConfig({ key, direction });
//         if (onSortChange) onSortChange(key, direction);
//     };


//     // Filter and sort data
//     const processedData = useMemo(() => {
//         let filtered = [...data];

//         // Search filter
//         if (searchTerm) {
//             filtered = filtered.filter((row) =>
//                 columns.some((col) => {
//                     if (col.searchable === false) return false;
//                     const value = row[col.key];
//                     return value
//                         ?.toString()
//                         .toLowerCase()
//                         .includes(searchTerm.toLowerCase());
//                 })
//             );
//         }

//         // Sort
//         if (sortConfig.key) {
//             filtered.sort((a, b) => {
//                 const aVal = a[sortConfig.key];
//                 const bVal = b[sortConfig.key];

//                 if (aVal === bVal) return 0;

//                 const comparison = aVal > bVal ? 1 : -1;
//                 return sortConfig.direction === "asc" ? comparison : -comparison;
//             });
//         }

//         return filtered;
//     }, [data, searchTerm, sortConfig, columns]);

//     // Pagination
//     const totalPages = Math.ceil(processedData.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentData = processedData.slice(startIndex, endIndex);

//     const goToPage = (page) => {
//         setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//     };

//     // Render cell content based on column type or custom render
//     const renderCell = (row, column) => {
//         const value = row[column.key];

//         // Custom render function
//         if (column.render) {
//             return column.render(row, value);
//         }

//         // Type-based rendering
//         switch (column.type) {
//             case "image":
//                 return (
//                     <div className="flex items-center justify-center">
//                         <img
//                             src={value || "/placeholder.png"}
//                             alt={column.label}
//                             className="h-10 w-10 rounded-lg object-cover"
//                             onError={(e) => {
//                                 e.target.src = "/placeholder.png";
//                             }}
//                         />
//                     </div>
//                 );

//             case "badge":
//                 const badgeColors = {
//                     active: "bg-green-100 text-green-800",
//                     inactive: "bg-red-100 text-red-800",
//                     pending: "bg-yellow-100 text-yellow-800",
//                     completed: "bg-blue-100 text-blue-800",
//                 };
//                 const colorClass = badgeColors[value?.toLowerCase()] || "bg-gray-100 text-gray-800";
//                 return (
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
//                         {value}
//                     </span>
//                 );

//             case "actions":
//                 return <div className="flex items-center justify-center gap-2">{value}</div>;

//             default:
//                 return <span className="truncate">{value || "-"}</span>;
//         }
//     };

//     const getAlignment = (align) => {
//         switch (align) {
//             case "center":
//                 return "text-center justify-center";
//             case "right":
//                 return "text-right justify-end";
//             default:
//                 return "text-left justify-start";
//         }
//     };

//     return (
//         <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//             {/* Header Section */}
//             <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
//                 <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full">
//                     {/* Left Side: Per Page + Add Button */}
//                     <div className="flex items-center gap-4">
//                         {/* Per Page Dropdown */}
//                         <div className="flex-shrink-0 w-20">
//                             <Dropdown
//                                 options={enumData.itemsPerPage}
//                                 value={itemsPerPage}
//                                 isSearchable={false}
//                                 isMulti={false}
//                                 onChange={(val) => {
//                                     onPerPageChange && onPerPageChange(val);
//                                 }}
//                             />
//                         </div>

//                         {/* Add Button */}
//                         {enableAddButton && (
//                             <button
//                                 onClick={() => {
//                                     toast.info("Add new admin functionality");
//                                 }}
//                                 className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center gap-2"
//                             >
//                                 <PlusIcon className="h-5 w-1" />
//                                 {addButtonPlaceholder}
//                             </button>
//                         )}
//                     </div>

//                     {/* Right Side: Search and Stats */}
//                     {showSearch && (
//                         <div className="flex items-center gap-2">
//                             <select
//                                 className="border rounded-lg px-3 py-2 bg-white"
//                                 value={selectedSearchField}
//                                 onChange={(e) => setSelectedSearchField(e.target.value)}
//                             >
//                                 {searchableColumns.map((col) => {
//                                     const label = col.split(".").pop(); // e.g. "masterAdmins.name" -> "name"
//                                     return <option key={col} value={label}>{label}</option>;
//                                 })}
//                             </select>

//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 value={searchTerm}
//                                 onChange={(e) => {
//                                     setSearchTerm(e.target.value);
//                                     setCurrentPage(1);
//                                     if (onSearch) onSearch(selectedSearchField, e.target.value);
//                                 }}
//                                 className="px-3 py-2 border rounded-lg bg-white"
//                             />
//                         </div>

//                     )}
//                 </div>

//             </div>


//             {/* Table Container - Responsive */}
//             <div className="overflow-x-auto">
//                 <div className="inline-block min-w-full align-middle">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         {/* Table Head */}
//                         <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//                             <tr>
//                                 {columns.map((column, index) => (
//                                     <th
//                                         key={column.key || index}
//                                         className={`px-4 py-4 ${column.width || ""} ${getAlignment(
//                                             column.align
//                                         )}`}
//                                         // onClick={() => column.sortable && handleSort(column.key)}
//                                         onClick={() => sortableColumns.some(col => col.includes(column.key)) && handleSort(column.key)}

//                                     >
//                                         <div
//                                             className={`flex items-center gap-2 ${getAlignment(
//                                                 column.align
//                                             )} ${column.sortable ? "cursor-pointer select-none" : ""}`}
//                                         >
//                                             <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
//                                                 {column.label}
//                                             </span>
//                                             {column.sortable && (
//                                                 <div className="flex flex-col">
//                                                     <ArrowUpIcon
//                                                         className={`h-3 w-3 ${sortConfig.key === column.key &&
//                                                             sortConfig.direction === "asc"
//                                                             ? "text-indigo-600"
//                                                             : "text-gray-400"
//                                                             }`}
//                                                     />
//                                                     <ArrowDownIcon
//                                                         className={`h-3 w-3 -mt-1 ${sortConfig.key === column.key &&
//                                                             sortConfig.direction === "desc"
//                                                             ? "text-indigo-600"
//                                                             : "text-gray-400"
//                                                             }`}
//                                                     />
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>

//                         {/* Table Body */}
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {currentData.length === 0 ? (
//                                 <tr>
//                                     <td
//                                         colSpan={columns.length}
//                                         className="px-6 py-12 text-center text-gray-500"
//                                     >
//                                         <div className="flex flex-col items-center gap-2">
//                                             <FunnelIcon className="h-12 w-12 text-gray-300" />
//                                             <p className="text-lg font-medium">{emptyMessage}</p>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 currentData.map((row, rowIndex) => (
//                                     <tr
//                                         key={row.id || rowIndex}
//                                         onClick={() => onRowClick && onRowClick(row)}
//                                         className={`transition-colors ${onRowClick
//                                             ? "cursor-pointer hover:bg-indigo-50"
//                                             : "hover:bg-gray-50"
//                                             }`}
//                                     >
//                                         {columns.map((column, colIndex) => (
//                                             <td
//                                                 key={column.key || colIndex}
//                                                 className={`px-4 py-4 text-sm text-gray-900 ${column.width || ""
//                                                     }`}
//                                             >
//                                                 <div className={`flex items-center ${getAlignment(column.align)}`}>
//                                                     {renderCell(row, column)}
//                                                 </div>
//                                             </td>
//                                         ))}
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Pagination */}
//             {showPagination && totalPages > 1 && (
//                 <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                         {/* Page Info */}
//                         <div className="text-sm text-gray-600">
//                             Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
//                             <span className="font-semibold text-gray-900">{totalPages}</span>
//                         </div>

//                         {/* Pagination Controls */}
//                         <div className="flex items-center gap-2">
//                             <button
//                                 onClick={() => goToPage(1)}
//                                 disabled={currentPage === 1}
//                                 className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                             >
//                                 First
//                             </button>
//                             <button
//                                 onClick={() => goToPage(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                                 className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                             >
//                                 <ChevronLeftIcon className="h-5 w-5" />
//                             </button>

//                             {/* Page Numbers */}
//                             <div className="hidden sm:flex items-center gap-1">
//                                 {[...Array(totalPages)].map((_, index) => {
//                                     const page = index + 1;
//                                     // Show first, last, current, and adjacent pages
//                                     if (
//                                         page === 1 ||
//                                         page === totalPages ||
//                                         (page >= currentPage - 1 && page <= currentPage + 1)
//                                     ) {
//                                         return (
//                                             <button
//                                                 key={page}
//                                                 onClick={() => goToPage(page)}
//                                                 className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${currentPage === page
//                                                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
//                                                     : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
//                                                     }`}
//                                             >
//                                                 {page}
//                                             </button>
//                                         );
//                                     } else if (page === currentPage - 2 || page === currentPage + 2) {
//                                         return (
//                                             <span key={page} className="px-2 text-gray-500">
//                                                 ...
//                                             </span>
//                                         );
//                                     }
//                                     return null;
//                                 })}
//                             </div>

//                             <button
//                                 onClick={() => goToPage(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                                 className="p-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                             >
//                                 <ChevronRightIcon className="h-5 w-5" />
//                             </button>
//                             <button
//                                 onClick={() => goToPage(totalPages)}
//                                 disabled={currentPage === totalPages}
//                                 className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                             >
//                                 Last
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }