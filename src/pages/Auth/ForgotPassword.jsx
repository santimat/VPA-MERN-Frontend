import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { fetchHelper } from "../../helpers/fetchHelper";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({});
    const [confirmed, setConfirmed] = useState(true);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === "" || email.length < 6)
            return setAlert({ msg: "Email is required", error: true });

        try {
            const { data } = await fetchHelper({
                path: "api/veterinarian/forgot-password",
                method: "POST",
                content: { email },
            });
            setAlert({ msg: data.msg });
            setEmailSent(true);
        } catch (error) {
            if (error.message.includes("not confirmed")) {
                setConfirmed(false);
            }
            setAlert({ msg: error.message, error: true });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recover your {""}
                    <span className="text-black">Password</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-0 shadow-lg p-5 rounded-xl bg-white">
                <Alert alert={alert} />

                {(emailSent || !confirmed) && (
                    <>
                        <a
                            className="block text-center my-5 text-gray-500 hover:text-gray-950"
                            href="https://mail.google.com/"
                        >
                            Gmail
                        </a>
                    </>
                )}

                {!emailSent && confirmed && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-4">
                                <label className="uppercase text-gray-600 block font-bold text-xl">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Recover"
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
                                to="/register"
                            >
                                Create account
                            </Link>
                        </nav>
                    </>
                )}
            </div>
        </>
    );
};
