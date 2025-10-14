import React, { useState, useEffect } from "react";
import BaseLayout from "../../components/BaseLayout";
import Breadcrumb from "../../components/Breadcrumb";
import DataTable from "../../components/DataTable";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import ConformationModal from "../../components/ConformationModal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAdminList } from "../../utils/api";

export default function ManageAdmin() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
    const [searchableColumns, setSearchableColumns] = useState([]);
    const [sortableColumns, setSortableColumns] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Fetch data
    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const response = await getAdminList();

            if (response.success) {
                const adminsData = response.data.data.map((item) => ({
                    id: item.id,
                    name: item.name,
                    email: item.emailId,
                    role: item.role,
                    status: item.isActive ? "Active" : "Inactive",
                    createdAt: item.createdAt,
                }));

                setAdmins(adminsData);

                // Save searchable/sortable columns from API
                setSearchableColumns(response.data.searchableColumns || []);
                setSortableColumns(response.data.sortableColumns || []);
            }
        } catch (error) {
            console.error("Error fetching admins:", error);
            toast.error("Failed to fetch admin data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (admin) => {
        console.log("Edit admin:", admin);
        toast.info(`Editing ${admin.name}`);
        // Navigate to edit page or open modal
    };

    const handleView = (admin) => {
        console.log("View admin:", admin);
        toast.info(`Viewing ${admin.name}`);
        // Navigate to view page or open modal
    };

    const handleDeleteClick = (admin) => {
        setDeleteModal({ isOpen: true, id: admin.id, name: admin.name });
    };

    const handleDeleteConfirm = async () => {
        try {
            setAdmins(admins.filter((admin) => admin.id !== deleteModal.id));
            toast.success("Admin deleted successfully");
        } catch (error) {
            toast.error("Failed to delete admin");
        } finally {
            setDeleteModal({ isOpen: false, id: null, name: null });
        }
    };

    const handleAddAdmin = () => {
        console.log("Add new admin clicked");
        toast.info("Navigate to Add Admin page");
        // Navigate to add admin page or open modal
    };

    // Column configuration
    const columns = [
        {
            key: "id",
            label: "Id",
            sortable: true,
            width: "w-20",
        },
        {
            key: "name",
            label: "Name",
            sortable: true,
            width: "w-48",
        },
        {
            key: "email",
            label: "Email",
            sortable: true,
        },
        {
            key: "role",
            label: "Role",
            sortable: true,
            width: "w-32",
        },
        {
            key: "status",
            label: "Status",
            type: "badge",
            sortable: true,
            width: "w-32",
            align: "center",
        },
        {
            key: "createdAt",
            label: "Created At",
            sortable: true,
            width: "w-40",
        },
        {
            key: "actions",
            label: "Actions",
            type: "actions",
            width: "w-40",
            align: "center",
            searchable: false,
            sortable: false,
            render: (row) => (
                <div className="flex items-center justify-center gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleView(row);
                        }}
                        className="p-2 text-blue-600 bg-white hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                    >
                        <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(row);
                        }}
                        className="p-2 text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(row);
                        }}
                        className="p-2 text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            ),
        },
    ];

    const breadcrumbLinks = [
        { label: "Dashboard", path: "/" },
        { label: "Manage Admin" },
    ];

    if (loading) {
        return (
            <BaseLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            {/* Breadcrumb */}
            <Breadcrumb title="Manage Admin" links={breadcrumbLinks} />

            {/* DataTable */}
            <div className="mt-6">
                <DataTable
                    data={admins}
                    columns={columns}
                    itemsPerPage={itemsPerPage}
                    showSearch={true}
                    showPagination={true}
                    emptyMessage="No admins found"
                    enableAddButton={true}
                    addButtonPlaceholder="Add Admin"
                    searchableColumns={searchableColumns}
                    sortableColumns={sortableColumns}
                    
                />
            </div>
            {/* Delete Confirmation Modal */}
            <ConformationModal

                isOpen={deleteModal.isOpen}
                title="Confirm Delete"
                message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteModal({ isOpen: false, id: null, name: null })}
            />
        </BaseLayout>
    );
}
// import React, { useState, useEffect } from "react";
// import BaseLayout from "../../components/BaseLayout";
// import Breadcrumb from "../../components/Breadcrumb";
// import DataTable from "../../components/DataTable";
// import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
// import ConformationModal from "../../components/ConformationModal";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { getAdminList } from "../../utils/api";

