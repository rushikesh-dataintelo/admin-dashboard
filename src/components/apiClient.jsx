import axios from "axios";
import { baseURL } from "../helpers/helper";
import { toast } from "react-toastify";

const client = axios.create({
    baseURL: baseURL, // will now correctly read from .env
    timeout: 10000,
});

client.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

client.interceptors.response.use(
    (response) => {
        if (response.data?.success === true) {
            return response;
        } else {
            return handleUnauthorized(response);
        }
    },
    (error) => {
        if (error.response?.status === 401) {
            return handleUnauthorized(error.response);
        }
        return Promise.reject(error);
    }
);

const handleUnauthorized = (response) => {
    const errorMessage = response?.data?.message || "";

    if (
        response?.status === 401 ||
        errorMessage.includes("Unauthorized request") ||
        errorMessage.includes("Token expired") ||
        errorMessage.includes("Invalid token")
    ) {
        toast.error("Session expired! Redirecting to login...", {
            position: "top-right",
            autoClose: 1500,
        });

        localStorage.clear();

        setTimeout(() => {
            window.location.href = "/login";
        }, 1500);

        return new Promise(() => { });
    }

    return Promise.reject(errorMessage || "Service unavailable");
};

export default client;