import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import client from "../components/apiClient";

export default function Dropdown({
    options = [],
    apiUrl = "",
    label = "Select",
    isSearchable = false,
    isMulti = false,
    onChange,
    value = null,
}) {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(isMulti ? [] : null);

    // Initialize items from options or API
    useEffect(() => {
        const fetchData = async () => {
            if (apiUrl) {
                try {
                    const res = await client.get(apiUrl);
                    setItems(res.data || []);
                } catch (err) {
                    console.error("Dropdown API error:", err);
                }
            } else if (options.length) {
                setItems(options);
            }
        };

        fetchData();
    }, [apiUrl, options]);

    // Sync selected with value prop
    useEffect(() => {
        if (value !== undefined && value !== null) {
            setSelected(value);
        }
    }, [value]);

    const toggleItem = (item) => {
        if (isMulti) {
            let updated;
            if (selected.find((i) => i.value === item.value)) {
                updated = selected.filter((i) => i.value !== item.value);
            } else {
                updated = [...selected, item];
            }
            setSelected(updated);
            onChange && onChange(updated);
        } else {
            setSelected(item);
            onChange && onChange(item);
            setOpen(false);
        }
    };

    const filteredItems = (items || []).filter((item) =>
        (item.label || "").toLowerCase().includes((search || "").toLowerCase())
    );

    return (
        <div className="relative w-full">
            {/* Input Field / Dropdown Header */}
            <div
                className="flex items-center justify-between px-4 py-2 rounded-lg border border-gray-300 bg-white cursor-pointer shadow-sm hover:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500"
                onClick={() => setOpen(!open)}
            >
                <div className="flex-1 text-gray-700 text-sm">
                    {isMulti
                        ? selected.length
                            ? selected.map((i) => i.label).join(", ")
                            : label
                        : selected?.label || label}
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isSearchable && (
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none text-sm"
                        />
                    )}
                    <ul>
                        {filteredItems.map((item) => (
                            <li
                                key={item.value}
                                onClick={() => toggleItem(item)}
                                className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 text-sm ${(isMulti
                                    ? selected.find((i) => i.value === item.value)
                                    : selected?.value === item.value)
                                    ? "bg-indigo-100 font-semibold"
                                    : ""
                                    }`}
                            >
                                {item.label}
                            </li>
                        ))}
                        {filteredItems.length === 0 && (
                            <li className="px-4 py-2 text-gray-500 text-sm">No results found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
// import React, { useEffect, useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";
// import client from "../components/apiClient"; // for API fetching
// import enumData from "../data/enum.json";

// export default function Dropdown({
//     options = [],
//     apiUrl = "",
//     label = "Select",
//     isSearchable = false,
//     isMulti = false,
//     onChange,
// }) {
//     const [open, setOpen] = useState(false);
//     const [items, setItems] = useState([]);
//     const [search, setSearch] = useState("");
//     const [selected, setSelected] = useState(isMulti ? [] : null);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (apiUrl) {
//                 try {
//                     const res = await client.get(apiUrl);
//                     setItems(res.data || []);
//                 } catch (err) {
//                     console.error("Dropdown API error:", err);
//                 }
//             } else if (options.length) {
//                 setItems(options);
//             }
//         };

//         fetchData();
//     }, [apiUrl, options]);

//     const toggleItem = (item) => {
//         if (isMulti) {
//             let updated;
//             if (selected.find((i) => i.value === item.value)) {
//                 updated = selected.filter((i) => i.value !== item.value);
//             } else {
//                 updated = [...selected, item];
//             }
//             setSelected(updated);
//             onChange && onChange(updated);
//         } else {
//             setSelected(item);
//             onChange && onChange(item);
//             setOpen(false);
//         }
//     };

//     const filteredItems = (items || []).filter((item) =>
//         (item.label || "").toLowerCase().includes((search || "").toLowerCase())
//     );

//     return (
//         <div className="relative w-full max-w-xs">
//             {/* Input Field / Dropdown Header */}
//             <div
//                 className="flex items-center justify-between px-4 py-2 rounded-lg border border-gray-300 bg-white cursor-pointer shadow-sm hover:border-indigo-500"
//                 onClick={() => setOpen(!open)}
//             >
//                 <div className="flex-1 text-gray-700">
//                     {isMulti
//                         ? selected.length
//                             ? selected.map((i) => i.label).join(", ")
//                             : label
//                         : selected?.label || label}
//                 </div>
//                 <ChevronDownIcon className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
//             </div>

//             {/* Dropdown Menu */}
//             {open && (
//                 <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     {isSearchable && (
//                         <input
//                             type="text"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             placeholder="Search..."
//                             className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
//                         />
//                     )}
//                     <ul>
//                         {filteredItems.map((item) => (
//                             <li
//                                 key={item.value}
//                                 onClick={() => toggleItem(item)}
//                                 className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${(isMulti
//                                     ? selected.find((i) => i.value === item.value)
//                                     : selected?.value === item.value)
//                                     ? "bg-indigo-100 font-semibold"
//                                     : ""
//                                     }`}
//                             >
//                                 {item.label}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }
