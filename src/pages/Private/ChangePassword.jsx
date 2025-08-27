import { useState } from "react";
import { AdminNav } from "../../components/AdminNav";
import { Alert } from "../../components/Alert";
import useAuth from "../../hooks/useAuth";

export const ChangePassword = () => {
    const initialPassword = { currentPassword: "", newPassword: "" };
    const [password, setPassword] = useState(initialPassword);

    const [alert, setAlert] = useState({});
    const { updatePassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(password).includes(""))
            return setAlert({ msg: "Both fields are required", error: true });

        if (password.newPassword.length < 6)
            return setAlert({ msg: "The password is too short" });

        const { alert } = await updatePassword(password);
        if (alert.error) return setAlert({ msg: alert.msg, error: true });
        setAlert({ msg: alert.msg });
        setPassword(initialPassword);
    };

    const handleChange = async (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-5">
                Change password
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modify your {""}{" "}
                <span className="text-indigo-600 font-bold">Password</span>
            </p>
            <div className="flex justify-center">
                <div className="w-[90%] md:w-1/2 bg-white shadow rounded-lg p-5">
                    <Alert alert={alert} onClose={() => setAlert({})} />
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <label
                                htmlFor="currentPassword"
                                className="uppercase font-bold text-gray-600"
                            >
                                Current password
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-1 rounded-lg"
                                id="currentPassword"
                                placeholder="Enter your current password"
                                name="currentPassword"
                                value={password.currentPassword ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="newPassword"
                                className="uppercase font-bold text-gray-600"
                            >
                                New password
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-1 rounded-lg"
                                id="newPassword"
                                placeholder="Enter your new password"
                                name="newPassword"
                                value={password.newPassword ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Save changes"
                            className="bg-indigo-700 px-10 py-2 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-900 hover:cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};
