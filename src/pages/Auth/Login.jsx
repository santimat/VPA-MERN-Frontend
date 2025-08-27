import { Link, useNavigate, Navigate } from "react-router-dom"; // component to create navegation
import { useState } from "react";
// Import custom hook to access to auth state global
import useAuth from "../../hooks/useAuth";

import { validateForm } from "../../helpers/validateForm";
import { Alert } from "../../components/Alert";
import { fetchHelper } from "../../helpers/fetchHelper";

export function Login() {
    const [alert, setAlert] = useState({});

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { auth, setAuth, loading } = useAuth();

    const navigate = useNavigate();

    if (loading) return null;

    const handleChange = (e) => {
        setForm({
            // Copy from the previous form object
            ...form,
            // set value in the corresponding input
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const alert = validateForm(form);
        if (alert) return setAlert(alert);

        try {
            const { data } = await fetchHelper({
                path: "api/veterinarian/login",
                method: "POST",
                content: form,
            });
            localStorage.setItem("VPA_TOKEN", data.token);
            // Set auth with user's information to navigate works correctly
            setAuth(data);
            navigate("/admin");
        } catch (error) {
            setAlert({ msg: error.message, error: true });
        }
    };

    return (
        <>
            {!auth?._id ? (
                <>
                    <div>
                        <h1 className="text-indigo-600 font-black text-6xl">
                            Log in and Administer your {""}
                            <span className="text-black">Patients</span>
                        </h1>
                    </div>

                    <div className="mt-20 md:mt-0 shadow-lg p-5 rounded-xl bg-white">
                        <Alert alert={alert} onClose={() => setAlert({})} />
                        <form onSubmit={handleSubmit}>
                            <div className="my-4">
                                <label className="uppercase text-gray-600 block font-bold text-xl">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="my-4">
                                <label className="uppercase text-gray-600 block font-bold text-xl">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Your password"
                                    className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Log in"
                                className="bg-indigo-700 w-full py-2 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-950 transition duration-300"
                            />
                        </form>

                        <nav className="mt-8 lg:flex lg:justify-between">
                            <Link
                                className="block text-center my-5 text-gray-500 hover:text-gray-950"
                                to="/register"
                            >
                                Create account
                            </Link>
                            <Link
                                className="block text-center my-5 text-gray-500 hover:text-gray-950"
                                to="/forgot-password"
                            >
                                Forgot my password
                            </Link>
                        </nav>
                    </div>
                </>
            ) : (
                <Navigate to="/admin" />
            )}
        </>
    );
}
