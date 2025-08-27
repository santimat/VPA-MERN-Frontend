import { useEffect, useState } from "react";

import { AdminNav } from "../../components/AdminNav";
import { Alert } from "../../components/Alert";
import useAuth from "../../hooks/useAuth";

export const EditProfile = () => {
    const { auth, updateProfile } = useAuth();
    const [profile, setProfile] = useState({});
    const [alert, setAlert] = useState({});

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email } = profile;
        if ([name, email].includes(""))
            return setAlert({
                msg: "Name and Email are required",
                error: true,
            });

        const { alert } = await updateProfile(profile);
        if (alert.error) return setAlert({ msg: alert.msg, error: true });
        setAlert({ msg: alert.msg });
    };

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-5">
                Edit profile
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modify your {""}{" "}
                <span className="text-indigo-600 font-bold">Information</span>
            </p>
            <div className="flex justify-center">
                <div className="w-[90%] md:w-1/2 bg-white shadow rounded-lg p-5">
                    <Alert alert={alert} onClose={() => setAlert({})} />
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="uppercase font-bold text-gray-600"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-1 rounded-lg"
                                id="name"
                                placeholder="Your name"
                                name="name"
                                value={profile.name ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="email"
                                className="uppercase font-bold text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-1 rounded-lg"
                                id="email"
                                placeholder="Your email"
                                name="email"
                                onChange={handleChange}
                                value={profile.email ?? ""}
                            />
                        </div>
                        <div className="my-3">
                            <label
                                htmlFor="phone"
                                className="uppercase font-bold text-gray-600"
                            >
                                Phone
                            </label>
                            <input
                                type="tel"
                                className="border bg-gray-50 w-full p-2 mt-1 rounded-lg"
                                id="phone"
                                placeholder="Your phone number"
                                name="phone"
                                onChange={handleChange}
                                value={profile.phone ?? ""}
                            />
                        </div>
                        <div className="mt-3">
                            <label
                                htmlFor="web"
                                className="uppercase font-bold text-gray-600"
                            >
                                Web
                            </label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-1 rounded-lg"
                                id="web"
                                placeholder="Your website"
                                name="web"
                                onChange={handleChange}
                                value={profile.web ?? ""}
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