// export default function ManageAdmin() {
//     const [admins, setAdmins] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
//     const [searchableColumns, setSearchableColumns] = useState([]);
//     const [sortableColumns, setSortableColumns] = useState([]);

//     // Fetch data
//     useEffect(() => {

//         fetchAdmins();
//     }, []);

//     const fetchAdmins = async () => {
//         try {
//             setLoading(true);
//             const response = await getAdminList();

//             if (response.success) {
//                 const adminsData = response.data.data.map((item) => ({
//                     id: item.id,
//                     name: item.name,
//                     email: item.emailId,
//                     role: item.role,
//                     status: item.isActive ? "Active" : "Inactive",
//                     createdAt: item.createdAt,
//                 }));

//                 setAdmins(adminsData);

//                 // Save searchable/sortable columns from API
//                 setSearchableColumns(response.data.searchableColumns);
//                 setSortableColumns(response.data.sortableColumns);
//             }
//         } catch (error) {
//             console.error("Error fetching admins:", error);
//             toast.error("Failed to fetch admin data");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (admin) => {
//         console.log("Edit admin:", admin);
//         toast.info(`Editing ${admin.name}`);
//         // Navigate to edit page or open modal
//     };

//     const handleView = (admin) => {
//         console.log("View admin:", admin);
//         toast.info(`Viewing ${admin.name}`);
//         // Navigate to view page or open modal
//     };

//     const handleDeleteClick = (admin) => {
//         setDeleteModal({ isOpen: true, id: admin.id, name: admin.name });
//     };

//     const handleDeleteConfirm = async () => {
//         try {
//             setAdmins(admins.filter((admin) => admin.id !== deleteModal.id));
//             toast.success("Admin deleted successfully");
//         } catch (error) {
//             toast.error("Failed to delete admin");
//         } finally {
//             setDeleteModal({ isOpen: false, id: null, name: null });
//         }
//     };

//     // Column configuration
//     const columns = [
//         {
//             key: "id",
//             label: "Id",
//             sortable: true,
//             width: "w-48",
//         },
//         {
//             key: "name",
//             label: "Name",
//             sortable: true,
//             width: "w-48",
//         },
//         {
//             key: "email",
//             label: "Email",
//             sortable: true,
//         },
//         {
//             key: "role",
//             label: "Role",
//             sortable: true,
//             width: "w-32",
//         },
//         {
//             key: "status",
//             label: "Status",
//             type: "badge",
//             sortable: true,
//             width: "w-32",
//             align: "center",
//         },
//         {
//             key: "createdAt",
//             label: "Created At",
//             sortable: true,
//             width: "w-32",
//         },
//         {
//             key: "actions",
//             label: "Actions",
//             type: "actions",
//             width: "w-40",
//             align: "center",
//             searchable: false,
//             sortable: false,
//             render: (row) => (
//                 <div className="flex items-center justify-center gap-1">
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleView(row);
//                         }}
//                         className="p-2 text-blue-600 bg-white hover:bg-blue-300 rounded-lg transition-colors"
//                         title="View"
//                     >
//                         <EyeIcon className="h-5 w-5" />
//                     </button>
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleEdit(row);
//                         }}
//                         className="p-2 text-indigo-600 bg-white hover:bg-indigo-50 rounded-lg transition-colors"
//                         title="Edit"
//                     >
//                         <PencilIcon className="h-5 w-5" />
//                     </button>
//                     <button
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteClick(row);
//                         }}
//                         className="p-2 text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors"
//                         title="Delete"
//                     >
//                         <TrashIcon className="h-5 w-5" />
//                     </button>
//                 </div>
//             ),
//         },
//     ];

