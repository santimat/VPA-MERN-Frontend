import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { useEffect } from "react";
import { fetchHelper } from "../../helpers/fetchHelper";
import { validateForm } from "../../helpers/validateForm";

export const NewPassword = () => {
    // Read token from url params
    const { token } = useParams();

    // Create navigate hook and add viewTransition
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        repeatPassword: "",
    });

    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const { data } = await fetchHelper({
                    path: `api/veterinarian/forgot-password/${token}`,
                });

                setAlert({ msg: data.msg });
                setValidToken(true);
            } catch (error) {
                setAlert({ msg: error.message, error: true });
            }
        };
        checkToken();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const alert = validateForm(form);
        if (alert) return setAlert(alert);

        try {
            // Create a new object without repeatPassword from form object
            const { repeatPassword, ...newPassword } = form;
            const { data } = await fetchHelper({
                path: `api/veterinarian/forgot-password/${token}`,
                method: "PATCH",
                content: newPassword,
            });
            setAlert({ msg: data.msg });
            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
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
                <Alert
                    alert={alert}
                    onClose={() => validToken && setAlert({})}
                />

                {validToken && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-4">
                                <label className="uppercase text-gray-600 block font-bold text-xl">
                                    New password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Your new password"
                                    className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                                    onChange={handleChange}
                                    name="password"
                                />
                            </div>
                            <div className="my-4">
                                <label className="uppercase text-gray-600 block font-bold text-xl">
                                    Repeat new password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Your email"
                                    className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
                                    onChange={handleChange}
                                    name="repeatPassword"
                                />
                            </div>
                            <input
                                type="submit"
                                value="Save"
                                className="bg-indigo-700 w-full py-2 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-950 transition duration-300"
                            />
                        </form>
                    </>
                )}
            </div>
        </>
    );
};
