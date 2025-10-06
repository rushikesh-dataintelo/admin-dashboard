import React, { useEffect, useRef } from "react";

const ConformationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    const modal = useRef(null);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modal.current && !modal.current.contains(event.target)) {
                onCancel();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            cancelButtonRef.current?.focus();
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onCancel]);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div

                ref={modal}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
            >
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        ref={cancelButtonRef}
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConformationModal;
