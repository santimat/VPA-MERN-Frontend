import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { fetchHelper } from "../../helpers/fetchHelper";
import { validateForm } from "../../helpers/validateForm";

export const Register = () => {
    // An object with states
    const initialForm = {
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    };
    const [form, setForm] = useState(initialForm);

    const [alert, setAlert] = useState({});

    const navigate = useNavigate({ ViewTransition: true });

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

        // If everything is okay
        // clear alert
        setAlert({});

        try {
            const { repeatPassword, ...newUser } = form;
            const { data } = await fetchHelper({
                path: "api/veterinarian",
                method: "POST",
                content: newUser,
            });

            setAlert({ msg: data.msg });
            setForm(initialForm);

            setTimeout(() => navigate("/"), 1200);
        } catch (error) {
            setAlert({ msg: error.message, error: true });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Create your account and Administer {""}
                    <span className="text-black">your Patients</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-0 shadow-lg p-5 rounded-xl bg-white">
                <Alert alert={alert} onClose={() => setAlert({})} />

                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label className="uppercase text-gray-600 block font-bold text-xl">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                            value={form.name}
                            onChange={handleChange}
                            name="name"
                        />
                    </div>
                    <div className="my-4">
                        <label className="uppercase text-gray-600 block font-bold text-xl">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Register email"
                            className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                            value={form.email}
                            onChange={handleChange}
                            name="email"
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
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                        />
                    </div>
                    <div className="my-4">
                        <label className="uppercase text-gray-600 block font-bold text-xl">
                            Repeat password
                        </label>
                        <input
                            type="password"
                            placeholder="Repeat your password"
                            className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                            value={form.repeatPassword}
                            onChange={handleChange}
                            name="repeatPassword"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        className="bg-indigo-700 w-full py-2 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-950 transition duration-300"
                    />
                </form>

                <nav className="mt-8 lg:flex lg:justify-between">
                    <Link
                        className="block text-center my-5 text-gray-500 hover:text-gray-950"
                        to="/"
                    >
                        Log in
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
    );
};
