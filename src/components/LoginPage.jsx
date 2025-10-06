import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/tara-admin-logo-dark.png";
import { loginUser } from "../utils/api";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(username, password);

            if (res.success) {
                const { token, name } = res.data;

                // Save token and user info in localStorage
                localStorage.setItem("accessToken", token);
                localStorage.setItem("admin", JSON.stringify({ name }));

                navigate("/"); // Redirect to dashboard
            } else {
                setError(res.message || "Login failed");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img
                        src={Logo}
                        alt="TARA Logo"
                        className="w-15 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            required
                            autoComplete="username"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}