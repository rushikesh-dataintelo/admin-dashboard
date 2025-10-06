import client from "../components/apiClient";

// Login API
export const loginUser = async (username, password) => {
    try {
        const response = await client.post("/auth/admin/signIn", { username, password });
        return response.data; // { success, message, data: { token, name } }
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
    window.location.href = "/login"; // Redirect to login page
};

// Fetch dashboard data
export const getDashboardData = async () => {
    try {
        const response = await client.get("admin/dashboard");
        return response.data;
    } catch (error) {
        throw error;
    }
};