//     const breadcrumbLinks = [
//         { label: "Dashboard", path: "/" },
//         { label: "Manage Admin" },
//     ];

//     if (loading) {
//         return (
//             <BaseLayout>
//                 <div className="flex items-center justify-center h-96">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//                 </div>
//             </BaseLayout>
//         );
//     }

//     return (
//         <BaseLayout>
//             {/* Breadcrumb */}
//             <Breadcrumb title="Manage Admin" links={breadcrumbLinks} />

//             {/* DataTable */}
//             <div className="mt-6">
//                 <DataTable
//                     data={admins}
//                     columns={columns}
//                     itemsPerPage={10}
//                     showSearch={true}
//                     showPagination={true}
//                     emptyMessage="No admins found"
//                     enableAddButton={true}
//                     addButtonPlaceholder="Add Admin"
//                     searchableColumns={searchableColumns}
//                     sortableColumns={sortableColumns}
//                     onSortChange={(key, direction) => {
//                         console.log("Sort clicked:", key, direction);
//                         // You can call API with sort param here
//                     }}
//                     onSearch={(field, term) => {
//                         console.log("Search:", field, term);
//                         // You can call API with search param here
//                     }}
//                     onPerPageChange={(value) => {
//                         console.log("Per page:", value);
//                         // Can trigger re-fetch or pagination state update
//                     }}
//                 />
//             </div>

//             {/* Delete Confirmation Modal */}
//             <ConformationModal
//                 isOpen={deleteModal.isOpen}
//                 title="Confirm Delete"
//                 message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
//                 onConfirm={handleDeleteConfirm}
//                 onCancel={() => setDeleteModal({ isOpen: false, id: null, name: null })}
//             />
//         </BaseLayout>
//     );
// }
// // import React, { useEffect, useState } from "react";
// // import BaseLayout from "../../components/BaseLayout";
// // import Breadcrumb from "../../components/Breadcrumb";
// // import { getAdminList } from "../../utils/api";
// // import DataTable from "../../components/DataTable";

// // export default function ManageAdmin() {
// //     const [data, setData] = useState(null);

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await getAdminList();
// //                 setData(response.data.data); // <--- FIXED
// //             } catch (error) {
// //                 console.error("Failed to fetch admin list:", error);
// //             }
// //         };

// //         fetchData();
// //     }, []);

// //     const breadcrumbLinks = [{ label: "Dashboard", path: "/" }];

// //     return (
// //         <BaseLayout>
// //             {/* Breadcrumb */}
// //             <Breadcrumb title="Dashboard" links={breadcrumbLinks} />
// //             <div className="mt-6">
// //                 <DataTable
// //                     columns={[
// //                         { key: 'id', label: 'Id' },
// //                         { key: 'role', label: 'Role' },
// //                         { key: 'name', label: 'Name' },
// //                         { key: 'emailId', label: 'Email-Id' },
// //                         { key: 'isActive', label: 'Is-Active' },
// //                         { key: 'status', label: 'Status' },
// //                         { key: 'createdAt', label: 'Created-At' },

// //                     ]}

// //                     data={data || []}
// //                     sortableColumns={['name', 'email']}
// //                     searchableColumns={['name', 'email']}
// //                     enableSorting={true}
// //                     enableSearch={true}
// //                     enableAddButton={true}
// //                     enablePagination={true}
// //                     pageSizeOptions={[5, 10, 20]}
// //                     currentPage={1}
// //                     totalPages={5}
// //                     onAddClick={() => console.log('Add clicked')}
// //                     onColumnSearch={(col, val) => console.log('Search', col, val)}
// //                     onSortChange={(key, dir) => console.log('Sort', key, dir)}
// //                     onPageChange={(page) => console.log('Page', page)}
// //                     onPageSizeChange={(size) => console.log('Page size', size)}
// //                 />
// //             </div>
// //         </BaseLayout>
// //     );
// // }